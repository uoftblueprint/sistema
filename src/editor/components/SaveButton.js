import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import SaveIcon from '../../../assets/save.svg';

const SaveButton = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={[styles.buttonContainer]}>
        <SaveIcon height={20} width={20} />
        <Text style={styles.textContainer}>Save plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68577766',
    height: 32.68,
    width: 109,
    borderWidth: 0.77,
    borderRadius: 6,
    paddingHorizontal: 12
  },
  textContainer: {
    paddingLeft: 8.6,
    color: '#000',
    fontWeight: '400',
    fontSize: 13
  }
});
export default SaveButton;
