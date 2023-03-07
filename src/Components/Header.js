import { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import SistemaButton from '../Components/SistemaButton';
import SistemaLogo from '../../assets/SistemaLogo.svg';
import InfoIcon from '../../assets/infoIcon.svg';
import GearIcon from '../../assets/gearIcon.svg';
import Overlay from './Overlay';
import { STACK_SCREENS as SETTINGS_SCREENS } from '../settings/constants';

const activityCardNamingExplanation = 'Activity Card names have three parts:\n\nTheme - Activity Type - Activity Title\n\n' + 
  'The theme will be the Social or Theory and Musicianship theme the activity was developed for, for example "Identity", "Problem Solving", or Rhythm"\n\n' + 
  'There are four Activity Types, each describing a different way to approach learning about the social or musical theme: Knowledge, Action, Perception, and Creation.\n\n' +
  'The Activity Title identifies the specific activity or activities on the card, for example, "Roses and Thorns", or "Naming Intervals". Sometimes the names are jokes or puns, sometimes just a shorthand for what the activity will involve.'

const Header = ({ navigation, isHome }) => {
  const [isVisible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo width={100} height={50} />
      </View>
      <TouchableOpacity 
        style={styles.settingContainer} 
        onPress={() => navigation.navigate(SETTINGS_SCREENS.NAVIGATOR, { screen: SETTINGS_SCREENS.SETTINGS_MAIN })}>
        <GearIcon width={30} height={30} style={styles.settingIcon} />
      </TouchableOpacity>
      {isHome && (
        <TouchableOpacity style={styles.infoIcon} onPress={toggleOverlay}>
          <InfoIcon height={37} width={37} />
        </TouchableOpacity>
      )}
      <Overlay
        close={toggleOverlay}
        visible={isVisible}
        style={styles.overlayStyle}>
        <Text style={styles.textHeader}>How activity cards are named</Text>
        <ScrollView style={styles.overlayScroll}>
          <Text style={styles.textBody}>{activityCardNamingExplanation}</Text>
        </ScrollView>
        
        <SistemaButton onPress={toggleOverlay} style={{ minWidth: '30%' }}>
          <Text> Okay </Text>
        </SistemaButton>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  logoContainer: {
    //container for cross axis alignment of logo.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContainer: {
    //container for setting icon
    height: '100%',
    alignItems: 'center',
    marginRight: '3%',
    justifyContent: 'center',
  },
  settingIcon: {
    margin: 'auto',
  },
  infoIcon: {
    marginRight: '1%',
  },
  textHeader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    marginBottom: '5%',
  },
  textBody: {
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    marginBottom: '5%',
  },
  overlayStyle: {
    minHeight: '30%',
    maxHeight: '60%',
    paddingHorizontal: '5%',
    flexDirection: 'column'
  },
  overlayScroll: {
    marginBottom: '5%'
  }
});

export default Header;
