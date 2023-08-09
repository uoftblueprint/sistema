import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DotsGraphic from '../../../assets/icons/dots.svg';
import EmptyHeart from '../../../assets/icons/heartOutline.svg';
import FilledHeart from '../../../assets/icons/favoriteIcon.svg';
import { STACK_SCREENS as LIBRARY_STACK } from '../constants';
import { STACK_SCREENS as EDITOR_STACK } from '../../editor/constants';
import { TextStyle } from '../../Styles.config';

const LessonPlanButton = ({
  index,
  name,
  navigation,
  isFavorited,
  toggleFavorite,
  lastEditedDate,
  lessonPlan,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => {
          navigation.navigate(EDITOR_STACK.NAVIGATOR, {
            screen: EDITOR_STACK.LESSON_PLAN_EDITOR_V2,
            params: {
              lessonPlanName: name,
              isFavorited: isFavorited,
              lastEdited: lastEditedDate,
            },
          });
        }}>
        <Text style={TextStyle.label}>{name}</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.icons}>
        <TouchableOpacity onPress={() => toggleFavorite(!isFavorited, index)}>
          {isFavorited ? (
            <FilledHeart width={17} height={17} style={styles.heart} />
          ) : (
            <EmptyHeart width={17} height={17} style={styles.heart} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(LIBRARY_STACK.LESSON_PLAN_MENU_OVERLAY, {
              isLessonPlanEditor: false,
              lastEdited: lastEditedDate,
              lessonPlanName: lessonPlan,
              isFavorited: isFavorited,
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
    borderRadius: 8,
    borderWidth: 0.77,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14,
  },
  titleContainer: {
    flex: 1,
    padding: 14,
  },
  heart: {
    // center heart SVG
    marginTop: 2.5,
    marginRight: 16,
  },
});

export default LessonPlanButton;
