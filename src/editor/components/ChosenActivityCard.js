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

const ChosenActivityCard = ({ cardName, cardPath, handleClick }) => {
  // how to pass in the title 'cardName'?
  const activityCardPath = cardPath; //.params?
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
    backgroundColor: '#FFFAF5',
    height: 50,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 0,
      },
      default: {
        ios: {
          paddingVertical: 4,
        },
      },
    }),
    paddingLeft: 15,
    marginVertical: 5,
  },
  cardName: {
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
});

export default ChosenActivityCard;
