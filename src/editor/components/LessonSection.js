import React from 'react';
import LessonPlanAddItem from './LessonPlanAddItem';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

const LessonSection = ({ subtitle }) => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.title}>{subtitle}</Text>
      <View>
        <LessonPlanAddItem placeholder={'Input text'} />
        <LessonPlanAddItem placeholder={'Add activity cards'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28
  },
  sectionContainer: {
    marginBottom: 25
  }
});

export default LessonSection;
