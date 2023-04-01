import React, { useRef, useEffect } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import LessonSectionDraggable from '../components/LessonSectionDraggable.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { scale, verticalScale } from 'react-native-size-matters';
import { SectionName } from '../../services/constants.js';
import store from '../../services/configureStore';
import { addLessonPlan } from '../../services/editor/lessonPlanSlice.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditorV2 = ({ navigation, route }) => {
  if (route.params) {
    const { lessonPlanName } = route.params;
    useEffect(() => {
      async function getLessonPlan() {
        let lessonPlanObj = await LessonPlanService.getLessonPlan(
          lessonPlanName,
        );
        store.dispatch(
          //check arrays this is JSONparsed too
          //add a key to each module
          addLessonPlan({
            lessonPlanName: lessonPlanObj.json.name,
            warmUp: lessonPlanObj.warmUpList,
            mainLesson: lessonPlanObj.mainLessonList,
            coolDown: lessonPlanObj.coolDownList,
            notes: lessonPlanObj.json.notes,
          }),
        );
      }
      getLessonPlan();
    }, []);
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
      />

      <NestableScrollContainer contentContainerStyle={styles.viewStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

      <TouchableOpacity style={styles.saveButton}>
        <SaveButton />
        {/* when saving, strinfy the lessonapln object (and remove key)<

        when displaying, JSON.parse*/}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFAF5',
    justifyContent: 'center',
  },
  viewStyle: {
    flexDirection: 'column',
    paddingBottom: verticalScale(75),
    paddingHorizontal: scale(30),
  },
  saveButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: verticalScale(20),
  },
});

export default LessonPlanEditorV2;
