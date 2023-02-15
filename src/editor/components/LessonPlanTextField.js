import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

const LessonPlanTextField = ({ placeholder }) => {
  const [text, onChangeText] = React.useState(placeholder);

  return (
    <SafeAreaView style={styles.SectionStyle}>
      <TextInput
        multiline
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    fontStyle: 'italic',
    fontFamily: 'Mulish',
    fontSize: 16
  },
  SectionStyle: {
    flexDirection: 'column',
    backgroundColor: '#FFFAF5',
    height: 112,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 7.69,
    shadowColor: '#453E3D',
    elevation: 7
  }
});

export default LessonPlanTextField;
