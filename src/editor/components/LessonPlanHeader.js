import React from 'react-native';
import EditIcon from '../../assets/EditIcon';
import BackArrow from '../../assets/BackArrow';
import Menu from '../../assets/Menu';

import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const LessonPlanHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.arrowContainer}>
        <BackArrow />
      </TouchableOpacity>
      <Text style={styles.title}>Lesson Plan Name</Text>
      <View style={styles.rightIconsContainer}>
        <TouchableOpacity style={styles.IconContainer}>
          <EditIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.IconContainer}>
          <Menu />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'center'
  },
  arrowContainer: {
    flex: 0.5,
    height: '100%',
    flexDirection: 'column',
    marginVertical: 9
  },
  IconContainer: {
    //container for edit and menu icon
    flex: 1,
    justifyContent: 'center'
  },
  rightIconsContainer: {
    //container for edit and menu icons together
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  title: {
    flexDirection: 'row',
    fontFamily: 'Poppins',
    color: '#20232a',
    textAlign: 'left',
    fontSize: 24,
    flex: 5,
    fontWeight: 'bold',
    paddingRight: 15,
    letterSpacing: 0.3
  }
});

export default LessonPlanHeader;
