import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const OptionsMenuButton = ({ text, icon }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer]}>
        <SafeAreaView
          style={{
            width: 22,
            height: 22,
            alignItems: 'center',
            justifyContent: 'center'
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
    borderWidth: 0.25
  },
  buttonContainer: {
    paddingLeft: '5%',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    width: '100%',
    height: 45
  },
  textContainer: {
    paddingLeft: '5%',
    fontFamily: 'Mulish',
    color: 'rgba(0,0,0, 0.87)',
    fontWeight: '700',
    fontSize: 16
  }
});
export default OptionsMenuButton;
