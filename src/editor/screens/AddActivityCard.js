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
  Image
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
// import { act } from 'react-test-renderer';

const TAGS = [
  'Warm Up',
  'No Equipment',
  'Beginner',
  'Rhythm',
  'Note Reading',
  'Quick',
  'Group Activity',
  'Scale'
];

const AddActivityCard = function ({ navigation, route }) {
  // SEARCH RELATED VARS
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
  };
  const [activityList, setActivityList] = useState([]);
  const [previewInfo, setPreviewInfo] = useState(null);

  // to detect when user stops typing. Source: https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      if (!searchQuery) {
        setActivityList([]);
      } else {
        const nameSearchTerm = "and name contains '" + searchQuery + "'";
        axios
          .get('https://www.googleapis.com/drive/v3/files?', {
            params: {
              trashed: 'false',
              supportsAllDrives: 'true',
              includeItemsFromAllDrives: 'true',
              q: "name contains '-' and mimeType='image/jpeg' " + nameSearchTerm
            }
          })
          .then(function (response) {
            setActivityList(response.data.files);
          });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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
    false
  ]);

  //ANIMATION RELATED VARS/FUNCS *****************
  const HEIGHT = 35;
  const heightAnim = useRef(new Animated.Value(HEIGHT)).current;
  const [focused, setFocused] = useState(false);
  const animViewHeight = heightAnim.interpolate({
    inputRange: [0, HEIGHT],
    outputRange: ['0%', `${HEIGHT}%`]
  });

  const collapse = () => {
    setFocused(true);
    console.log('Fuck');
    Animated.timing(heightAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  };

  const uncollapse = () => {
    setFocused(false);
    Animated.timing(heightAnim, {
      toValue: HEIGHT,
      duration: 200,
      useNativeDriver: false
    }).start();
    Keyboard.dismiss();
  };
  // **************** ANIMATION RELATED STUFF END *********

  return (
    <TouchableWithoutFeedback onPress={uncollapse} flex={1} height={'100%'}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ height: animViewHeight }}>
          {focused ? (
            <></>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5%'
                }}>
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
        />

        {previewInfo ? (
          <>
            <View
              style={{
                height: '40%',
                width: '100%',
                flexDirection: 'row',
                marginTop: 20
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <LeftArrow height={30} width={20} />
              </View>
              <View style={{ flex: 4, alignItems: 'center' }}>
                <Image
                  style={{
                    width: '80%',
                    height: '100%',
                    resizeMode: 'contain'
                  }}
                  source={{ uri: previewInfo?.url }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <RightArrow height={30} width={20} />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Mulish-Regular',
                  marginVertical: '2%'
                }}>
                {' '}
                {previewInfo?.name}{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly'
                }}>
                <SistemaButton>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontFamily: 'Mulish-Regular',
                      marginHorizontal: '2%'
                    }}>
                    Add Card
                  </Text>
                </SistemaButton>
                <TouchableOpacity style={{ marginLeft: '5%' }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#0078E8',
                      fontSize: 14,
                      fontFamily: 'Mulish-Regular',
                      marginHorizontal: '2%'
                    }}>
                    INSERT AS TEXT INSTEAD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFAF5',
    height: '100%',
    paddingHorizontal: '5%'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginLeft: '2%'
  },
  tags: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish-Regular',
    marginTop: '1%',
    marginBottom: '2%'
  },
  backText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish-Regular'
  },
  backButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

export default AddActivityCard;
