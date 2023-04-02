import React, { useRef, useState, useEffect } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { getLessonSection } from '../../services/editor/lessonPlanSlice';
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
import ActivityCardService from '../../services/ActivityCardService.js';
import {
  makeDirectory,
  readDirectory,
  readFile,
  writeFile,
  checkFileExists,
} from '../../services/routes/Local.js';

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditorV2 = ({ navigation, route }) => {
  const [isSaved, setIsSaved] = useState(false);
  const lessonPlanName = null;
  if (route.params) {
    setIsSaved(true);
    const { lessonPlanName } = route.params;
    useEffect(() => {
      let lessonPlanObj;
      async function getLessonPlan(LessonName) {
        lessonPlanObj = LessonPlanService.getLessonPlan(LessonName);
      }

      const lessName = JSON.parsonlesson(lessonPlanObj.name);
      
      // lessonPlanObj = new LessonPlan(
      //   json.name,
      //   warmUpList,
      //   mainLessonList,
      //   coolDownList,
      //   json.notes,
      // );

      //TODO: parse everything and add key and store in redux 
      
      getLessonPlan(lessonPlanName);
    }, []);
  }

  //let lessonName = 'Fake name';
  let lessonName = useSelector(state => getLessonPlanName(state.lessonPlan)); //TODO: why cant??
  let warmUp = useSelector(state =>
    getLessonSection(state.lessonPlan, SectionName.warmUp),
  ); //returns an array
  let mainLesson = useSelector(state =>
    getLessonSection(state.lessonPlan, SectionName.mainLesson),
  );
  let coolDown = useSelector(state =>
    getLessonSection(state.lessonPlan, SectionName.coolDown),
  );
  let notes = useSelector(state =>
    getLessonSection(state.lessonPlan, SectionName.notes),
  );

  const saveLessonPlan = () => {
    setIsSaved(true);
    //stringify all
    //TODO: add key to use module
    // for (let i = 0; i < warmUp.length; i++){
    //   let module = warmUp[i];
    //   if (module) {
    //     module = module.filter((k) => k !== "key");
    //     console.log(module);
    //   }

    // }
    //1. Get from Redux
    lessonName = JSON.stringify(lessonName);
    warmUp = JSON.stringify(warmUp);
    mainLesson = JSON.stringify(mainLesson);
    coolDown = JSON.stringify(coolDown);
    notes = JSON.stringify(notes);

    // console.log(lessonName);
    // console.log("WARMUP:" + warmUp);
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

    navigation.navigate(STACK_SCREENS.LIBRARY, {sortT: 0});
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy}
        lessonName={lessonPlanName ? lessonPlanName : lessonName}
        isSaved={isSaved}
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
