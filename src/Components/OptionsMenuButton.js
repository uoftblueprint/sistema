import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { OptionsMenuPadding } from '../Styles.config';
import LessonPlanService from '../services/LessonPlanService';

const windowWidth = Dimensions.get('window').width;

const handleOnPress = (text, name) => {
  if (text === 'Copy Lesson Plan') {
    LessonPlanService.copyLessonPlan(name);
  }
};

const OptionsMenuButton = ({ text, icon, lessonName }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => {
          handleOnPress(text, lessonName);
        }}>
        <SafeAreaView
          style={{
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
        </SafeAreaView>
        <Text style={styles.textContainer}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderColor: '#000000',
    borderWidth: 0.25,
  },
  buttonContainer: {
    paddingLeft: OptionsMenuPadding,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    width: '100%',
    height: 50,
  },
  textContainer: {
    paddingLeft: OptionsMenuPadding,
    fontFamily: 'Mulish-Bold',
    color: 'rgba(0,0,0, 0.87)',
    fontSize: 16,
  },
});

export default OptionsMenuButton;
