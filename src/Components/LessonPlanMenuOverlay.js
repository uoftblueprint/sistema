import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import OptionsMenu from './OptionsMenu.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const LessonPlanMenuOverlay = ({ navigation, route }) => {
  const { isLessonPlanEditor, lastEdited, lessonPlanName } = route.params;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView style={styles.overlay}>
        <OptionsMenu
          isLessonPlanEditor={isLessonPlanEditor}
          lastEdited={lastEdited}
          navigation={navigation}
          style={styles.menu}
          lessonPlan={lessonPlanName}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(217,217,217, 0.8)',
    justifyContent: 'flex-end',
    flex: 1,
  },
  menu: {
    alignSelf: 'stretch',
  },
});

export default LessonPlanMenuOverlay;
