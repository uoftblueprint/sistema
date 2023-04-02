import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Header from '../Components/Header';
import FilterGraphic from '../../assets/filterOutline.svg';
import LessonPlanButton from './components/LessonPlanButton';
import LessonPlanService from '../services/LessonPlanService';
import { TextStyle } from '../Styles.config';
import { STACK_SCREENS } from './constants';

const Library = ({ navigation, route }) => {
  const { sortT } = route.params;
  const [lpList, setList] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [sortType]);

  // If sort time is different, we have to reload
  if (sortT !== sortType) {
    setSortType(sortT);
  }

  useFocusEffect(
    useCallback(() => {
      async function getPlans() {
        await LessonPlanService.initializeEmptyDirectories();
        let favL = await LessonPlanService.getAllLessonPlanNames(1);
        let defL = await LessonPlanService.getAllLessonPlanNames(2);
        let lessonPlanInfo = [];
        for (let lp = 0; lp < favL.length; lp++) {
          lessonPlanInfo.push({
            name: favL[lp].name,
            isFavorited: true,
            lastEdited: favL[lp].mtime?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            lastEditedDate: favL[lp].mtime,
          });
        }
        for (let lp = 0; lp < defL.length; lp++) {
          lessonPlanInfo.push({
            name: defL[lp].name,
            isFavorited: false,
            lastEdited: defL[lp].mtime?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            lastEditedDate: defL[lp].mtime,
          });
        }
        setList(lessonPlanInfo);
      }

      getPlans();
    }, []),
  );

  useEffect(() => {
    if (lpList !== null && sortType !== null) {
      setLoaded(true);
    }
  }, [lpList, sortType]);

  if (loaded) {
    const handleFavoriteChange = (newFavState, index) => {
      (newFavState
        ? LessonPlanService.favouriteLessonPlan(lpList[index].name)
        : LessonPlanService.unfavouriteLessonPlan(lpList[index].name)
      )
        .then(() => {
          setList(oldList => {
            // Update the time temporarily to be now, rather than accessing the new mtime
            const updateTime = new Date();
            oldList[index].lastEditedDate = updateTime;
            oldList[index].lastEdited = updateTime.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            oldList[index].isFavorited = newFavState;
            return [...oldList];
          });
        })
        .catch(err => {
          console.error(`Library favourite lesson plan: ${err}`);
        });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Header
          navigation={navigation}
          showInfoIcon={false}
          showBackButton={false}
        />
        <SafeAreaView style={styles.inlineTitle}>
          <Text style={TextStyle.h1}>Lesson Plans</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(STACK_SCREENS.LESSON_PLAN_SORTING_MENU)
            }>
            <FilterGraphic height={25} width={25} style={styles.filterButton} />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <SafeAreaView style={styles.content}>
            {lpList
              .sort((x, y) => {
                switch (sortType) {
                  case 1:
                    // A to Z
                    return x.name === y.name ? 0 : x.name > y.name ? 1 : -1;
                  case 2:
                    // Z to A
                    return x.name === y.name ? 0 : x.name < y.name ? 1 : -1;
                  case 3:
                    // Oldest
                    // + prefix is used to compare the miliseconds
                    return +x.lastEditedDate === +y.lastEditedDate
                      ? 0
                      : x.lastEditedDate > y.lastEditedDate
                      ? 1
                      : -1;
                  default:
                    // Last Edited
                    // if no sort type is chosen, sort by last edited
                    return +x.lastEditedDate === +y.lastEditedDate
                      ? 0
                      : x.lastEditedDate < y.lastEditedDate
                      ? 1
                      : -1;
                }
              })
              .sort((x, y) => {
                // Always display favorited lesson plans first
                return x.isFavorited === y.isFavorited
                  ? 0
                  : y.isFavorited
                  ? 1
                  : -1;
              })
              .map((lessonPlan, i) => (
                <LessonPlanButton
                  key={i} // TODO: if lesson plan has a unique id, replace key with it
                  index={i}
                  name={lessonPlan.name}
                  navigation={navigation}
                  isFavorited={lessonPlan.isFavorited}
                  toggleFavorite={handleFavoriteChange}
                  lastEditedDate={lessonPlan.lastEdited}
                  lessonPlan={lessonPlan.name}
                />
              ))}
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Header showInfoIcon={false} />
        <SafeAreaView style={styles.inlineTitle}>
          <Text style={TextStyle.h1}>Lesson Plans</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(STACK_SCREENS.LESSON_PLAN_SORTING_MENU)
            }>
            <FilterGraphic height={25} width={25} style={styles.filterButton} />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <SafeAreaView style={styles.content}>
            <Text> Loading...</Text>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFAF5',
  },
  inlineTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  content: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  filterButton: {
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
});

export default Library;
