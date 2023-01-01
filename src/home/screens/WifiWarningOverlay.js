import { Overlay, Button } from '@rneui/themed';
import { Text, StyleSheet } from 'react-native';
import React from 'react';
import NoWifiIcon from '../../../assets/NoWifiIcon';

const WifiWarningOverlay = props => {
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={props.toggle}
      overlayStyle={styles.background}>
      <NoWifiIcon />
      <Text style={(styles.text, styles.bolded)}>
        You are not connected to wifi.
      </Text>
      <Text style={(styles.text, styles.normal)}>
        Please connect and try again.
      </Text>
      <Button title="Refresh" buttonStyle={styles.refreshButton} />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5'
  },
  text: {
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    margin: 50
  },
  bolded: {
    fontWeight: '500',
    fontSize: 21
  },
  normal: {
    fontWeight: '400',
    fontSize: 17
  },
  refreshButton: {
    backgroundColor: '#cac4d0'
  }
});

export default WifiWarningOverlay;
