import React, { useState } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import { StyleSheet, SafeAreaView, View, Text, ScrollView } from 'react-native';
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { LessonPlan } from '../../services/models';

const LessonPlanEditor = ({ navigation }) => {

  // const [object, setObject] = useState({
  //   warmup: [],
  //   mainlesson: [],
  //   cooldown: []
  // })
  // setObject(
  //   {...object, warmup: ['first warmup', 'second warmup']}
  // )

  

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader />
      <ScrollView style={styles.scrollView}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <LessonSection
            section={'warmUp'}
            subtitle={'Warm Up'}
          />
          <LessonSection section={'mainLesson'} subtitle={'Main Lesson'} />
          <LessonSection section={'coolDown'} subtitle={'Cool Down'} />
          <LessonPlanNotes subtitle={'Notes'} />
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
  },
});

export default LessonPlanEditor;