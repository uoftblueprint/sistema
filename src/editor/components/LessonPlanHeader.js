import React from 'react-native';
import EditIcon from '../../../assets/EditIcon';
import BackArrow from '../../../assets/BackArrow';
import Menu from '../../../assets/Menu';

import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';

const LessonPlanHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <BackArrow />
      </TouchableOpacity>
      <Text style={styles.title}>Lesson Plan Name</Text>
      <TouchableOpacity>
        <EditIcon />
      </TouchableOpacity>
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
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 15,
    letterSpacing: 0.3
  }
});

export default LessonPlanHeader;
