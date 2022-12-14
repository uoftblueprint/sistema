import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import RecentCard from '../home/components/RecentCard';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <SafeAreaView>
        <SafeAreaView>
          <Text style={styles.title}>Recently added activity cards</Text>
        </SafeAreaView>

        <SafeAreaView style={{ height: '100%' }}>
          <RecentCard />
          <RecentCard />
          <RecentCard />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%'
  },
  title: {
    color: '#453E3D',
    fontWeight: '700',
    fontSize: 25,
    marginHorizontal: 30,
    letterSpacing: 0.3,
    width: '100%'
  }
});

export default Home;
