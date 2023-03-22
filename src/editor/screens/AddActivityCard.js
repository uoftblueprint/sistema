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
import TagFilter from '../components/TagFilter';
import SistemaButton from '../../Components/SistemaButton';
import Searchbar from '../components/Searchbar';

//SVGs
import BackArrow from '../../../assets/backArrow.svg';
import LeftArrow from '../../../assets/leftArrow.svg';
import RightArrow from '../../../assets/rightArrow.svg';

import axios from 'axios';

import ActivityCardService from '../../services/ActivityCardService';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';

const AddActivityCard = function ({ navigation, route }) {
  // SEARCH RELATED VARS
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const [activityList, setActivityList] = useState([]);
  //previewInfo has id, name, and url.
  const [previewInfo, setPreviewInfo] = useState(null);
  const showNoCards = useRef(false);

  // to detect when user stops typing. Source: https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      if (!searchQuery) {
        showNoCards.current = false;
        setActivityList([]);
        setPreviewInfo(null);
      } else {
        const nameSearchTerm = `and name contains '${searchQuery}'`;
        const tagSearchTerm = TAGS.map((tag, index) => {
          if (activeTags[index]) {
            return ` and fullText contains '${tag}'`;
          }
        }).join('');
        const ACTVTTerm = " and fullText contains 'ACTVT'";
        axios
          .get('https://www.googleapis.com/drive/v3/files?', {
            params: {
              trashed: 'false',
              supportsAllDrives: 'true',
              includeItemsFromAllDrives: 'true',
              q:
                "name contains '-' and mimeType='image/jpeg' " +
                nameSearchTerm +
                tagSearchTerm,
            },
          })
          .then(function (response) {
            const data = response.data.files;
            console.log(data);
            if (data.length != 0) {
              showNoCards.current = false;
            } else {
              showNoCards.current = true;
            }
            setActivityList(data);
          });
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const addCard = async () => {
    console.log("SKFHDSKFHSJKDHFKJSHDFKJSDHKFJHSJDFHSKJDHFJKSDHFK")
    console.log(previewInfo.id);
    const rnfsPath = await ActivityCardService.downloadActivityCard(previewInfo.id);
    console.log(rnfsPath);

    store.dispatch(
      addToSection({
        type: 'activity',
        section: route.params.sectionType,
        content: rnfsPath,
      })
    );
    navigation.goBack();
  }

  // ************ SEARCH RELATED VARS END *********

  // TAG RELATED VARS
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
    'Warm Up',
    'No Equipment',
    'Beginner',
    'Rhythm',
    'Note Reading',
    'Quick',
    'Group Activity',
    'Scale',
  ];

  //ANIMATION RELATED VARS/FUNCS *****************
  const HEIGHT = 35;
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
                  style={[styles.flexRow, styles.alignCenter, styles.marginT5]}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}>
                    <BackArrow height={25} width={25} />
                  </TouchableOpacity>
                  <Text style={styles.header}>
                    {' '}
                    {route.params.header} Activity Card{' '}
                  </Text>
                </View>
                <Text style={styles.tags}> Tags: </Text>
                <View style={styles.tagContainer}>
                  {TAGS.map((tag, index) => (
                    <TagFilter
                      key={index}
                      tagContent={tag}
                      active={activeTags[index]}
                      onPress={() => {
                        // make a copy of the active tags
                        const newActiveTags = activeTags.slice();
                        newActiveTags[index] = !newActiveTags[index];
                        setActiveTags(newActiveTags);
                      }}
                    />
                  ))}
                </View>
              </>
            )}
          </Animated.View>

          <Searchbar
            placeholder="Search by title or keyword"
            onChangeText={onChangeSearch}
            onFocus={collapse}
            value={searchQuery}
            activityList={activityList}
            focused={focused}
            setPreviewInfo={setPreviewInfo}
            showNoCards={showNoCards}
          />

          {previewInfo ? (
            <>
              <View style={styles.previewContainer}>
                <View style={(styles.flex1, styles.alignCenter)}>
                  <LeftArrow height={30} width={20} />
                </View>
                <View style={[styles.flex4, styles.alignCenter]}>
                  <Image
                    style={styles.previewImage}
                    source={{ uri: previewInfo?.url }}
                  />
                </View>
                <View style={(styles.flex1, styles.alignCenter)}>
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
                  {' '}
                  {previewInfo?.name}{' '}
                </Text>
                <View style={[styles.alignCenter, styles.flexRow]}>
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
                  <TouchableOpacity style={{ marginLeft: '5%' }}>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  previewContainer: {
    height: '40%',
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
    marginTop: '1%',
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
  bodyFontSize: {
    fontSize: 14,
  },
  azureRadiance: {
    color: '#0078E8',
  },
});

export default AddActivityCard;
