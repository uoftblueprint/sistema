import { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SistemaButton from '../Components/SistemaButton';
import SistemaLogo from '../../assets/sistemaLogo.svg';
import InfoIcon from '../../assets/infoIcon.svg';
import GearIcon from '../../assets/gearIcon.svg';
import Overlay from './Overlay';

const Header = ({ isHome, navigation }) => {
  const [isHomePage, setHomePage] = useState(isHome);
  const [isVisible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo width={100} height={50} />
      </View>
      <TouchableOpacity style={styles.settingContainer}>
        <GearIcon width={30} height={30} style={styles.settingIcon} />
      </TouchableOpacity>
      {isHomePage ? (
        <TouchableOpacity style={styles.helpIcon} onPress={toggleOverlay}>
          <InfoIcon height={33} width={33} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Overlay
        close={toggleOverlay}
        visible={isVisible}
        style={styles.overlayStyle}>
        <Text style={styles.textHeader}>How activity cards are named</Text>
        <Text style={styles.textBody}>x, y, z - Ask Alex to write this</Text>
        <View style={styles.buttonStyle}>
          <SistemaButton onPress={toggleOverlay} style={{ minWidth: '30%' }}>
            <Text> Okay </Text>
          </SistemaButton>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  logoContainer: {
    //container for cross axis alignment of logo.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingContainer: {
    //container for setting icon
    height: '100%',
    alignItems: 'center',
    marginRight: '3%',
    justifyContent: 'center'
  },
  settingIcon: {
    margin: 'auto'
  },
  helpIcon: {
    marginRight: '3%'
  },
  textHeader: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginBottom: '5%'
  },
  textBody: {
    fontFamily: 'Mulish-Regular',
    marginBottom: '5%'
  },
  overlayStyle: {
    minHeight: '30%',
    paddingHorizontal: '5%'
  },
  buttonStyle: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    top: '95%'
  }
});

export default Header;
