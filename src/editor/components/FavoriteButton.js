import { useState, props }from 'react';

import { Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import HeartIcon from '../../../assets/heartIcon.svg';
import FavoriteIcon from '../../../assets/favoriteIcon.svg';


const windowWidth = Dimensions.get('window').width;

const FavoriteButton = ({setBanner, setFavor,  isFavor}) => {
  
  const onPress = () => {
    setFavor(!isFavor);
    setBanner(true);
    setTimeout(() => {
      setBanner(false);
    }, 2000);
  };
   
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
        <SafeAreaView style={styles.icon}>
          {!isFavor ? <HeartIcon  /> 
          : <FavoriteIcon/> }
        </SafeAreaView>
        <Text style={styles.textContainer}> 
        {!isFavor ? "Add to Favorites" : "Remove from Favorites"}  </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderColor: '#000000',
    borderWidth: 0.25,
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    paddingLeft: '5%',
    alignSelf:'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    width: '100%',
    height: 45
  },
  textContainer: {
    paddingLeft: '5%',
    color: 'rgba(0,0,0, 0.87)',
    fontWeight: '700',
    fontSize: 16,
    
  },
  containerAdded: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEFCDF',
    height: 55,
    width: '100%',
  },
  containerRemoved: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE5E3',
    height: 55,
    width: '100%',
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
  icon: {
    width: 22,
    height:22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconBanner: {
    width: 18.33,
    height: 18.33,
    paddingLeft: '20%',
  },
});



export default FavoriteButton;