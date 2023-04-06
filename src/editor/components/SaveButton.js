import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import SaveIcon from '../../../assets/save.svg';
import LessonPlanService from '../../services/LessonPlanService';
import { useSelector, useDispatch } from 'react-redux';
import { getLessonPlan, getInitialLessonPlanName, reset } from '../../services/editor/lessonPlanSlice';

const SaveButton = ({ navigation, isLessonPlanLoading, setLoading }) => {
  const lessonPlanObj = useSelector(state => getLessonPlan(state.lessonPlan));
  const lessonPlanInitialName = useSelector(state => getInitialLessonPlanName(state.lessonPlan));
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={async () => {
          if (!isLessonPlanLoading) {
            // Prevents user from pressing save before lesson plan is loaded in
            // Disable user changes
            setLoading(true);

            // Write changes from redux to RNFS
            if (lessonPlanInitialName && lessonPlanInitialName != lessonPlanObj.lessonPlanName) {
              // Lesson plan was renamed so need to handle old file
              await LessonPlanService.saveLessonPlan(lessonPlanObj, true, lessonPlanInitialName);   
            } else {
              await LessonPlanService.saveLessonPlan(lessonPlanObj, false);              
            }

            // Clear redux and route params
            dispatch(reset());
            navigation.setParams({ lessonPlanName: '' });

            // Navigate back to Library
            setLoading(false);
            navigation.goBack();
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
