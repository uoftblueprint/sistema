import React from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
<<<<<<< HEAD
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
=======
import { StyleSheet, SafeAreaView, View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
>>>>>>> master
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';

const LessonPlanEditor = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader navigation={navigation} />
      <ScrollView style={styles.scrollView}>
<<<<<<< HEAD
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} flex={1}>
          <View style={styles.viewStyle}>
            <LessonSection sectionType={'warmUp'} subtitle={'Warm Up'} />
            <LessonSection
              sectionType={'mainLesson'}
              subtitle={'Main Lesson'}
            />
            <LessonSection sectionType={'coolDown'} subtitle={'Cool Down'} />
            <LessonPlanNotes
              sectionType={'notes'}
              subtitle={'Notes'}
              placeholder={''}
            />
=======
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <LessonSection navigation={navigation} subtitle={'Warm Up'} />
            <LessonSection navigation={navigation} subtitle={'Main Lesson'} />
            <LessonSection navigation={navigation} subtitle={'Cool Down'} />
            <LessonPlanNotes subtitle={'Notes'} />
>>>>>>> master
            <SaveButton />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: '1%',
    marginVertical: '1%',
    marginBottom: '20%'
  },
  viewStyle: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default LessonPlanEditor;
