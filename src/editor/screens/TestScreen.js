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
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist";
import LessonSectionDraggable from '../components/LessonSectionDraggable.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { SectionName } from '../../services/constants.js';

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const TestScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
      />

      <NestableScrollContainer contentContainerStyle={styles.viewStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <View>
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.warmUp}
            />
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.mainLesson}
            />
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.coolDown}
            />
            <LessonPlanNotes
              navigation={navigation}
              sectionType={SectionName.notes}
              placeholder={''}
            />
         </View>
        </TouchableWithoutFeedback>
      </NestableScrollContainer>
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
    paddingBottom: '10%',
    backgroundColor: 'blue'
  },
  viewStyle: {
    flexDirection: 'column',
    backgroundColor: 'yellow'
  },
  saveButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
});

export default TestScreen;
