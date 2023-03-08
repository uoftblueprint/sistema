import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DotsGraphic from '../../../assets/dots.svg';
import EmptyHeart from '../../../assets/heartOutline.svg';
import FilledHeart from '../../../assets/favoriteIcon.svg';
import { STACK_SCREENS } from '../constants';

const LessonPlanButton = ({
  index,
  name,
  navigation,
  isFavorited,
  toggleFavorite,
  lastEditedDate,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.icons}>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorited, index)}>
          {isFavorited ? (
            <EmptyHeart width={17} height={17} style={styles.heart} />
          ) : (
            <FilledHeart width={17} height={17} style={styles.heart} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY, {
              lastEdited: lastEditedDate,
            })
          }>
          <DotsGraphic width={23} height={23} />
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FDFBF7',
    borderRadius: 7.7,
    borderWidth: 0.77,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  title: {
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    letterSpacing: 0.3,
    color: 'black',
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14,
  },
  titleContainer: {
    maxWidth: '60%',
    margin: 14,
  },
  heart: {
    // center heart SVG
    marginTop: 2.5,
    marginRight: 16,
  },
});

export default LessonPlanButton;
