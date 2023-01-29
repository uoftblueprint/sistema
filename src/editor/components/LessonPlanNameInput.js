import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';

const LessonPlanNameInput = ({ placeholder }) => {
  const [text, onChangeText] = React.useState(placeholder);
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView style={styles.SectionStyle}>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={onChangeNumber}
        value={number}
        placeholder={placeholder}
      />
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
    width: 250,
    color: '#000',
    borderColor: 'transparent',
    borderRadius: 7.69,
    paddingLeft: '3%'
  }
});

export default LessonPlanNameInput;
