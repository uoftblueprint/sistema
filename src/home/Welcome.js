import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import SistemaLogo from '../../assets/SistemaLogoLoading.svg';
import SistemaButton from '../Components/SistemaButton';
import { AppColors, TextStyle } from '../Styles.config';

const Welcome = ({ navigation }) => {
  // TODO: navigation to tutorial.js and call to RNFS
  const beginTutorial = () => {
    navigation.navigate('Tutorial');
  };

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
      <SistemaButton onPress={beginTutorial}>
        <Text style={TextStyle.body}>Let's Get Started</Text>
      </SistemaButton>
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
    marginVertical: '10%', // add space above the text
    textAlign: 'center',
    marginHorizontal: '10%',
  },
  visionStatement: {
    fontFamily: 'Poppins-Regular',
    paddingTop: '4%', // add space above the text
    color: AppColors.dark,
    fontSize: 23,
    letterSpacing: 0.05,
    lineHeight: 34,
  },
});

export default Welcome;
