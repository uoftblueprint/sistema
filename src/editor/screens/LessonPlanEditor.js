import { useState } from 'react';
import LessonPlanHeader from '../components/LessonPlanHeader.js';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import LessonSection from '../components/LessonSection.js';
import LessonPlanNotes from '../components/LessonPlanNotes.js';
import SaveButton from '../components/SaveButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToSection, selectLessonPlan } from '../../services/editor/lessonPlanSlice.js';

const LessonPlanEditor = ({ navigation }) => {
  const currCoolDowm = useSelector(selectLessonPlan(SectionName.coolDown)); // { warmUp: state.warmUp }
  const [coolDown, setCoolDown] = useState(currCoolDowm); //get content to pass down and display // TODO: check example redux to see if useState needed


  return (
    <SafeAreaView style={{ backgroundColor: '#FFFAF5' }}>
      <LessonPlanHeader />
      <ScrollView style={styles.scrollView}> 
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <LessonSection subtitle={'Warm Up'} />
          {/* <LessonSection subtitle={'Main Lesson'} content={coolDown} OR currCoolDowm} saveFunction={useDispatch(addToSection)} /> */}
          {/* <LessonSection subtitle={'Cool Down'} content={coolDown} OR currCoolDowm} />  */}
          <LessonPlanNotes subtitle={'Notes'} />
          <SaveButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

//use Redux DevTools to test if AddSection worked or not 
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Poppins'
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom: '20%'
  }
});

export default LessonPlanEditor;
