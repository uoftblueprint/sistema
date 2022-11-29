import React from 'react-native';
import EditIcon from '../../assets/EditIcon';
import BackArrow from '../../assets/BackArrow';
import Menu from '../../assets/Menu';
import { Dimensions } from 'react-native';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

const height = Math.floor(Dimensions.get('window').height / 10);


const LessonPlanHeader = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.settingContainer} >
                <BackArrow />
            </TouchableOpacity>
            <Text>
                    Lesson Plan Name
            </Text>
            <TouchableOpacity style={styles.settingContainer} >
                <EditIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingContainer} >
                <Menu />
            </TouchableOpacity>
            
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: height,
    },
    settingContainer: {
        //container for setting icon
        flex: 1,
        height: '100%',
        flexDirection: 'column'
    },
//    textContainer: {
//        fontFamily: "Poppins",
//        fontWeight: 700,
//        letterSpacing: '0.3px',
//        flex: 3,
//        height: '100%',
//    },

    iconContainer: {
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

export default LessonPlanHeader;