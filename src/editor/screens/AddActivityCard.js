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
import { verticalScale, moderateVerticalScale } from 'react-native-size-matters';
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
import { useDispatch } from 'react-redux';
import { addToSection } from '../../services/editor/lessonPlanSlice';

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

  const TAGS = [
    'Recently Added', // TODO: [SIS-142] "Recently added" activity card search filter
    'Warm Up',
    'No Equipment',
    'Beginner',
    'Rhythm',
    'Note Reading',
    'Quick',
    'Group Activity',
    'Scale',
  ];

  const searchActivityCards = () => {
    // Clear previewed image on new search
    setHighlightedID('');
    setPreviewInfo(null);

    // Filter matches on metadata of all activity cards
    if (activityCards !== undefined) {
      setMatchSearch(
        activityCards?.filter(
          card =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (TAGS.filter(
              (s, i) =>
                activeTags[i] &&
                card.description.toLowerCase().includes(s.toLowerCase()),
            ).length > 0 ||
              !activeTags.includes(true)),
        ),
      );
    }
  }

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
  }, [activityCards, activeTags]);

  // ************ SEARCH RELATED VARS END *********

  // **************** PREVIEW RELATED VARS ***************
  // previewInfo has id, name, and url.
  const [previewInfo, setPreviewInfo] = useState(null);

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
        
          <View
            style={[
              { alignItems: 'center' },
              styles.flexRow,
              styles.marginT5,
            ]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <BackArrow height={25} width={25} /> 
            </TouchableOpacity>
            <Text style={styles.header}>
              {`${sectionType} Activity Card`}
            </Text>
          </View>

          <Text style={styles.tags}> Tags: </Text>
          <TagCarousel
            tagsList={TAGS}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />

          <View>
            <Searchbar onChangeText={onChangeSearch} />
            <ScrollView
              nestedScrollEnabled={true} 
              style={styles.searchResultContainer}
            >
              {matchSearch.length > 0
                ? matchSearch.map((item) => 
                    <SearchResults
                      name={item?.name}
                      id={item?.id}
                      setPreviewInfo={setPreviewInfo}
                      setHighlightedID={setHighlightedID}
                      isHighlighted={highlightedID === item?.id}
                    />)
                : <NoCardsFound
                    text={searchQuery}
                    navigation={navigation}
                    section={sectionType}
                  />
              }
            </ScrollView>
          </View>
          
          {previewInfo &&
            <View style={{flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: verticalScale(10)}}>
              
              {/* ADD ACTIVITY CARD BUTTONS */}
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
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
              <Text style={[TextStyle.label, {color: '#000000de', textAlign: 'center', marginVertical: verticalScale(15)}]}>
                {previewInfo?.name}
              </Text>
              <Image
                style={{ height: 300, width: 300, resizeMode: 'contain', marginBottom: verticalScale(15) }}
                source={{ uri: previewInfo?.url }}
              />

            </View>
          }
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
    paddingHorizontal: '5%',
    paddingVertical: verticalScale(15),
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
  header: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginLeft: '2%',
  },
  tags: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish-Regular',
    marginTop: '5%',
    marginBottom: '2%',
  },
  backText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish-Regular',
  },
  backButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: '1%',
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
