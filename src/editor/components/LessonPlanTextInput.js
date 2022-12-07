import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import AddIcon from '../../../assets/AddIcon';

const LessonPlanTextInput = ({ placeholder }) => {
  const [text, onChangeText] = React.useState(placeholder);
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView style={styles.SectionStyle}>
      <TouchableOpacity>
        <AddIcon style={styles.ImageStyle} />
      </TouchableOpacity>
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
    shadowColor: '#453E3D',
    paddingLeft: 12,
    fontSize: 16
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    height: 49,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 7.69,
    shadowColor: '#453E3D',
    elevation: 7,
    marginVertical: 6,
    paddingLeft: '3%'
  },
  ImageStyle: {
    height: 25,
    width: 25
  }
});

export default LessonPlanTextInput;
