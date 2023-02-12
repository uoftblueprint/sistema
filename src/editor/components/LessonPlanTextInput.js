import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';
import AddIcon from '../../../assets/add';

const LessonPlanTextInput = ({ placeholder, isButton }) => {
  const [text, onChangeText] = React.useState(placeholder);
  const [number, onChangeNumber] = React.useState(null);

  console.log(isButton);
  return (
    <SafeAreaView style={styles.SectionStyle}>
      <TouchableOpacity style={{ marginLeft: '2%' }}>
        <AddIcon height={25} width={25} style={styles.ImageStyle} />
      </TouchableOpacity>
      {isButton ? (
        <Text
          style={styles.input}
          underlineColorAndroid="transparent"
          value={number}>
          {placeholder}
        </Text>
      ) : (
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={onChangeNumber}
          value={number}
          placeholder={placeholder}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    shadowColor: '#453E3D',
    fontFamily: 'Mulish',
    fontWeight: '400',
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
