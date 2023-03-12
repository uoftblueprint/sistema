import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../Components/Header';
import FilterGraphic from '../../assets/filterOutline.svg';
import LessonPlanButton from './components/LessonPlanButton';
import LessonPlanService from '../services/LessonPlanService';

const fillerLP = [
  {
    name: 'Jan 1, 2023',
    isFavorited: false,
    lastEdited: 'Jan 1, 2023',
  },
  {
    name: 'Jan 2, 2023',
    isFavorited: true,
    lastEdited: 'Jan 2, 2023',
  },
  {
    name: 'Jan 3, 2023',
    isFavorited: true,
    lastEdited: 'Jan 3, 2023',
  },
  {
    name: 'Jan 4, 2023',
    isFavorited: false,
    lastEdited: 'Jan 4, 2023',
  },
];
async function getPlans(){
  let favL = await LessonPlanService.getAllLessonPlanNames(1);
  let defL = await LessonPlanService.getAllLessonPlanNames(2);
  let lessonPlanInfo = [];
  for (let lp = 0; lp < favL.length; lp++){
    lessonPlanInfo.push({name: favL[lp].name, isFavorited: true, lastEdited: favL[lp].mtime});
  }
  
  for (let lp = 0; lp < defL.length; lp++){
    lessonPlanInfo.push({name: defL[lp].name, isFavorited: false, lastEdited: defL[lp].mtime});
  }
  console.log(lessonPlanInfo);

 return lessonPlanInfo;
}

async function favouritePlan(name){
  await LessonPlanService.favouriteLessonPlan(name);
}
async function unfavouritePlan(name){
  await LessonPlanService.unfavouriteLessonPlan(name);
}

const Library = ({ navigation }) => {
  const lessonPlans = getPlans();
  
 //This gets printed out as undefined
  console.log("lesson Plan: ", lessonPlans);
  const [lpList, setList] = useState(fillerLP);

  const handleFavoriteChange = (newFavState, index) => {
    // TODO: Send RNFS call to change favorite state for LP (backend)
    if(newFavState){
      favouritePlan(lpList[index].name);
    } else {
      unfavouritePlan(lpList[index].name);
    }

    // Change fav state in lpList (frontend)
    setList(oldList => {
      oldList[index].isFavorited = newFavState;
      return [...oldList];
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showInfoIcon={false} />
      <SafeAreaView style={styles.inlineTitle}>
        <Text style={styles.title}>Lesson Plans</Text>
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
                : x.isFavorited
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
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFAF5',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    letterSpacing: 0.3,
    color: '#453E3D',
  },
  inlineTitle: {
    display: 'flex',
    justifyContent: 'space-between',
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
    marginTop: 8,
  },
});

export default Library;
