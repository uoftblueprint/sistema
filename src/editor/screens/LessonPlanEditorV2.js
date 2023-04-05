import { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import LessonPlanService from '../../services/LessonPlanService.js';
import { loadInitialLessonPlan, setLessonPlanName } from '../../services/editor/lessonPlanSlice.js';

// dummy last edited date
const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditorV2 = ({ navigation, route }) => {
  const dispatch = useDispatch();

  // Equivalent to componentDidMount
  useEffect(() => {
    const fetchLPData = async () => {
      const { lessonPlanName } = route.params;
      let doneFetching;
      
      // Opening existing lesson plan in editor
      if (lessonPlanName) { 
        console.log("FOUND YA", lessonPlanName);
        // Get the lesson plan from RNFS backend
        await LessonPlanService.getLessonPlan(lessonPlanName)
          .then((lpObj) => {
            // Set a unique key for each module per section
            const setKeyForModule = (module, i) => {
              return {
                type: module.type,
                content: module.content ?? '',
                name: module.name ?? '',
                key: `module-${i}`
              }
            };
            lpObj.warmUp = lpObj.warmUp.map(setKeyForModule);
            lpObj.mainLesson = lpObj.mainLesson.map(setKeyForModule);
            lpObj.coolDown = lpObj.coolDown.map(setKeyForModule);

            // Dispatch it to redux for the rest of the editor to render
            dispatch(loadInitialLessonPlan({...lpObj}));
            doneFetching = true;
          })
          .catch(() => {
            // TODO: [SIS-123] Open error overlay if lesson plan could not be opened
            doneFetching = false;
          });
      } 

      // Opening new lesson plan or if fetching failed
      if (!doneFetching) {
        // Default lesson plan name is today's date
        const todayDate = new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        dispatch(setLessonPlanName(todayDate));
      }
    };
    fetchLPData();
  }, []);

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
