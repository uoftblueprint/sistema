import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../Components/Button';
import NotificationOverlay from '../../Components/NotificationOverlay';

const UnsavedChangesOverlay = () => {
  return (
    <NotificationOverlay>
      <View style={styles.container}>
        <Text style={(styles.text, styles.title)}>
          You have unsaved changes
        </Text>
        <Text style={(styles.text, styles.description)}>
          Are you sure you want to leave this page?
        </Text>
        <View style={styles.buttonContainer}>
          <Button color="purple">
            <Text>Stay on page</Text>
          </Button>
          <Button color="blue">
            <Text>Leave page</Text>
          </Button>
        </View>
      </View>
    </NotificationOverlay>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Mulish',
    letterSpacing: 0.15
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  description: {
    fontSize: 16,
    fontWeight: '400'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    padding: 10
  }
});

export default UnsavedChangesOverlay;
