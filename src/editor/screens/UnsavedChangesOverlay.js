import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Overlay from '../../Components/Overlay';
import SistemaButton from '../../Components/SistemaButton';

const UnsavedChangesOverlay = props => {
  return (
    <Overlay visible={props.visible} close={props.close}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>You have unsaved changes</Text>
        <Text style={styles.description}>
          Are you sure you want to leave this page?
        </Text>
        <SafeAreaView style={styles.row}>
          <SistemaButton color="purple" style={styles.buttonLeft}>
            <Text style={styles.buttonText}>Stay on page</Text>
          </SistemaButton>
          <SistemaButton color="blue" styles={styles.buttonRight}>
            <Text style={styles.buttonText}>Leave page</Text>
          </SistemaButton>
        </SafeAreaView>
      </SafeAreaView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Mulish-Bold',
    color: 'rgba(0,0,0,0.87)',
    marginBottom: 3
  },
  description: {
    fontSize: 16,
    fontFamily: 'Mulish-Regular',
    color: 'black'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  buttonRight: {
    marginLeft: 14
  },
  buttonLeft: {
    marginRight: 14
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Mulish-Regular'
  }
});

export default UnsavedChangesOverlay;
