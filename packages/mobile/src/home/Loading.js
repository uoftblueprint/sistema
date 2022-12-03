import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import SistemaLogo from '../../assets/SistemaLogoLoading';

const Loading = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.imageContainer}>
        <SistemaLogo />
      </View>
      <Text style={styles.appname}>App Name</Text>
      <Text style={styles.visionStatement}>Vision Statement</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    height: 99,
    width: 171
  },
  //add 'Poppins' font
  appname: {
    paddingTop: '4%',
    color: '#000000',
    fontSize: 42,
    fontWeight: '400',
    letterSpacing: 0.05,
    lineHeight: 63
  },
  visionStatement: {
    paddingTop: '4%',
    color: '#000000',
    fontSize: 23,
    fontWeight: '400',
    letterSpacing: 0.05,
    lineHeight: 34
  }
});
export default Loading;
