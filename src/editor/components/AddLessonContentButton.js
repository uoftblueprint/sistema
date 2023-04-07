import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AddIcon from '../../../assets/add.svg';
import { TextStyle } from '../../Styles.config';
import { verticalScale } from 'react-native-size-matters';

const AddLessonContentButton = ({ placeholder, handleClick }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <SafeAreaView style={styles.sectionStyle}>
        <AddIcon height={'30'} width={'30'} />
        <View style={styles.input}>
          <Text style={TextStyle.label}>{placeholder}</Text>
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
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FDFBF7',
    height: verticalScale(50),
    width: '100%',
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  imageStyle: {
    paddingLeft: '10%',
  },
});

export default AddLessonContentButton;
