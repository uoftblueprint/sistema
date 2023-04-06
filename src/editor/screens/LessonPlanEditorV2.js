import { useEffect, useState } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';
import LessonSectionDraggable from '../components/LessonSectionDraggable.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { scale, verticalScale } from 'react-native-size-matters';
import { SectionName } from '../../services/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import LessonPlanService from '../../services/LessonPlanService.js';
import {
  loadInitialLessonPlan,
  setLessonPlanName,
  getLessonPlanName,
} from '../../services/editor/lessonPlanSlice.js';

const lastEditedDummy = 'Jan 1, 2023';

const LessonPlanEditorV2 = ({ navigation, route }) => {
  // NAVIGATION STATES
  const isFocused = useIsFocused();

  // REDUX STATES
  const dispatch = useDispatch();
  const nameLoaded = useSelector(state => getLessonPlanName(state.lessonPlan));

  // COMPONENT STATES
  const [isLoading, setLoading] = useState(false);
  const [isNewLP, setNew] = useState(true);

  // Fetch and set lesson plan data
  useEffect(() => {
    const fetchLPData = async () => {
      setLoading(true);
      setNew(true);
      let doneFetching = false;

      // Opening existing lesson plan in editor
      if (route.params && route.params.lessonPlanName) {
        const lessonPlanName = route.params.lessonPlanName;
        // Get the lesson plan from RNFS backend
        console.log(
          `LessonPlanEditorV2: Fetching data for ${lessonPlanName}...`,
        );
        await LessonPlanService.getLessonPlan(lessonPlanName)
          .then(lpObj => {
            // Set a unique key for each module per section
            const setKeyForModule = (module, i) => {
              return {
                type: module.type,
                content: module.content ?? '',
                name: module.name ?? '',
                key: `module-${i}`,
              };
            };
            lpObj[SectionName.warmUp] =
              lpObj[SectionName.warmUp].map(setKeyForModule);
            lpObj[SectionName.mainLesson] =
              lpObj[SectionName.mainLesson].map(setKeyForModule);
            lpObj[SectionName.coolDown] =
              lpObj[SectionName.coolDown].map(setKeyForModule);

            // Dispatch it to redux for the rest of the editor to render
            dispatch(loadInitialLessonPlan({ ...lpObj }));
            doneFetching = true;
            setNew(false);
          })
          .catch(() => {
            // TODO: [SIS-123] Open error overlay if lesson plan could not be opened
            doneFetching = false;
          });
      }

      // Opening new lesson plan or if fetching failed
      if (!doneFetching) {
        console.log('LessonPlanEditorV2: Opening blank lesson plan!');
        // Default lesson plan name is today's date
        const todayDate = new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        dispatch(setLessonPlanName(todayDate));
      }
      setLoading(false);
    };

    // If lesson plan name is currently blank and the screen is focused, populate the editor with smthg
    if (!nameLoaded && isFocused) {
      fetchLPData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LessonPlanHeader
        navigation={navigation}
        lastEditedDate={lastEditedDummy} // TODO: [SIS-136] Set last edited date in LessonPlanHeader
        showOptions={!isNewLP} // Don't show buttons to access LP options menu if LP is brand new (nothing to delete, favourite, etc.)
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
        <SaveButton
          navigation={navigation}
          isLessonPlanLoading={isLoading}
          setLoading={setLoading}
        />
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
    bottom: verticalScale(30),
  },
});

export default LessonPlanEditorV2;
