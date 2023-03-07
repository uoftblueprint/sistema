import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AddIcon from '../../../assets/add.svg';

const AddLessonContentButton = ({ placeholder, handleClick }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <SafeAreaView style={styles.sectionStyle}>
        <AddIcon height={'30'} width={'30'} />
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
    fontSize: 16,
  },
  sectionStyle: {
    fontFamily: 'Poppins-Light',
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
    paddingHorizontal: 10,
  },
  imageStyle: {
    paddingLeft: '10%',
  },
  text: {
    fontFamily: 'Mulish-Regular',
    fontSize: 15,
  },
});

export default AddLessonContentButton;
