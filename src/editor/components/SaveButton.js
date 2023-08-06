import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import SaveIcon from '../../../assets/save.svg';
import LessonPlanService from '../../services/LessonPlanService';
import { useSelector } from 'react-redux';
import {
  getLessonPlan,
  getInitialLessonPlanName,
} from '../../services/editor/lessonPlanSlice';
import { ERROR } from '../constants';

const SaveButton = ({
  isLessonPlanLoading,
  setLoading,
  setError,
  isNewLP,
  handleBackButton,
}) => {
  const lessonPlanObj = useSelector(state => getLessonPlan(state.lessonPlan));
  const lessonPlanInitialName = useSelector(state =>
    getInitialLessonPlanName(state.lessonPlan),
  );

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          { opacity: isLessonPlanLoading ? 0.5 : 1 },
        ]}
        onPress={async () => {
          if (!isLessonPlanLoading) {
            // Prevents user from pressing save before lesson plan is loaded in
            // As well as, disable user changes upon pressing save
            setLoading(true);

            // Check for naming conditions
            const wasRenamed =
              lessonPlanInitialName &&
              lessonPlanInitialName != lessonPlanObj.lessonPlanName;

            if (isNewLP || wasRenamed) {
              const isUnique = await LessonPlanService.isLPNameUnique(
                lessonPlanObj.lessonPlanName,
                lessonPlanObj.isInitiallyFavorited,
              );
              if (!isUnique) {
                setLoading(false);
                console.log('Duplicate name detected, aborting save.');
                setError(ERROR.DUPLICATE_NAME);
                return;
              }
            }

            // Once checks pass, write changes from redux to RNFS
            try {
              if (wasRenamed) {
                // Lesson plan was renamed so need to handle old file
                await LessonPlanService.saveLessonPlan(
                  lessonPlanObj,
                  true,
                  lessonPlanInitialName,
                );
              } else {
                await LessonPlanService.saveLessonPlan(lessonPlanObj, false);
              }
            } catch (e) {
              console.error('Error saving lesson plan: ', e);
              setError(ERROR.SAVING);
              return;
            }

            // Navigate back to Library
            setLoading(false);
            await handleBackButton(true);
          }
        }}>
        <SaveIcon height={'20'} width={'20'} />
        <Text style={styles.textContainer}>Save plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c3b9c3',
    height: 32.68,
    width: 109,
    borderWidth: 0.77,
    borderRadius: 6,
  },
  textContainer: {
    paddingLeft: 8.6,
    color: '#000',
    fontFamily: 'Mulish-Regular',
    fontSize: 13,
  },
});
export default SaveButton;
