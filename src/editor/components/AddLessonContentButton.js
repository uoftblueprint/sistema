import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AddIcon from '../../../assets/add.svg';

const AddLessonContentButton = ({ placeholder, handleClick }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <SafeAreaView style={styles.sectionStyle}>
        <AddIcon style={styles.imageStyle} />
        <View style={styles.input}>
          <Text style={styles.text}>{placeholder}</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    shadowColor: '#453E3D',
    paddingLeft: 12,
    fontSize: 16
  },
  sectionStyle: {
    fontFamily: 'Poppins',
    fontWeight: '300',
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
    paddingHorizontal: 10
  },
  imageStyle: {
    height: '20',
    width: '20',
    paddingLeft: '10%'
  },
  text: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 15
  }
});

export default AddLessonContentButton;
