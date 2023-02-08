import React from 'react-native';
import BackArrow from '../../../assets/backArrow.svg';
import Menu from '../../../assets/menu.svg';
import LessonPlanName from './LessonPlanName';

import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const LessonPlanHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <BackArrow />
      </TouchableOpacity>
      <LessonPlanName />
      <TouchableOpacity>
        <Menu />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 33,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default LessonPlanHeader;
