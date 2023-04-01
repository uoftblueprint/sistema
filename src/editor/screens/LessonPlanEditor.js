import React from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { scale, verticalScale } from 'react-native-size-matters';

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditor = ({ navigation, name }) => {

  
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: verticalScale(55),
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.viewStyle}>
            <LessonSection
              navigation={navigation}
              sectionType={'warmUp'}
              subtitle={'Warm Up'}
            />
            <LessonSection
              navigation={navigation}
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
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.saveButton}>
        <SaveButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    paddingBottom: verticalScale(20),
  },
  viewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: scale(30),
  },
  saveButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(20),
  },
});

export default LessonPlanEditor;
