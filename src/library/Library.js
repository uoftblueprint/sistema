import React from 'react';
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
import { exportPDF } from '../services/PDFExport';

const Library = ({ navigation }) => {
  exportPDF({
    name: 'Cool lesson plan',
    warmUp: [{ type: 'text', content: 'Baker is awesome' }],
    mainLesson: [],
    coolDown: [],
    notes: 'remember that baker is awesome'
  });
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
          <LessonPlanButton name={'Lesson Plan A'} style={styles.lessonPlan} />
          <LessonPlanButton name={'Lesson Plan B'} style={styles.lessonPlan} />
          <LessonPlanButton name={'Lesson Plan C'} style={styles.lessonPlan} />
          <LessonPlanButton name={'Lesson Plan D'} style={styles.lessonPlan} />
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
  lessonPlan: {
    marginBottom: 22
  },
  filterButton: {
    marginTop: 8
  }
});
export default Library;
