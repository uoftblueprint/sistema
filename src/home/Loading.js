import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import SistemaLogo from '../../assets/SistemaLogoLoading.svg';

const Loading = () => {
  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView style={styles.imageContainer}>
        <SistemaLogo />
      </SafeAreaView>
      <Text style={styles.appname}>App Name</Text>
      <Text style={styles.visionStatement}>Vision Statement</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%', // full screen is filled with color
    flexDirection: 'column', // organize items vertically
    alignItems: 'center', // center items
    justifyContent: 'center',
  },
  imageContainer: {
    height: 99,
    width: 171,
  },
  //add 'Poppins' font
  appname: {
    fontFamily: 'Poppins-Regular',
    paddingTop: '4%', // add space above the text
    color: '#000000',
    fontSize: 42,
    letterSpacing: 0.05,
    lineHeight: 63,
  },
  visionStatement: {
    fontFamily: 'Poppins-Regular',
    paddingTop: '4%', // add space above the text
    color: '#000000',
    fontSize: 23,
    letterSpacing: 0.05,
    lineHeight: 34,
  },
});
export default Loading;
