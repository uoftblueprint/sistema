import React from 'react-native';
import BackArrow from '../../../assets/backArrow.svg';
import Menu from '../../../assets/menu.svg';
import LessonPlanName from './LessonPlanName';

import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const LessonPlanHeader = ({ navigation, lastEditedDate }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <BackArrow height={'30'} width={'30'}/>
      </TouchableOpacity>
      <LessonPlanName />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Lesson_Plan_Editor_Menu', {
            isLessonPlanEditor: true,
            lastEdited: lastEditedDate
          })
        }>
        <Menu height={'30'} width={'30'}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default LessonPlanHeader;
