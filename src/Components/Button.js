import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const Button = props => {
  switch (props.color) {
    case 'blue':
      styles.buttonContainer.backgroundColor = '#B8CFE4';
      break;
    case 'purple':
      styles.buttonContainer.backgroundColor = '#68577760';
      break;
    default:
      styles.buttonContainer.backgroundColor = '#68577760';
      break;
  }
  return (
    <SafeAreaView>
      <TouchableOpacity style={[styles.buttonContainer]}>
        {props.children}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    height: 32.68,
    width: 109,
    borderWidth: 0.77,
    borderRadius: 6,
    paddingHorizontal: 12
  }
});
export default Button;
