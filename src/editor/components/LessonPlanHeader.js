import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import EditIcon from '../../../assets/edit.svg';
import Menu from '../../../assets/menu.svg';
import BackArrow from '../../../assets/backArrow.svg';
import { TextStyle } from '../../Styles.config';
import { scale, moderateScale } from 'react-native-size-matters';
import { STACK_SCREENS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import {
  getLessonPlanName,
  setLessonPlanName,
  getDirty,
  getInitialLessonPlanName,
} from '../../services/editor/lessonPlanSlice';

const headerIconSize = moderateScale(25);
const horizontalMargin = 30;

const LessonPlanHeader = ({
  navigation,
  lastEditedDate,
  showOptions,
  handleBackButton,
  toggleUnsavedChanges,
  disableEditName,
}) => {
  // REDUX STATES
  const dispatch = useDispatch();
  const currLPName = useSelector(state =>
    getLessonPlanName(state.lessonPlan),
  );
  const isDirty = useSelector(state => getDirty(state.lessonPlan));
  const initialLPName = useSelector(state => getInitialLessonPlanName(state.lessonPlan));

  // REACT COMPONENT STATES
  const [isEditable, setIsEditable] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: scale(horizontalMargin) }}
        onPress={() => {
          if (isDirty) {
            // Warn the user that there are unsaved changes
            toggleUnsavedChanges(true);
          } else {
            handleBackButton();
          }
        }}>
        <BackArrow height={headerIconSize} width={headerIconSize} />
      </TouchableOpacity>

      <SafeAreaView style={styles.SectionStyle}>
        <View style={styles.inputWrapper}>
          {isEditable ? (
            <TextInput
              style={[styles.input, TextStyle.h1]}
              multiline={false}
              maxLength={75}
              value={currLPName}
              onChangeText={newText => {
                dispatch(setLessonPlanName({ name: newText, isDirty: true }));
              }}
              onBlur={() => {
                setIsEditable(false);
              }}
              autoFocus={true}
            />
          ) : (
            <Text style={[styles.text, TextStyle.h1]} numberOfLines={1}>
              {currLPName}
            </Text>
          )}
        </View>
        <View style={styles.rightToolbar}>
          <TouchableOpacity
            disabled={disableEditName}
            onPress={() => {
              setIsEditable(true);
            }}>
            <EditIcon height={headerIconSize - 5} width={headerIconSize - 5} />
          </TouchableOpacity>
          {showOptions && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY, {
                  isLessonPlanEditor: true,
                  lastEdited: lastEditedDate,
                  lessonPlanName: initialLPName,
                })
              }>
              <Menu
                height={headerIconSize}
                width={headerIconSize}
                marginLeft={scale(15)}
              />
            </TouchableOpacity>
          )}
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
    borderRadius: 8,
    paddingLeft: scale(15),
  },
});

export default LessonPlanHeader;
