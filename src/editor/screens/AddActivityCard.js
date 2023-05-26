// React dependencies
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {
  verticalScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { TextStyle } from '../../Styles.config';

// Component dependencies
import SistemaButton from '../../Components/SistemaButton';
import Searchbar from '../components/Searchbar';
import SearchResults from '../components/SearchResults';
import NoCardsFound from '../components/NoCardsFound';
import TagCarousel from '../components/TagCarousel';

// SVGs
import BackArrow from '../../../assets/backArrow.svg';

// Backend
import { useQuery } from '@tanstack/react-query';
import ActivityCardService from '../../services/ActivityCardService';
import { useDispatch, useSelector } from 'react-redux';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import { getCardNames } from '../../services/editor/recentActivityCardsSlice';

const AddActivityCard = function ({ navigation, route }) {
  const { sectionType } = route.params;

  // *************** SEARCH RELATED VARS *******************

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const { data: activityCards } = useQuery({
    queryKey: ['activityCards'],
    queryFn: ActivityCardService.getAllActivityCards,
  });
  const [matchSearch, setMatchSearch] = useState([]);
  const [highlightedID, setHighlightedID] = useState('');

  const [activeTags, setActiveTags] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const mainTags = [
    'Recently Added', // Keep at index 0
    'Warm Up',
    'No Equipment',
    'Beginner',
    'Rhythm',
    'Note Reading',
    'Group Activity',
    'Scale',
  ];

  const [durationActiveTags, setDurActiveTags] = useState([
    false,
    false,
    false,
  ]);

  const durationTags = ['5-10 mins', '10-15 mins', '15+ mins'];

  const recentActivityCards = useSelector(state =>
    getCardNames(state.recentActivityCards),
  );

  /**
   * Checks that an activity card matches all selected tags and the search query
   * @param card
   * @returns {boolean}
   */
  const matchesAllConditions = card => {
    // See which conditions are active
    const recentTagActive = activeTags[0];
    const mainTagsActivity = activeTags.slice(1);
    const mainTagsActive = mainTagsActivity.includes(true);
    const durationTagsActive = durationActiveTags.includes(true);

    // Helper functions
    const isRecentAC = () => {
      return (
        recentActivityCards.filter(recentCardName =>
          card.name.toLowerCase().includes(recentCardName.toLowerCase()),
        ).length > 0
      );
    };
    const containsAllActiveTags = () => {
      const tagNames = mainTags.slice(1);
      const activeTags = tagNames.filter((_, i) => mainTagsActivity[i]);
      const cardTags = activeTags.filter(
        tag => card.description.toLowerCase().includes(tag.toLowerCase()), // card metadata includes tag
      );
      return activeTags.every((tag, i) => tag === cardTags[i]);
    };
    const isWithinDuration = () => {
      let duration = durationTags[durationActiveTags.indexOf(true)];
      duration = duration.toLowerCase().replace('mins', '').trim();
      return card.description.toLowerCase().includes(duration); // card metadata includes tag
    };

    const nameIncludesQuery = card.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    let passesChecks = nameIncludesQuery;
    if (passesChecks && recentTagActive) {
      passesChecks = passesChecks && isRecentAC();
    }
    if (passesChecks && mainTagsActive) {
      passesChecks = passesChecks && containsAllActiveTags();
    }
    if (passesChecks && durationTagsActive) {
      passesChecks = passesChecks && isWithinDuration();
    }

    return passesChecks;
  };

  const searchActivityCards = () => {
    // Clear previewed image on new search
    setHighlightedID('');
    setPreviewInfo(null);

    // Set list of cards that match all search conditions
    if (activityCards !== undefined) {
      setMatchSearch(activityCards?.filter(card => matchesAllConditions(card)));
    }
  };

  useEffect(() => {
    // Only search after user stops typing
    const delayDebounceFn = setTimeout(() => {
      searchActivityCards();
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    // Search if tags OR background activityCards data changes
    searchActivityCards();
  }, [activityCards, activeTags, durationActiveTags]);

  // ************ SEARCH RELATED VARS END *********

  // **************** PREVIEW RELATED VARS ***************
  const [previewInfo, setPreviewInfo] = useState(null); // previewInfo has id, name, and url

  const dispatch = useDispatch();

  // onPress function for add Card button
  const addCard = async () => {
    const rnfsPath = await ActivityCardService.downloadActivityCard(
      previewInfo.id,
      'Downloaded',
      previewInfo.name,
    );

    dispatch(
      addToSection({
        type: 'activity',
        name: previewInfo?.name,
        section: sectionType,
        content: rnfsPath,
      }),
    );
    navigation.goBack();
  };

  const addAsText = async () => {
    dispatch(
      addToSection({
        type: 'text',
        section: sectionType,
        content: searchQuery,
      }),
    );
    navigation.goBack();
  };

  // *************** PREVIEW RELATED VARS END ***********

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.paddingContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackArrow height={scale(25)} width={scale(25)} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, TextStyle.h1]}>
              {`${sectionType} Activity Card`}
            </Text>
          </View>

          <TagCarousel
            tagsList={mainTags}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
            selectOnlyOne={false}
          />
          <TagCarousel
            tagsList={durationTags}
            activeTags={durationActiveTags}
            setActiveTags={setDurActiveTags}
            selectOnlyOne={true}
          />

          <Searchbar 
            navigation={navigation}
            onChangeText={onChangeSearch} 
            resultData={matchSearch}
            setPreviewInfo={setPreviewInfo}
            setHighlightedID={setHighlightedID}
            highlightedID={highlightedID}
            searchQuery={searchQuery}
            sectionType={sectionType}
          />

          {previewInfo && (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                marginTop: verticalScale(10),
              }}>
              {/* ADD ACTIVITY CARD BUTTONS */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <SistemaButton onPress={addCard}>
                  <Text
                    style={[
                      styles.mulishFont,
                      styles.marginH2,
                      styles.bodyFontSize,
                    ]}>
                    Add Card
                  </Text>
                </SistemaButton>
                <TouchableOpacity onPress={addAsText}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.mulishFont,
                      styles.marginH2,
                      styles.azureRadiance,
                    ]}>
                    INSERT AS TEXT INSTEAD
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ACTIVITY CARD PREVIEW */}
              <Text
                style={[
                  TextStyle.label,
                  {
                    color: '#000000de',
                    textAlign: 'center',
                    marginVertical: verticalScale(15),
                  },
                ]}>
                {previewInfo?.name}
              </Text>
              <Image
                style={{
                  height: 300,
                  width: 300,
                  resizeMode: 'contain',
                  marginBottom: verticalScale(15),
                }}
                source={{ uri: previewInfo?.url }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // TODO: clean up unused styles
  safeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFAF5',
  },
  scrollContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFAF5',
  },
  paddingContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    verticalAlign: 'top',
    lineHeight: 30,
    flex: 1,
  },
  backButton: {
    height: scale(40),
    width: scale(40),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  searchResultContainer: {
    maxHeight: moderateVerticalScale(230, 2.5),
    width: '100%',
    ...Platform.select({
      ios: {
        zIndex: 999,
        paddingVertical: '3%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'gray',
        shadowRadius: 3,
        shadowOpacity: 0.4,
      },
      android: {
        elevation: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 1,
      },
    }),
  },
  tagContainer: {
    height: '20%',
  },
  previewContainer: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  previewImage: {
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mulishFont: {
    fontFamily: 'Mulish-Regular',
    color: 'black',
  },
  flexRow: {
    flexDirection: 'row',
  },
  marginH2: {
    marginHorizontal: '2%',
  },
  marginT5: {
    marginTop: '5%',
  },
  bodyFontSize: {
    fontSize: 14,
  },
  azureRadiance: {
    color: '#0078E8',
  },
});

export default AddActivityCard;
