import { StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

import OptionsMenu from '../components/OptionsMenu.js';

import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LessonPlanMenuOverlay = ({ navigation, route }) => {
  const isLessonPlanEditor = route.params.isLessonPlanEditor;
  const lessonPlanName = route.params.lessonPlanName;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView>
        <SafeAreaView style={styles.overlay}>
          <OptionsMenu
            isLessonPlanEditor={isLessonPlanEditor}
            lessonPlanName={lessonPlanName}
            navigation={navigation}
            style={styles.menu}
          />
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(217,217,217, 0.8)',
    justifyContent: 'flex-end'
  },
  menu: {
    alignSelf: 'end'
  }
});

export default LessonPlanMenuOverlay;
