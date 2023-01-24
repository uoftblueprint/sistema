import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import XButton from '../../../assets/xButton.svg';

const windowWidth = Dimensions.get('window').width;
const OptionHeader = ({isLessonEditor, lessonName, navigation}) => {

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textContainer}> {isLessonEditor ? "Options" : `${lessonName}` +' Options'} </Text>
        <TouchableOpacity style={{alignSelf:'center', justifyContent:'flex-end', postion: 'absolute', width:'30%'}} onPress={() => navigation.goBack()}>
            <XButton style={styles.icon}/>
        </TouchableOpacity>
        
       
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    alignItems: 'center'
  },
  textContainer: {
    width:'70%',
    postion: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: '5%',
    color: 'rgba(0,0,0, 0.87)',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 60,
  },
  icon: {
    paddingRight:'50%',
    alignSelf:'flex-end',
    width: 14,
    height: 14,
  }
});
export default OptionHeader;