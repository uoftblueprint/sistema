import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import SistemaLogo from '../../assets/SistemaLogo';
import HomeIcon from '../../assets/HomeIcon';
import Home from '../home/Home';
import { Dimensions } from 'react-native';
import OptionIcon from '../../assets/OptionIcon';

const height = Math.floor(Dimensions.get('window').height / 10);

const Header = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            {/* touchableopacity wrapper for setting icon */}
            <TouchableOpacity style={styles.settingContainer}>

                <View style={styles.settingAdjustment}>
                    <OptionIcon />
                </View>

                {/* view created to shift settings icon slightly up */}
                <View style={{ flex: 1 }} />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <SistemaLogo />
            </View>
            
            {/* This view created to center image container in 1: 5 : 1 ratio */}
            <View style={{ flex: 1 }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        height: height,
    },
    imageContainer: {
        //container for the sistema logo
        flex: 5,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingContainer: {
        //container for setting icon
        flex: 1,
        height: '100%',
        flexDirection: 'column'
    },
    settingAdjustment: {
        //for adjusting icon up slightly inside settingContainer

        flex: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Header;
