import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const AddToLessonButton = () => {
  return (
    <SafeAreaView style={{ paddingVertical: 30 }}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.textContainer}>Add to lesson plan</Text>
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
    width: 134,
    borderWidth: 0.77,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  textContainer: {
    color: '#000',
    fontWeight: '400',
    fontSize: 13
  }
});
export default AddToLessonButton;