import { StyleSheet, View, SafeAreaView, Text } from 'react-native'

import AppColors from '../AppColors.config';
import SistemaButton from './SistemaButton';

const SistemaOverlay = ({navigation}) => {

    const toggleOut = () => {
        navigation.goBack();
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <Text style={styles.header}> How activity cards are named</Text>

                <Text style={styles.marginTop7}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>

                <View style={styles.marginTop7}>
                    <SistemaButton onClick={toggleOut}></SistemaButton>
                </View>

            </View>
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(215, 215, 215, 0.8)',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'white'
    },
    overlay: {
        width: '87%',
        minHeight: '40%',
        backgroundColor: AppColors.background,
        marginTop: '50%',
        borderRadius: 8,
        maxHeight: '60%',
        padding: '5%'
    },
    header: {
        fontWeight: 'bold',
        color: 'black'
    },
    marginTop7: {
        marginTop: '7%'
    },
})

export default SistemaOverlay;