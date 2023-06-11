import React, { useState } from 'react';
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

const AddLessonContentButton = ({ handleClickActions, isDisabled }) => {
  const [visible, setVisible] = useState(false);

  const toggleCascade = () => {
    setVisible(!visible);
  }
  
  let index = 0;
  const actionComponents = handleClickActions.map(({ placeholder, action, Icon }) => {
    index += 1;
    return (
      <TouchableOpacity onPress={action} disabled={isDisabled} key={index.toString()}>
        <SafeAreaView style={styles.cascadeStyle}>
          <Icon height={'20'} width={'20'} />
          <View style={styles.input}>
            <Text style={TextStyle.label}>{placeholder}</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    )
  })

  const renderCascade = () => {
    if (visible) {
      return (actionComponents);
    }
  }

  return (
    <TouchableOpacity onPress={toggleCascade} disabled={isDisabled}>
      <SafeAreaView style={styles.sectionStyle}>
        <AddIcon height={'30'} width={'30'} />
        <View style={styles.input}>
          <Text style={TextStyle.label}>Add Content</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.cascadeSectionStyle}>
        {renderCascade()}
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
    height: verticalScale(40),
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
  cascadeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDFBF7',
    height: verticalScale(40),
    width: '90%',
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
  cascadeSectionStyle: {
    alignItems: 'flex-end',
  },
});

export default AddLessonContentButton;
