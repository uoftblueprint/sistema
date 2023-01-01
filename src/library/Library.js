import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Header from '../Components/Header';

const Library = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      <Text>Library of user's lesson plans here!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});
export default Library;
