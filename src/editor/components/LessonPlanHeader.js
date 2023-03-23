import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import { useState, createRef, useEffect } from 'react';
import BackArrow from '../../../assets/backArrow.svg';
import EditIcon from '../../../assets/edit.svg';
import Menu from '../../../assets/menu.svg';
import LessonPlanName from './LessonPlanName';
import { STACK_SCREENS } from '../../library/constants';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const headerIconSize = 30;

const LessonPlanHeader = ({ navigation, lastEditedDate }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [lessonPlanName, setLessonPlanName] = useState('');

  const inputRef = createRef();

  useEffect(() => {
    const todayDate = new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setLessonPlanName(todayDate);
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      console.log('keyboard shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      console.log('keyboard hidden');
      setIsEditable(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
      console.log("focusing & pulling up keyboard");
    } else {
      inputRef.current.blur()
      console.log('NOT editable');
    }
  }, [isEditable]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.toolbar, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity>
          <BackArrow height={'30'} width={'30'} />
        </TouchableOpacity>
        
        {/* LESSON PLAN NAME*/}
        <TextInput
          ref={inputRef}
          style={[ styles.input, TextStyle.h1, isEditable ? styles.isOnTop : styles.isBehind ]}
          value={lessonPlanName}
          onChangeText={newText => {
            setLessonPlanName(newText);
          }}
        />
        <Text style={[styles.text, TextStyle.h1, !isEditable ? styles.isOnTop : styles.isBehind ]} numberOfLines={1}>
          {lessonPlanName}
        </Text>
      </View>

      <View style={[styles.toolbar, { justifyContent: 'flex-end' }]}>
        <TouchableOpacity
          style={{ marginRight: scale(15) }}
          onPress={() => {
            setIsEditable(true);
          }}>
          <EditIcon height={'25'} width={'25'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY, {
              isLessonPlanEditor: true,
              lastEdited: lastEditedDate,
            })
          }>
          <Menu height={'30'} width={'30'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFAF5',
    height: '100%',
    ...Platform.select({
      ios: {
        paddingLeft: '5%',
        paddingRight: 15,
      },
      android: {
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        paddingLeft: 0,
        paddingRight: '5%',
      },
      default: {
        paddingVertical: 0,
      },
    }),
  },
  text: {
    backgroundColor: '#FFFAF5',
    textAlignVertical: 'center',
  },
  isOnTop: {
    zIndex: 3,
  },
  isBehind: {
    opacity: 0,
    width: 0,
    zIndex: 1, 
    ...Platform.select({
      ios: {
        paddingHorizontal: 0,
      },
      android: {
        paddingRight: 0,
      },
    }),
  }
});

export default LessonPlanHeader;
