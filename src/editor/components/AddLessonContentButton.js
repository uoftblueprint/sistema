import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
} from 'react-native';
import AddIcon from '../../../assets/icons/add.svg';
import { TextStyle, AppColors } from '../../Styles.config';
import { verticalScale } from 'react-native-size-matters';

const AddLessonContentButton = ({ handleClickActions, isDisabled }) => {
  const [visible, setVisible] = useState(false);

  const toggleCascade = () => {
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
      );
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    setVisible(!visible);
  };

  let index = 0;
  const actionComponents = handleClickActions.map(
    ({ placeholder, action, Icon }) => {
      index += 1;
      return (
        <TouchableOpacity
          onPress={action}
          disabled={isDisabled}
          key={index.toString()}
          style={styles.sectionStyle}>
          <SafeAreaView style={[styles.buttonStyle, styles.cascadeStyle]}>
            <Icon height={'20'} width={'20'} />
            <View style={styles.input}>
              <Text style={TextStyle.label}>{placeholder}</Text>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      );
    },
  );

  const renderCascade = () => {
    if (visible) {
      return actionComponents;
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleCascade}
        disabled={isDisabled}
        style={styles.sectionStyle}>
        <SafeAreaView style={styles.buttonStyle}>
          <AddIcon height={'20'} width={'20'} />
          <View style={styles.input}>
            <Text style={TextStyle.label}>Add content</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
      <SafeAreaView style={styles.cascadeSectionStyle}>
        {renderCascade()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 12,
  },
  sectionStyle: {
    shadowColor: AppColors.dark,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: AppColors.light_background,
    elevation: 5,
    borderWidth: 0.77,
    height: 'auto',
    borderColor: '#000',
    borderRadius: 8,
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    paddingLeft: '10%',
  },
  cascadeStyle: {
    width: '90%',
  },
  cascadeSectionStyle: {
    alignItems: 'flex-end',
    marginBottom: verticalScale(5),
  },
});

export default AddLessonContentButton;
