import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import SistemaLogo from '../../assets/SistemaLogo.svg';
import OptionIcon from '../../assets/OptionIcon.svg';
import QuestionMark from '../../assets/questionMark.svg'

const Header = ({ isHome, navigation }) => {
  
  const [isHomePage, setHomePage] = useState(isHome);
  console.log(isHome)
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <SistemaLogo width={100} height={50} />
      </View>
      <TouchableOpacity style={styles.settingContainer}>
        <OptionIcon width={30} height={30} style={styles.settingIcon} />
      </TouchableOpacity>
      {
        isHomePage ? 
          <TouchableOpacity style={styles.questionMarkIcon}>
            <QuestionMark/>
          </TouchableOpacity>
        : <></>
        }
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
  },
  questionMarkIcon: {
    marginRight: '3%'
  }
});

export default Header;
