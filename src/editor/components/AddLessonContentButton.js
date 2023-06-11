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

  const cascadeArray = new Array();

  for (action in handleClickActions) {
    cascadeArray.push(
      <TouchableOpacity onPress={handleClickActions[action]} disabled={isDisabled}>
        <SafeAreaView style={styles.sectionStyle}>
          <AddIcon height={'30'} width={'30'} />
          <View style={styles.input}>
            <Text style={TextStyle.label}>{action}</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  }

  const renderCascade = () => {
    console.log(cascadeArray);
    if (visible) {
      return (
        {cascadeArray}
      )
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
      {renderCascade()}
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
