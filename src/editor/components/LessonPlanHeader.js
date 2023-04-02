import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import EditIcon from '../../../assets/edit.svg';
import Menu from '../../../assets/menu.svg';
import BackArrow from '../../../assets/backArrow.svg';
import { TextStyle } from '../../Styles.config';
import { scale, moderateScale } from 'react-native-size-matters';
import { STACK_SCREENS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../services/configureStore';
import {
  setLessonPlanName,
  getLessonPlanName,
} from '../../services/editor/lessonPlanSlice';
const headerIconSize = moderateScale(25);
const horizontalMargin = 30;

const LessonPlanHeader = ({ navigation, lastEditedDate, isSaved }) => {
  const [isEditable, setIsEditable] = useState(false);
  const todayDate = new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const [lessonName, setLessonName] = useState(todayDate.toString());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLessonPlanName({ name: lessonName }));
  }, [lessonName]);
  let reduxName = useSelector(state => getLessonPlanName(state.lessonPlan)); //TODO: why cant??

  console.log('REDUX NAME ' + reduxName);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{ marginLeft: scale(horizontalMargin) }}>
        <BackArrow height={headerIconSize} width={headerIconSize} />
      </TouchableOpacity>

      <SafeAreaView style={styles.SectionStyle}>
        <View style={styles.inputWrapper}>
          {isEditable ? (
            <TextInput
              style={[styles.input, TextStyle.h1]}
              value={lessonName}
              onChangeText={newText => {
                setLessonName(newText);
                // dispatch(
                //   setLessonPlanName({
                //     name: lessonName,
                //   }),
                // );
              }}
              onBlur={() => {
                setIsEditable(false);
              }}
              autoFocus={true}
            />
          ) : (
            <Text style={[styles.text, TextStyle.h1]} numberOfLines={1}>
              {lessonName}
            </Text>
          )}
        </View>
        <View style={styles.rightToolbar}>
          <TouchableOpacity
            onPress={() => {
              setIsEditable(true);
            }}>
            <EditIcon
              height={headerIconSize - 5}
              width={headerIconSize - 5}
              marginRight={scale(15)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY, {
                isLessonPlanEditor: true,
                lastEdited: lastEditedDate,
              })
            }>
            <Menu
              display={!isSaved}
              height={headerIconSize}
              width={headerIconSize}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: '100%',
    ...Platform.select({
      ios: {
        paddingLeft: '5%',
        paddingRight: 15,
      },
      android: {
        paddingVertical: 0,
        marginVertical: 0,
        paddingLeft: 0,
        marginLeft: 0,
        paddingRight: '5%',
      },
      default: {
        paddingVertical: 0,
      },
    }),
  },
  text: {
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        paddingLeft: '5%',
        paddingRight: 15,
      },
      android: {
        paddingVertical: 0,
        marginVertical: 0,
        paddingLeft: 0,
        marginLeft: 0,
        paddingRight: '5%',
      },
      default: {
        paddingVertical: 0,
      },
    }),
  },
  rightToolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: scale(horizontalMargin),
  },
  SectionStyle: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    height: 49,
    width: '100%',
    color: '#000',
    borderColor: 'transparent',
    borderRadius: 7.69,
    paddingLeft: scale(15),
  },
});

export default LessonPlanHeader;
