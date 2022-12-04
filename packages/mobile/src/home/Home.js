import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import RecentCard from '../home/components/RecentCard';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView style={{marginHorizontal: 10, flex: 1}}>
        <Text style={styles.title}>Recently added activity cards</Text>

        <SafeAreaView>
          <RecentCard style={{flex: 3}}></RecentCard>
          <RecentCard style={{flex: 3}}></RecentCard>
          <RecentCard style={{flex: 3}}></RecentCard>
        </SafeAreaView>
        
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%',
  },
  title: {
    color: '#453E3D',
    fontWeight: '700',
    fontSize: 20,
    marginHorizontal: 30,
    letterSpacing: 0.3
  },
});

export default Home;
