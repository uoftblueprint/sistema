import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import Header from '../Components/Header';

const Library = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Header></Header>
      <Text>Library of user's lesson plans here!</Text>
    </SafeAreaView>
  );
};

export default Library;
