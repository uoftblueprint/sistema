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
import { useDispatch, useSelector } from 'react-redux';
import LessonPlanService from '../../services/LessonPlanService.js';
import {
  loadInitialLessonPlan,
  loadInitialFavState,
  setLessonPlanName,
  getLessonPlanName,
  reset,
} from '../../services/editor/lessonPlanSlice.js';
import UnsavedChangesOverlay from '../components/overlays/UnsavedChangesOverlay.js';
import ErrorLoadingLPOverlay from '../components/overlays/ErrorLoadingLPOverlay.js';
import { scale, verticalScale } from 'react-native-size-matters';
import { SectionName } from '../../services/constants.js';
import { STACK_SCREENS as LIBRARY_STACK } from '../../library/constants.js';


const LessonPlanEditorV2 = ({ navigation, route }) => {
  // NAVIGATION STATES
  const isFocused = useIsFocused();

  // REDUX STATES
  const dispatch = useDispatch();
  const nameLoaded = useSelector(state => getLessonPlanName(state.lessonPlan));

  // COMPONENT STATES
  const [isFetching, setFetching] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isNewLP, setNew] = useState(true);
  const [unsavedOverlayVisible, toggleUnsavedChanges] = useState(false);
  const [errorOverlayVisible, toggleLoadingError] = useState(false);

  // Clear redux and route params
  const leaveEditor = () => {
    dispatch(reset());
    navigation.setParams({ lessonPlanName: '', isFavorited: false, lastEdited: '' });
    toggleUnsavedChanges(false);
    navigation.navigate(LIBRARY_STACK.NAVIGATOR, {screen: LIBRARY_STACK.LIBRARY}); // Go to the library
  };

  // Fetch and set lesson plan data
  useEffect(() => {
    const fetchLPData = async () => {
      setFetching(true);
      setNew(true);
      let fetchSuccess = false;

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
            fetchSuccess = true;
            setNew(false);
          })
          .catch(() => {
            // Open error overlay if lesson plan could not be opened
            toggleLoadingError(true);
            // Open a blank lesson plan
            fetchSuccess = false;
          });
      }

      // Opening new lesson plan or if fetching failed
      if (!fetchSuccess) {
        console.log('LessonPlanEditorV2: Opening blank lesson plan!');
        // Default lesson plan name is today's date
        const todayDate = new Date().toLocaleDateString('en-us', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        dispatch(setLessonPlanName({ name: todayDate, isDirty: false }));
      }

      // Set redux state if LP is initially favorited for pathing reasons
      const isInitiallyFavorited = isNewLP ? false : ((route.params && route.params.isFavorited) ?? false);
      dispatch(loadInitialFavState(isInitiallyFavorited));

      setFetching(false);
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
        lastEditedDate={(route.params && route.params.lastEdited) ?? 'unknown'}
        showOptions={!isNewLP} // Don't show buttons to access LP options menu if LP is brand new (nothing to delete, favourite, etc.)
        toggleUnsavedChanges={toggleUnsavedChanges}
        handleBackButton={leaveEditor}
        disableEditName={isFetching || isSaving}
      />

      <NestableScrollContainer contentContainerStyle={styles.viewStyle}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.warmUp}
              isFetching={isFetching}
              disableInteractions={isFetching || isSaving}
            />
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.mainLesson}
              isFetching={isFetching}
              disableInteractions={isFetching || isSaving}
            />
            <LessonSectionDraggable
              navigation={navigation}
              sectionType={SectionName.coolDown}
              isFetching={isFetching}
              disableInteractions={isFetching || isSaving}
            />
            <LessonPlanNotes
              sectionType={SectionName.notes}
              isDisabled={isFetching || isSaving}
            />
          </View>
        </TouchableWithoutFeedback>
      </NestableScrollContainer>

      <View style={styles.saveButton}>
        <SaveButton
          navigation={navigation}
          isLessonPlanLoading={isFetching || isSaving}
          setLoading={setSaving}
          isNewLP={isNewLP}
          handleBackButton={leaveEditor}
        />
      </View>

      {/* Overlays */}
      <UnsavedChangesOverlay
        visible={unsavedOverlayVisible}
        handleStay={toggleUnsavedChanges}
        handleLeave={leaveEditor}
      />
      <ErrorLoadingLPOverlay
        visible={errorOverlayVisible}
        handleClose={toggleLoadingError}
      />
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
  overlayContainer: {
    flexDirection: 'row',
    height: 'auto',
  },
  overlayTitle: {
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    justifyContent: 'space-evenly',
  },
  textColumn: {
    flex: 5,
    flexDirection: 'column',
  },
});

export default LessonPlanEditorV2;
