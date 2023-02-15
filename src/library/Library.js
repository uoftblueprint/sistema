import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Header from '../Components/Header';
import FilterGraphic from '../../assets/filterOutline.svg';
import LessonPlanButton from './components/LessonPlanButton';

// TODO add last edited into menu, also pass in name
const fillerLP = [
  {
    name: 'Lesson Plan A',
    isFavorited: false
  },
  {
    name: 'Lesson Plan B',
    isFavorited: true
  },
  {
    name: 'Lesson Plan C',
    isFavorited: true
  },
  {
    name: 'Lesson Plan D',
    isFavorited: false
  }
]

const Library = ({ navigation }) => {
  const [lpList, setList] = useState(fillerLP);

  const handleFavoriteChange = (newFavState, index) => {
    // TODO: Send RNFS call to change favorite state for LP (backend)

    // Change fav state in lpList (frontend)
    setList((oldList) => {
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
          {
            lpList
              .sort((x, y) => {   // Always display favorited lesson plans first
                return (x.isFavorited === y.isFavorited)? 0 : x.isFavorited? 1 : -1;
              })
              .map((lessonPlan, i) => 
                <LessonPlanButton 
                  key={i} // TODO: if lesson plan has a unique id, replace key with it
                  index={i}
                  name={lessonPlan.name} 
                  navigation={navigation} 
                  isFavorited={lessonPlan.isFavorited}
                  toggleFavorite={handleFavoriteChange}
                />
              )
          }
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFAF5'
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    letterSpacing: 0.3,
    color: '#453E3D'
  },
  inlineTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 10
  },
  content: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column'
  },
  filterButton: {
    marginTop: 8
  }
});

export default Library;
