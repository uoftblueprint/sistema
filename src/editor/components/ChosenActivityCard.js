import React from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  addToSection,
  removeFromSection,
} from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';
import ImageIcon from '../../../assets/imageIcon.svg';
import { STACK_SCREENS } from '../EditorNavigator';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ChosenActivityCard = ({ cardName, cardPath, handleClick }) => {
  // how to pass in the title 'cardName'?
  //const activityCardPath = cardPath; //.params?  // if (route.params) {
  console.log('CARD NAME ' + cardName);
  console.log('CARD PATH ' + cardPath);
  // useEffect(() => {
  //     async function getCardPath() {
  //         let warmUp = useSelector(state => getLessonSection(state.lessonPlan, SectionName.warmUp)); //returns an array
  //         let mainLesson = useSelector(state => getLessonSection(state.lessonPlan, SectionName.mainLesson));
  //         let coolDown = useSelector(state => getLessonSection(state.lessonPlan, SectionName.coolDown));
  //   }
  //   //parse everything
  //   getLessonPlan();
  // }, []);
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleClick}>
        <SafeAreaView style={styles.CardStyle}>
          <ImageIcon style={[(alignItems = 'centre')]} />
          <Text style={styles.cardName}>{cardName}</Text>
        </SafeAreaView>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  CardStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    marginRight: 10,
    marginVertical: 10,
  },
  cardName: {
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
});

export default ChosenActivityCard;
