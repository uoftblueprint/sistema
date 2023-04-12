//react dependencies
import { useState, useRef, useEffect } from 'react';
import {
  Animated,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

//Component dependencies
import SistemaButton from '../../Components/SistemaButton';
import Searchbar from '../components/Searchbar';
import TagCarousel from '../components/TagCarousel';

//SVGs
import BackArrow from '../../../assets/backArrow.svg';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';

import ActivityCardService from '../../services/ActivityCardService';
import LessonPlanService from '../../services/LessonPlanService';

import { useDispatch } from 'react-redux';
import { addToSection } from '../../services/editor/lessonPlanSlice';

// react query
import { useQuery } from '@tanstack/react-query';

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

  // previewInfo has id, name, and url.
  const [previewInfo, setPreviewInfo] = useState(null);
  const showNoCards = useRef(false);

  // to detect when user stops typing. Source: https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchQuery) {
        showNoCards.current = false;
      } else {
        if (matchSearch.length != 0) {
          showNoCards.current = false;
        } else {
          showNoCards.current = true;
        }
      }
    }, 100);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // ************ SEARCH RELATED VARS END *********

  // ************ TAG RELATED VARS *************
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

  useEffect(() => {
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
  }, [searchQuery, activityCards, activeTags]);

  // ************* TAG RELATED VARS END ************

  // ************* ANIMATION RELATED VARS/FUNCS *****************
  const HEIGHT = 10;
  const heightAnim = useRef(new Animated.Value(HEIGHT)).current;
  const [focused, setFocused] = useState(false);
  const animViewHeight = heightAnim.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: ['0%', `${HEIGHT}%`],
  });

  const collapse = () => {
    setFocused(true);
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const uncollapse = () => {
    setFocused(false);
    Animated.timing(heightAnim, {
      toValue: HEIGHT,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Keyboard.dismiss();
  };

  // **************** ANIMATION RELATED STUFF END *********

  // **************** PREVIEW RELATED VARS ***************

  //Subscribe to keyboard events on component mount
  const dispatch = useDispatch();
  const [keyboardVisible, setKeyBoardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyBoardVisible(true);
        console.log('Keyboard is shown');
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyBoardVisible(false);
        console.log('Keyboard is hidden');
      },
    );

    // return a cleanup function to remove the event listeners on component unmount
    return () => {
      console.log('Keyboard is unmounted.');
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //onPress function for add Card button
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
        id: previewInfo?.id,
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
    <TouchableWithoutFeedback onPress={uncollapse} flex={1} height={'100%'}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.paddingContainer}>
          <Animated.View style={{ height: animViewHeight }}>
            {focused ? (
              <></>
            ) : (
              <>
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
                    {` ${sectionType} Activity Card `}
                  </Text>
                </View>
              </>
            )}
          </Animated.View>

          <Text style={styles.tags}> Tags: </Text>
          <TagCarousel
            tagsList={TAGS}
            activeTags={activeTags}
            setActiveTags={setActiveTags}
          />
          <Searchbar
            onChangeText={onChangeSearch}
            onFocus={collapse}
            value={searchQuery}
            activityList={matchSearch}
            focused={focused}
            setPreviewInfo={setPreviewInfo}
            showNoCards={showNoCards}
            navigation={navigation}
            section={sectionType}
          />
          {!keyboardVisible ? (
            <>
              {previewInfo ? (
                <>
                  <View
                    style={[
                      styles.previewContainer,
                      {
                        height: focused ? '30%' : '40%',
                        marginTop: focused ? '5%' : '12%',
                      },
                    ]}>
                    <View
                      style={[
                        { alignSelf: 'center', alignItems: 'flex-end' },
                        styles.flex1,
                      ]}>
                      <LeftArrow height={30} width={20} />
                    </View>
                    <View
                      style={[
                        { marginBottom: '2%' },
                        styles.flex4,
                        styles.alignCenter,
                      ]}>
                      <Image
                        style={styles.previewImage}
                        source={{ uri: previewInfo?.url }}
                      />
                    </View>
                    <View
                      style={[
                        { alignSelf: 'center', alignItems: 'flex-start' },
                        styles.flex1,
                      ]}>
                      <RightArrow height={30} width={20} />
                    </View>
                  </View>

                  <View style={[styles.flexColumn, styles.alignCenter]}>
                    <Text
                      style={[
                        styles.mulishFont,
                        styles.marginV2,
                        styles.bodyFontSize,
                      ]}>
                      {` ${previewInfo?.name} `}
                    </Text>
                    <View
                      style={[
                        { marginVertical: '3%' },
                        styles.alignCenter,
                        styles.flexRow,
                      ]}>
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
                      <TouchableOpacity
                        onPress={addAsText}
                        style={{ marginLeft: '5%' }}>
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
                  </View>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFAF5',
    height: '100%',
  },
  paddingContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
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
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  marginH2: {
    marginHorizontal: '2%',
  },
  marginV2: {
    marginVertical: '2%',
  },
  marginT5: {
    marginTop: '5%',
  },
  marginB5: {
    marginBottom: '5%',
  },
  bodyFontSize: {
    fontSize: 14,
  },
  azureRadiance: {
    color: '#0078E8',
  },
});

export default AddActivityCard;
