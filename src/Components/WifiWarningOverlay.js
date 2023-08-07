import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Overlay from './Overlay';
import SistemaButton from './SistemaButton';
import NoWifiIcon from '../../assets/cloudOfflineOutline';
import { verticalScale, scale } from 'react-native-size-matters';
import { TextStyle } from '../Styles.config';

const WifiWarningOverlay = ({ visible, handleClose}) => {
  const iconSize = scale(27);

  return (
    <Overlay
      close={handleClose}
      visible={visible}
      style={styles.overlayContainer}>
      <View style={styles.textColumn}>
        <View style={styles.row}>
          <NoWifiIcon
            height={iconSize}
            width={iconSize}
            style={styles.icon}
          />
          <Text style={[TextStyle.label, styles.overlayTitle]}>
            You are not connected to wifi.
          </Text>
        </View>

        <Text style={TextStyle.body}>
          Activity cards cannot be retrieved and other services may be unavailable. Please check your connection and try again.
        </Text>

        <View style={styles.buttonContainer}>
          <SistemaButton onPress={handleClose}>
            <Text style={TextStyle.body}> Okay </Text>
          </SistemaButton>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flexDirection: 'row',
    height: 'auto',
  },
  overlayTitle: {
    flex: 1,
    marginLeft: scale(10),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    justifyContent: 'center',
  },
  textColumn: {
    flex: 5,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: verticalScale(10),
  },
});

export default WifiWarningOverlay;
