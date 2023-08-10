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
} from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import { AppColors, TextStyle } from '../../Styles.config';

// Component dependencies
import SistemaButton from '../../Components/SistemaButton';
import Searchbar from '../components/Searchbar';
import TagCarousel from '../components/TagCarousel';
import { ModuleType } from '../../services/constants';

// SVGs
import BackArrow from '../../../assets/icons/backArrow.svg';

// Backend
import { useQuery } from '@tanstack/react-query';
import { useNetInfo } from '@react-native-community/netinfo';
import ActivityCardService from '../../services/ActivityCardService';
import LessonPlanService from '../../services/LessonPlanService';
import { MAINDIRECTORY } from '../../services/constants';

import { useDispatch, useSelector } from 'react-redux';
import {
  addToSection,
  getCurrImageFiles,
  setCurrImageFiles,
} from '../../services/editor/lessonPlanSlice';
import { getCardNames } from '../../services/editor/recentActivityCardsSlice';
import WifiWarningOverlay from '../../Components/WifiWarningOverlay';

const AddActivityCard = function ({ navigation, route }) {
  const { sectionType, lessonPlanName } = route.params;

  // ************ WIFI RELATED VARS *********

  const [isWifiConnected, setWifiConnected] = useState(true);
  const [wifiWarningOverlayVisible, setWifiWarningOverlay] = useState(false);
  const netInfo = useNetInfo();

  useEffect(() => {
    // Check for false because netInfo.isConnected may be null if unknown network
    if (netInfo.isConnected === false) {
      setWifiConnected(false);
      setWifiWarningOverlay(true);
    } else {
      setWifiConnected(true);
    }
  }, [netInfo]);

  // ************ WIFI RELATED VARS END *********

  // *************** SEARCH RELATED VARS *******************

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const { data: activityCards } = useQuery({
    queryKey: ['activityCards'],
    queryFn: ActivityCardService.getAllActivityCards,
    onError: error => {
      console.error('Error getting all activity cards: ' + error);
      if (error.code === 'ERR_NETWORK' && isWifiConnected) {
        // If netInfo warning was bypassed, but axios insists there's no connection
        setWifiWarningOverlay(true);
      }
    },
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

  const currActivityCards = useSelector(state =>
    getCurrImageFiles(state.lessonPlan),
  );
  const dispatch = useDispatch();

  //onPress function for add Card button
  const addCard = async () => {
    // Can't download AC if there's no internet connection
    if (!isWifiConnected) {
      setWifiWarningOverlay(true);
      return;
    }

    const favourited = await LessonPlanService.isLessonPlanFavourited(
      lessonPlanName,
    );
    const folder = favourited ? '/Favourited/' : '/Default/';

    await ActivityCardService.downloadActivityCard(
      previewInfo.id,
      'Downloaded',
      previewInfo.name,
      lessonPlanName,
    )
      .then(relPath => {
        if (relPath === 'no wifi') {
          setWifiWarningOverlay(true);
        } else {
          dispatch(
            addToSection({
              type: ModuleType.activityCard,
              name: previewInfo?.name,
              id: previewInfo?.id,
              section: sectionType,
              content: relPath,
              path: MAINDIRECTORY + folder + lessonPlanName + relPath,
            }),
          );
          dispatch(setCurrImageFiles([...currActivityCards, relPath]));
          navigation.goBack();
        }
      })
      .catch(err => {
        console.error('Error when adding activity card: ' + err);
      });
  };

  // *************** PREVIEW RELATED VARS END ***********

  return (
    <SafeAreaView style={styles.safeContainer}>
      <WifiWarningOverlay
        visible={wifiWarningOverlayVisible}
        handleClose={() => {
          setWifiWarningOverlay(false);
        }}
      />
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
            showBottomScrollbar={true}
          />
          <TagCarousel
            tagsList={durationTags}
            activeTags={durationActiveTags}
            setActiveTags={setDurActiveTags}
            selectOnlyOne={true}
            showBottomScrollbar={false}
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
  safeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.background,
  },
  scrollContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: AppColors.background,
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
  mulishFont: {
    fontFamily: 'Mulish-Regular',
    color: 'black',
  },
  marginH2: {
    marginHorizontal: '2%',
  },
  bodyFontSize: {
    fontSize: 14,
  },
  azureRadiance: {
    color: '#0078E8',
  },
});

export default AddActivityCard;
