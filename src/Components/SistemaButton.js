
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import AppColors from '../AppColors.config';

/**
 * 
 * @param {onClick: function that listens to click event} props 
 * @returns 
 */

const SistemaButton = (props) => {
    console.log(props.onClick)
    return (
        <View>
            <TouchableOpacity style={styles.buttonContainer} onClick={props.onClick}>
                <Text>
                    Okay
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        backgroundColor: AppColors.quaternary,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingHorizontal: '4%',
        paddingVertical: '2%',
        borderColor: 'black',           
        borderWidth: 1,
    }
})

export default SistemaButton;