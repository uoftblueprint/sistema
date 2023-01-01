import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SistemaLogo from '../../assets/SistemaLogo';
import HomeIcon from '../../assets/HomeIcon';
import OptionIcon from '../../assets/OptionIcon';

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo />
      </View>

      <TouchableOpacity style={styles.settingContainer}>
        <OptionIcon style={styles.settingIcon} />
      </TouchableOpacity>
    </View>
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
    marginRight: '2%',
    justifyContent: 'center'
  },
  settingIcon: {
    margin: 'auto'
  }
});

export default Header;
