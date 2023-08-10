import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import OptionsMenu from './OptionsMenu.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../Styles.config.js';

const LessonPlanMenuOverlay = ({ navigation, route }) => {
  const { isLessonPlanEditor, lastEdited, lessonPlanName, isFavorited } =
    route.params;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView style={styles.overlay}>
        <OptionsMenu
          isLessonPlanEditor={isLessonPlanEditor}
          lastEdited={lastEdited}
          navigation={navigation}
          lessonPlanName={lessonPlanName}
          isFavorited={isFavorited}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: AppColors.overlay_background,
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default LessonPlanMenuOverlay;
