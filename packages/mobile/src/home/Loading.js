import React from "react";
import { Text, SafeAreaView, View, StyleSheet, Image} from "react-native";
import SistemaLogo from '../../assets/SistemaLogo';

const Loading = ({ navigation })  => {
    return (
        <SafeAreaView style={styles.background}>
          <View style={styles.imageContainer}>
          <SistemaLogo/>
          </View>
          <Text style={styles.appname}>
            App Name
          </Text>
          <Text style={styles.visionstatement}>
              Vision Statement
          </Text>
        </SafeAreaView>      
  
    );
  };
  
  const styles = StyleSheet.create({
    background: {
        backgroundColor: '#FFFAF5',
        height: '100%',
    
    },
    appname: {
    // Specific to Figma
        position: 'absolute',
        marginTop: '48.12%',
        marginBottom: '44.48%',
        letterSpacing: '0.05em',
        alignSelf: 'center',
        fontSize: '42px',
        fontWeight: 400,
        letterSpacing: '0.05em',

    },
    visionstatement:{
        postion: 'absolute',
        marginTop: '59.04%',
        marginBottom: '36.85%',
        alignSelf: 'center',
        fontSize: '23px',
        fontWeight: 400,
        letterSpacing: '0.05em',

    },
    imageContainer:{
        marginTop: '281px', 
        marginLeft: '119px'
    }})

export default Loading;