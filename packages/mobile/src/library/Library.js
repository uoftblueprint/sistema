import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const Library = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* header component that is 10% of view port */}
      <View style={{ flex: 1 }}>
        <Header />
      </View>

      {/* body that is 90% of view port */}
      <View style={{ flex: 9 }} />
      <Text>Library of lesson plans here!</Text>
    </View>
  );
};

export default Library;
