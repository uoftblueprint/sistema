import React from 'react-native';
import EditIcon from '../../../assets/edit.svg';
import BackArrow from '../../../assets/backArrow.svg';
import Menu from '../../../assets/menu.svg';

import LessonPlanName from './LessonPlanName.js';
// import TextInputExample from './LessonPlanName.js';

import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';

const LessonPlanHeader = () => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity>
      <BackArrow />
    </TouchableOpacity>
    {/* <Text style={styles.title}>Lesson Plan Name</Text> */}
    <LessonPlanName subtitle={'LessonPlanHeader'}/>
    {/* <TextInputExample/> */}
    <TouchableOpacity>
      <EditIcon onClick />
    </TouchableOpacity>
    <TouchableOpacity>
      <Menu />
    </TouchableOpacity>
  </SafeAreaView>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 33,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 15,
    letterSpacing: 0.3
  }
});

export default LessonPlanHeader;
