import React from 'react';
import { Text, StyleSheet } from 'react-native';
import SaveIcon from '../../../assets/save.svg';
import Button from '../../Components/Button';

const SaveButton = () => {
  return (
    <Button color="purple">
      <SaveIcon />
      <Text style={styles.textContainer}>Save plan</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingLeft: 8.6,
    color: '#000',
    fontWeight: '400',
    fontSize: 13
  }
});
export default SaveButton;
