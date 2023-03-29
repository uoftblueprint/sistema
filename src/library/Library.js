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

const Library = ({ navigation }) => {
  const [lpList, setList] = useState(null);
  const [loaded, setLoaded] = useState(false);
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
            lastEdited: favL[lp].mtime.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          });
        }
        for (let lp = 0; lp < defL.length; lp++) {
          lessonPlanInfo.push({
            name: defL[lp].name,
            isFavorited: false,
            lastEdited: defL[lp].mtime.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          });
        }
        setList(lessonPlanInfo);
      }
      getPlans();
    }, []),
  );

  useEffect(() => {
    if (lpList !== null) {
      setLoaded(true);
    }
  }, [lpList]);

  if (loaded) {
    const handleFavoriteChange = (newFavState, index) => {
      (newFavState
        ? LessonPlanService.favouriteLessonPlan(lpList[index].name)
        : LessonPlanService.unfavouriteLessonPlan(lpList[index].name)
      )
        .then(() => {
          setList(oldList => {
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
          <TouchableOpacity>
            <FilterGraphic height={25} width={25} style={styles.filterButton} />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <SafeAreaView style={styles.content}>
            {lpList
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
          <TouchableOpacity>
            <FilterGraphic height={25} width={25} style={styles.filterButton} />
          </TouchableOpacity>
        </SafeAreaView>
        <ScrollView>
          <SafeAreaView style={styles.content}>
            <Text> Not loading</Text>
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
