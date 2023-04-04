import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { OptionsMenuPadding } from '../Styles.config';
import LessonPlanService from '../services/LessonPlanService';
import { STACK_SCREENS } from '../library/constants';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;


const handleOnPress = (text, name, navigation) => {
  if (text === 'Copy Lesson Plan') {
    LessonPlanService.copyLessonPlan(name);
  }
  if (text === 'Delete Lesson Plan') {
    console.log("optionsmenubutton")
    console.log(name);
    // LessonPlanService.deleteLessonPlan(name);
    navigation.navigate(STACK_SCREENS.DELETE_LESSON_PLAN_OVERLAY, {
      lessonName: name,
    });
  }
};

const OptionsMenuButton = ({ text, icon, lessonName }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => {
          console.log('onPress')
          console.log(lessonName);
          handleOnPress(text, lessonName, navigation);
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
