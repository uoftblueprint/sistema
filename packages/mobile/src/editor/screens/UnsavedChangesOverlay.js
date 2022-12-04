import { Overlay, Button } from '@rneui/themed';
import { Text, StyleSheet } from 'react-native';
import React from 'react';

const UnsavedChangesOverlay = props => {
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.toggle}
      overlayStyle={styles.background}>
      <Text style={(styles.text, styles.title)}>You have unsaved changes</Text>
      <Text style={(styles.text, styles.description)}>
        Are you sure you want to leave this page?
      </Text>
      <Button title="Stay on Page" />
      <Button title="Leave page" />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5'
  },
  text: {
    fontFamily: 'Mulish',
    fontStyle: 'normal'
  },
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000000',
    opacity: 0.87
  },
  description: {
    fontWeight: '400',
    fontSize: 16
  }
});

export default UnsavedChangesOverlay;
