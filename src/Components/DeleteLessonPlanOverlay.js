import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Overlay from './Overlay';
import SistemaButton from './SistemaButton';
import { useNavigation } from '@react-navigation/native';
import LessonPlanService from '../services/LessonPlanService';

const DeleteLessonPlanOverlay = lessonName => {
  const navigation = useNavigation();
  const deleteLesson = name => {
    // console.log("deleteLesson triggered:");
    LessonPlanService.deleteLessonPlan(lessonName);
  };
  return (
    <Overlay>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Delete this lesson plan?</Text>
        <Text style={styles.description}> t4xtttt.</Text>
        <SafeAreaView style={styles.row}>
          <SistemaButton
            color="purple"
            style={styles.buttonLeft}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </SistemaButton>
          <SistemaButton
            color="blue"
            styles={styles.buttonRight}
            onPress={() => deleteLesson(lessonName)}>
            <Text style={styles.buttonText}>Delete</Text>
          </SistemaButton>
        </SafeAreaView>
      </SafeAreaView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: 'rgba(0,0,0,0.87)',
    marginBottom: 3,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: 'black',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonRight: {
    marginLeft: 14,
  },
  buttonLeft: {
    marginRight: 14,
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
  },
});

export default DeleteLessonPlanOverlay;
