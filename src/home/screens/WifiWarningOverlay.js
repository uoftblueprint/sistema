import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Overlay from '../../Components/Overlay';
import SistemaButton from '../../Components/SistemaButton';
import NoWifiIcon from '../../../assets/icons/cloudOfflineOutline';

const WifiWarningOverlay = props => {
  return (
    <Overlay visible={props.visible} close={props.close}>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.row}>
          <NoWifiIcon height={37} width={37} style={styles.svg} />
          <SafeAreaView style={styles.textContainer}>
            <Text style={styles.title}>You are not connected to wifi.</Text>
            <Text style={styles.description}>
              Please connect and try again.
            </Text>
          </SafeAreaView>
        </SafeAreaView>
        <SistemaButton color="purple">
          <Text style={styles.buttonText}>Refresh</Text>
        </SistemaButton>
      </SafeAreaView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Mulish-Medium',
    color: 'rgba(0,0,0,0.87)',
    fontSize: 21,
    flexWrap: 'wrap',
    maxWidth: '95%',
    marginBottom: 5,
  },
  description: {
    fontFamily: 'Mulish-Regular',
    color: 'rgba(0,0,0,0.87)',
    fontSize: 17,
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Mulish-Regular',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    marginBottom: 9,
  },
  textContainer: { marginLeft: 10 },
  svg: { marginTop: 4 },
});

export default WifiWarningOverlay;
