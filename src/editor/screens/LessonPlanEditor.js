import React from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';

const LessonPlanEditor = ({ navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} flex={1}>
          <View style={styles.viewStyle}>
            <LessonSection
              navigation={navigation}
              sectionType={'warmUp'}
              subtitle={'Warm Up'}
            />
            <LessonSection
              sectionType={'mainLesson'}
              subtitle={'Main Lesson'}
            />
            <LessonSection
              navigation={navigation}
              sectionType={'coolDown'}
              subtitle={'Cool Down'}
            />
            <LessonPlanNotes
              navigation={navigation}
              sectionType={'notes'}
              subtitle={'Notes'}
              placeholder={''}
            />
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
