import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

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
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    borderWidth: 0.77,
    borderRadius: 6,
    borderColor: '#453E3D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center'
  }
});

export default Button;