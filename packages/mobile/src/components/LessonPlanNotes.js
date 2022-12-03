import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import LessonPlanTextField from './LessonPlanTextField';

const LessonPlanNotes = ({ subtitle }) => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.title}>{subtitle}</Text>
      <LessonPlanTextField
        placeholder={'Write your initial impressions here...'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28,
  },
  sectionContainer: {
    marginBottom: 30,
  },
});

export default LessonPlanNotes;
