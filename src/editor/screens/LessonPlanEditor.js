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

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditor = ({ navigation }) => {
  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: '15%',
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
=======
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          flex={1}
          height={'100%'}>
>>>>>>> master
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
    marginHorizontal: '1%',
    marginVertical: '1%',
<<<<<<< HEAD
    paddingBottom: '10%',
  },
  viewStyle: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  saveButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  }
=======
    marginBottom: '23%',
  },
  viewStyle: {
    flexDirection: 'column',
    alignItems: 'center',
  },
>>>>>>> master
});

export default LessonPlanEditor;
