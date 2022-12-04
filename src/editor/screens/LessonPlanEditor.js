import React from 'react';
import LessonPlanHeader from '../../components/LessonPlanHeader.js';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import LessonSection from '../../components/LessonSection.js';
import LessonPlanNotes from '../../components/LessonPlanNotes.js';
import SaveButton from '../../components/SaveButton.js';

const LessonPlanEditor = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#FFFAF5', paddingBottom: 25 }}>
      <View style={{ flex: 2.5 }}>
        <LessonPlanHeader />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <LessonSection subtitle={'Warm Up'} />
          <LessonSection subtitle={'Main Lesson'} />
          <LessonSection subtitle={'Cool Down'} />
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
    height: 600
  }
});

export default LessonPlanEditor;
