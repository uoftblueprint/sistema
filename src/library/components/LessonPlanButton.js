import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DotsGraphic from '../../../assets/dots.svg';
import HeartGraphic from '../../../assets/heartOutline.svg';

const LessonPlanButton = props => {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.titleContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.icons}>
        <TouchableOpacity>
          <HeartGraphic width={17} height={17} style={styles.heart} />
        </TouchableOpacity>
        <TouchableOpacity>
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
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
    letterSpacing: 0.3,
    color: 'black'
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    margin: 14
  },
  titleContainer: {
    maxWidth: '60%',
    margin: 14
  },
  heart: {
    // center heart SVG
    marginTop: 2.5,
    marginRight: 16
  }
});

export default LessonPlanButton;
