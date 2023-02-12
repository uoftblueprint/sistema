import EditIcon from '../../../assets/edit.svg';
import BackArrow from '../../../assets/backArrow.svg';
import Menu from '../../../assets/menu.svg';
import LessonPlanName from './LessonPlanName';

import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const LessonPlanHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <BackArrow height={25} width={25} />
      </TouchableOpacity>
      <LessonPlanName />
      <TouchableOpacity>
        <EditIcon height={25} width={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Lesson_Plan_Editor_Menu', {
            isLessonPlanEditor: true
          })
        }>
        <Menu height={25} width={25} />
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
