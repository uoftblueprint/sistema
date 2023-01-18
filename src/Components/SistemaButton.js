
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import AppColors from '../AppColors.config';

/**
 * 
 * @param {onPress: function that listens to click event} props 
 * @returns 
 */

const SistemaButton = (props) => {
    return (
        <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
                <Text style={{color: 'black'}}>
                    Okay
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        backgroundColor: 'rgba(	134, 87, 119, 0.3)',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        borderColor: 'black',           
        borderWidth: 0.5,
    }
})

export default SistemaButton;