import React from 'react';
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
import { TextStyle } from '../../Styles.config';

const LessonPlanName = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [lessonPlanName, setLessonPlanName] = useState('');

  useEffect(() => {
    const todayDate = new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setLessonPlanName(todayDate);
  }, []);

  return (
    <SafeAreaView style={styles.SectionStyle}>
      <View style={styles.inputWrapper}>
        {isEditable ? (
          <TextInput
            style={[styles.input, TextStyle.h1]}
            value={lessonPlanName}
            onChangeText={newText => {
              setLessonPlanName(newText);
            }}
            onBlur={() => {
              setIsEditable(false);
            }}
            autoFocus={true}
          />
        ) : (
          <Text style={[styles.text, TextStyle.h1]} numberOfLines={1}>
            {lessonPlanName}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsEditable(true);
        }}>
        <EditIcon height={'25'} width={'25'} paddingRight={'12%'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    height: 49,
    width: 280,
    color: '#000',
    borderColor: 'transparent',
    borderRadius: 8,
    paddingLeft: '3%',
  },
});

export default LessonPlanName;
