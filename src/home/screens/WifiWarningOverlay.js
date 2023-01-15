import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../Components/Button';
import NotificationOverlay from '../../Components/NotificationOverlay';
import NoWifiGraphic from '../../../assets/wifiMissing';

const WifiWarningOverlay = () => {
  return (
    <NotificationOverlay>
      <View style={styles.textContainer}>
        <View>
          <NoWifiGraphic height={24} width={24} />
        </View>
        <View>
          <Text style={(styles.text, styles.title)}>
            You are not connected to wifi.
          </Text>
          <Text style={(styles.text, styles.description)}>
            Please connect and try again.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button color="purple">
          <Text style={styles.text}>Refresh</Text>
        </Button>
      </View>
    </NotificationOverlay>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Mulish',
    letterSpacing: 0.32
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    maxWidth: '80%'
  },
  description: {
    fontWeight: '400',
    fontSize: 17
  },
  buttonContainer: {
    display: 'flex',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default WifiWarningOverlay;
