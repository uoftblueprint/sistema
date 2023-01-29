import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import LessonPlanNameInput from './LessonPlanNameInput';

const LessonPlanName = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
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
