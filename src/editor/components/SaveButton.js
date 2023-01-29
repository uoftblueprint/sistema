import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import SaveIcon from '../../../assets/save.svg';

const SaveButton = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.buttonContainer}>
        <SaveIcon />
        <Text style={styles.textContainer}>Save plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#68577766',
    height: 32.68,
    width: 109,
    borderWidth: 0.77,
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  textContainer: {
    fontFamily: 'Poppins-Regular',
    paddingLeft: 8.6,
    color: '#000',
    fontWeight: '400',
    fontSize: 13
  }
});
export default SaveButton;
