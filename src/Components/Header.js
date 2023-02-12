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
import OptionIcon from '../../assets/optionIcon.svg';
import InfoIcon from '../../assets/infoIcon.svg';
import GearIcon from '../../assets/gearIcon.svg';
import Overlay from './Overlay';

const Header = ({ isHome, navigation }) => {
  const [isHomePage, setHomePage] = useState(isHome);
  const [isVisible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  console.log(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo width={100} height={50} />
      </View>
      {isHomePage ? (
        <TouchableOpacity
          style={styles.helpIcon}
          onPress={toggleOverlay}>
          <GearIcon height={30} width={30} />
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
    justifyContent: 'center',
    flexDirection: 'row'
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
  settingIcon: {
    margin: 'auto',
    marginHorizontal: 7,
    marginBottom: 8
  }
});

export default Header;
