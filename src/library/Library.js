import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Header from '../Components/Header';
import FilterGraphic from '../../assets/filter-outline.svg';
import LessonPlanButton from './components/LessonPlanButton';

const Library = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.inlinetitle}>
        <Text style={styles.title}>Lesson Plans</Text>
        <TouchableOpacity>
          <FilterGraphic height={25} width={25} />
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView style={styles.content}>
        <LessonPlanButton name={'Lesson Plan A'} />
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
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 28,
    letterSpacing: 0.3,
    color: '#453E3D'
  },
  inlinetitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 22
  },
  content: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 22
  }
});
export default Library;
