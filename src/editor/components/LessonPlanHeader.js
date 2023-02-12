import EditIcon from '../../../assets/edit.svg';
import BackArrow from '../../../assets/backArrow.svg';
import Menu from '../../../assets/menu.svg';

import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';

const LessonPlanHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <BackArrow />
      </TouchableOpacity>
      <Text style={styles.title}>Lesson Plan Name</Text>
      <TouchableOpacity>
        <EditIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Lesson_Plan_Editor_Menu', {
            isLessonPlanEditor: true
          })
        }>
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
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Poppins',
    paddingRight: 15,
    letterSpacing: 0.3
  }
});

export default LessonPlanHeader;
