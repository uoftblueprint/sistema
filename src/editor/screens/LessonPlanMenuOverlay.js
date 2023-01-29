import { StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

import OptionsMenu from '../components/OptionsMenu.js';

import { SafeAreaView } from 'react-native-safe-area-context';

const LessonPlanMenuOverlay = ({ navigation, route }) => {
  const isLessonPlanEditor = route.params.isLessonPlanEditor;
  const lessonPlanName = route.params.lessonPlanName;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
      <SafeAreaView  style={styles.overlay}>
          <OptionsMenu
            isLessonPlanEditor={isLessonPlanEditor}
            lessonPlanName={lessonPlanName}
            navigation={navigation}
            style={styles.menu}
          />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(217,217,217, 0.8)',
    justifyContent: 'flex-end'
  },
  menu: {
    alignSelf: 'end'
  }
});

export default LessonPlanMenuOverlay;
