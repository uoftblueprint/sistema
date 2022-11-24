import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Header from '../components/Header';

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      
      {/* header component that is 10% of view port */}
      <View style={{ flex: 1 }}>
        <Header></Header>
      </View>
      
      {/* body that is 90% of view port */}
      <View style={{ flex: 9 }}>

      </View>
      <Text>Home page here!</Text>
    </View>
  );
};

export default Home;
