import React from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';

const LessonPlanEditor = ({ navigation }) => {

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader/>
      <ScrollView style={styles.scrollView}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <LessonSection sectionType={'warmUp'} subtitle={'Warm Up'} />
          <LessonSection sectionType={'mainLesson'} subtitle={'Main Lesson'} />
          <LessonSection sectionType={'coolDown'} subtitle={'Cool Down'} />
          <LessonPlanNotes sectionType={'notes'} subtitle={'Notes'} placeholder={""}/>
          <SaveButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom: '20%'
  }
});

export default LessonPlanEditor;
