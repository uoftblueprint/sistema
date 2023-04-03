import { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SistemaButton from '../Components/SistemaButton';
import SistemaLogo from '../../assets/sistemaLogo.svg';
import BackArrow from '../../assets/backArrow.svg';
import InfoIcon from '../../assets/infoIcon.svg';
import GearIcon from '../../assets/gearIcon.svg';
import Overlay from './Overlay';
import { STACK_SCREENS as SETTINGS_SCREENS } from '../settings/constants';
import { TextStyle } from '../Styles.config';
import { verticalScale } from 'react-native-size-matters';
import Circle from '../../assets/circle.svg';
import { AppColors } from '../Styles.config';

const Header = ({ navigation, isHome, showBackButton }) => {
  const [isVisible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!isVisible);
  };

  const iconSize = 27;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo width={100} height={50} />
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {showBackButton && (
            <BackArrow
              width={iconSize - 4}
              height={iconSize - 1}
              style={styles.backArrow}
            />
          )}
        </TouchableOpacity>

        <View style={styles.rightToolbar}>
          {isHome && (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={toggleOverlay}>
              <InfoIcon width={iconSize} height={iconSize} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(SETTINGS_SCREENS.NAVIGATOR, {
                screen: SETTINGS_SCREENS.SETTINGS_MAIN,
              })
            }>
            <GearIcon
              width={iconSize}
              height={iconSize}
              style={styles.settingIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Overlay
        close={toggleOverlay}
        visible={isVisible}
        style={styles.overlayStyle}>
        <Text style={[TextStyle.h2, styles.textHeader]}>
          How activity cards are named
        </Text>
        <ScrollView style={styles.overlayScroll}>
          <Text style={[TextStyle.body, styles.textBody]}>
            {'Activity Card names have three parts:\n\n'}
            <Text style={[TextStyle.body, styles.textBody, styles.bold]}>
              {'Theme - Activity Type - Activity Title\n\n'}
            </Text>
            {'The '}
            <Text style={[TextStyle.body, styles.textBody, styles.bold]}>
              {'Theme '}
            </Text>
            {
              'will be the Social or Theory and Musicianship theme the activity was developed for, for example "Identity", "Problem Solving", or Rhythm".\nThere are four'
            }
            <Text style={[TextStyle.body, styles.textBody, styles.bold]}>
              {' Activity Types'}
            </Text>
            {
              ', each describing a different way to approach learning about the social or musical theme: Knowledge '
            }
            <Circle
              style={styles.inlineCircle}
              width={13}
              height={13}
              fill={AppColors.primary}
            />
            {', Action '}
            <Circle width={13} height={13} fill={AppColors.quaternary} />
            {', Perception '}
            <Circle width={13} height={13} fill={AppColors.secondary} />
            {', and Creation '}
            <Circle width={13} height={13} fill={AppColors.senary} />
            {'.\nThe'}
            <Text style={[TextStyle.body, styles.textBody, styles.bold]}>
              {' Activity Title '}
            </Text>
            {
              'identifies the specific activity or activities on the card, for example, "Roses and Thorns", or "Naming Intervals". '
            }
            {
              'Sometimes the names are jokes or puns, sometimes just a shorthand for what the activity will involve.'
            }
          </Text>
        </ScrollView>

        <SistemaButton onPress={toggleOverlay} style={{ minWidth: '30%' }}>
          <Text style={TextStyle.body}> Okay </Text>
        </SistemaButton>
      </Overlay>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    alignItems: 'center',
    marginTop: 10,
  },
  toolbar: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  rightToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logoContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    marginBottom: verticalScale(10),
  },
  textBody: {
    marginBottom: verticalScale(10),
    lineHeight: 24,
  },
  overlayStyle: {
    paddingHorizontal: '5%',
    flexDirection: 'column',
  },
  overlayScroll: {
    paddingRight: '5%',
    marginBottom: '5%',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Header;
