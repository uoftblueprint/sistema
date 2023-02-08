import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import EditIcon from '../../../assets/edit.svg';

const LessonPlanName = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [lessonPlanName, setLessonPlanName] = useState('');

  useEffect(() => {
    const todayDate = new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    setLessonPlanName(todayDate);
  }, []);

  return (
    <SafeAreaView style={styles.SectionStyle}>
      {isEditable ? (
        <TextInput
          style={styles.input}
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
        <Text style={styles.input} numberOfLines={1}>
          {lessonPlanName}
        </Text>
      )}
      <TouchableOpacity>
        <EditIcon
          onPress={() => {
            setIsEditable(true);
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    letterSpacing: 0.3,
    paddingLeft: 12,
    paddingRight: 15,
    fontSize: 24,
    color: '#000'
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
    borderRadius: 7.69,
    paddingLeft: '3%'
  }
});

export default LessonPlanName;