import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { OptionsMenuPadding, AppColors } from '../Styles.config';

const windowWidth = Dimensions.get('window').width;

const OptionsMenuButton = ({ text, icon, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
        <SafeAreaView
          style={{
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
        </SafeAreaView>
        <Text style={styles.textContainer}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderColor: '#000000',
    borderWidth: 0.25,
  },
  buttonContainer: {
    paddingLeft: OptionsMenuPadding,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    width: '100%',
    height: 50,
  },
  textContainer: {
    paddingLeft: OptionsMenuPadding,
    fontFamily: 'Mulish-Bold',
    color: AppColors.dark,
    fontSize: 16,
  },
});

export default OptionsMenuButton;
