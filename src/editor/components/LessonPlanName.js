import React from 'react';
// import React from 'react'
// import 
import LessonPlanTextInput from './LessonPlanTextInput';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import LessonPlanNameInput from './LessonPlanNameInput';

const LessonPlanName = ({ subtitle }) => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        {/* <LessonPlanNameInput placeholder={todayDate + ": Lesson Plan Name"} /> */}
        <LessonPlanNameInput placeholder={todayDate} />
      </View>
    </SafeAreaView>
  );
};

const todayDate = new Date().toLocaleDateString('en-us', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 0
  }
});

export default LessonPlanName;
