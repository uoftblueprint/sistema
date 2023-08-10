import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import SistemaLogo from '../../assets/SistemaLogoLoading.svg';
import { TextStyle, AppColors } from '../Styles.config';

const Loading = () => {
  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView style={styles.imageContainer}>
        <SistemaLogo />
      </SafeAreaView>
      <View style={styles.appname}>
        <Text style={[TextStyle.h1, { textAlign: 'center' }]}>
          Welcome to Sistema Toronto LEARN!
        </Text>
      </View>
      <View style={styles.visionStatement}>
        <Text style={[TextStyle.label, { textAlign: 'center' }]}>
          Easily and quickly make lesson plans on the go.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.background,
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
    margin: '10%', // add space above the text
  },
  visionStatement: {
    marginHorizontal: '10%',
  },
});

export default Loading;
