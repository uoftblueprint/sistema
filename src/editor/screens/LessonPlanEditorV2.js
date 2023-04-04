import React, { useRef, useState, useEffect } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { grabNextKey } from '../../services/helpers';

import {
  addToNote,
  addToSection,
  getLessonSection,
  setLessonPlanName,
} from '../../services/editor/lessonPlanSlice';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import LessonSectionDraggable from '../components/LessonSectionDraggable.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { scale, verticalScale } from 'react-native-size-matters';
import { SectionName, MAINDIRECTORY } from '../../services/constants.js';
import { STACK_SCREENS } from '../constants';

import { TouchableOpacity } from 'react-native-gesture-handler';
import LessonPlanService from '../../services/LessonPlanService.js';
import { useSelector, useDispatch } from 'react-redux';
import { LessonPlan } from '../../services/models.js';
import {
  getLessonPlanName,
  getLessonPlanSection,
} from '../../services/editor/lessonPlanSlice';
import { addLessonPlanName } from '../../services/editor/lessonPlanSlice';

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditorV2 = ({ navigation, route }) => {
  const [isSaved, setIsSaved] = useState(route.params ? true : false);
  const lessonPlanName = route.params ? route.params : null;
  const dispath = useDispatch();

  if (route.params) {
    setIsSaved(true);
    const { lessonPlanName } = route.params;
    useEffect(() => {
      async function getLessonPlan(LessonName) {
        await LessonPlanService.getLessonPlan(LessonName);
      }
      let lessonPlanObj = getLessonPlan(lessonPlanName);
      const listOfKeys = lessonPlanObj.warmUpList.map(({ key }) => key); // Get a list of all keys in the section
      const nextKey = grabNextKey(listOfKeys);
      const lessName = JSON.parse(lessonPlanObj.name);
      dispath(setLessonPlanName({ name: JSON.parse(lessName) }));

      const notes = JSON.parse(lessonPlanObj.notes);
      dispath(addToNote({ note: JSON.parse(notes) }));
      for (let module of lessonPlanObj.warmUpList) {
        dispath(
          addToSection({
            type: JSON.parse(module.type),
            content: JSON.parse(module.content),
            name: JSON.parse(module.name),
            key: nextKey,
          }),
        );
      }
      for (let module of lessonPlanObj.mainLessonList) {
        dispath(
          addToSection({
            type: JSON.parse(module.type),
            content: JSON.parse(module.content),
            name: JSON.parse(module.name),
            key: nextKey,
          }),
        );
      }
      for (let module of lessonPlanObj.coolDownList) {
        dispath(
          addToSection({
            type: JSON.parse(module.type),
            content: JSON.parse(module.content),
            name: JSON.parse(module.name),
            key: nextKey,
          }),
        );
      }
    }, [isSaved]);
  }

    let lessonNameGET = state => getLessonPlanName(state.lessonPlan);
  let warmUpGET = state =>
    getLessonSection(state.lessonPlan, SectionName.warmUp);
  let mainLessonGET = state =>
    getLessonSection(state.lessonPlan, SectionName.mainLesson);
  let coolDownGET = state =>
    getLessonSection(state.lessonPlan, SectionName.coolDown);
  let notesGET = state => getLessonSection(state.lessonPlan, SectionName.notes);

  let lessonName = useSelector(lessonNameGET); //TODO: why cant??
  let warmUp = useSelector(warmUpGET); //returns an array
  let mainLesson = useSelector(mainLessonGET);
  let coolDown = useSelector(coolDownGET);
  let notes = useSelector(notesGET);

  const saveLessonPlan = () => {
    setIsSaved(true);

    //Remove keys
    for (let module in warmUp) {
      delete (module[key]);
    }
    for (let module in mainLesson) {
      delete (module[key]);
    }
    for (let module in coolDown) {
      delete (module[key]);
    }
    //stringify all
    lessonName = JSON.stringify(lessonName);
    warmUp = JSON.stringify(warmUp);
    mainLesson = JSON.stringify(mainLesson);
    coolDown = JSON.stringify(coolDown);
    notes = JSON.stringify(notes);

    const lessonPlanObject = new LessonPlan(
      lessonName,
      warmUp,
      mainLesson,
      coolDown,
      notes,
    );

    //2. Save to RNFS
    async function saveLessonPlanToRNFS(lessonPlanObj) {
      await LessonPlanService.saveLessonPlan(lessonPlanObj);
    }
    saveLessonPlanToRNFS(lessonPlanObject);

    navigation.navigate(STACK_SCREENS.LIBRARY, { sortT: 0 });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
        lessonName={lessonPlanName}
        isSaved={isSaved}
      />
      <NestableScrollContainer contentContainerStyle={styles.viewStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <LessonSectionDraggable
              isSaved={isSaved}
              navigation={navigation}
              sectionType={SectionName.warmUp}
            />
            <LessonSectionDraggable
              isSaved={isSaved}
              navigation={navigation}
              sectionType={SectionName.mainLesson}
            />
            <LessonSectionDraggable
              isSaved={isSaved}
              navigation={navigation}
              sectionType={SectionName.coolDown}
            />
            <LessonPlanNotes
              isSaved={isSaved}
              navigation={navigation}
              sectionType={SectionName.notes}
              placeholder={''}
            />
          </View>
        </TouchableWithoutFeedback>
      </NestableScrollContainer>

      <View style={styles.saveButton}>
        <TouchableOpacity onPress={saveLessonPlan}>
          <SaveButton />
          {/* take redux, save to rnfs. when saving, strinfy the lessonapln object (and remove key)when displaying, JSON.parse*/}
        </TouchableOpacity>
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
