import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecentCard = ({ navigation }) => {
  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={styles.box}>
        <ScrollView>{/* <Text>CARD GOES HERE</Text> */}</ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: 15,
    width: '87%',
    height: windowHeight * 0.25
  },
  scrollview: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RecentCard;
