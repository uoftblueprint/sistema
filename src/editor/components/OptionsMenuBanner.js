

import { Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

import CheckMarkIcon from '../../../assets/checkMark.svg';
import AlertErrorIcon from '../../../assets/errorAlert.svg';

const windowWidth = Dimensions.get('window').width;

const OptionsMenuBanner = ({ isFav }) => {
    return (
      <SafeAreaView style={ !isFav ? styles.containerRemoved: styles.containerAdded}>
          {!isFav ? 
            <AlertErrorIcon style={styles.iconBanner} />  :  
            <CheckMarkIcon style={styles.iconBanner}/>
          }
          <Text style={!isFav ? styles.textContainerRemoved : styles.textContainerAdded}>
            {!isFav ? "Lesson Plan Removed from Favorites" : "Lesson Plan Added to Favorites"}
          </Text>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    containerAdded: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#DEFCDF',
      height: 55,
      width: windowWidth,
    },
    containerRemoved: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FCE5E3',
      height: 55,
      width: windowWidth,
    },
    textContainerAdded: {
      fontWeight: '400',
      fontSize: 14,
      color:'#375238'
    },
    textContainerRemoved: {
      fontWeight: '400',
      fontSize: 14,
      color: '#471612',
    },
    iconBanner: {
      width: 18.33,
      height: 18.33,
      paddingLeft: '20%',
    },
  });

export default OptionsMenuBanner;