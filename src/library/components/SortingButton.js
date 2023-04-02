import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const SortingButton = ({ text, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
        <Text style={styles.textContainer}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: '2%',
  },
  buttonContainer: {
    borderWidth: 0.25,
    borderRadius: 7.7,
    borderStyle: 'solid',
    borderColor: '#000000',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    // They are hard coded right now sadly
    width: '45%',
    height: 45,
  },
  textContainer: {
    paddingLeft: '10%',
    fontFamily: 'Mulish',
    color: 'rgba(0,0,0, 0.87)',
    fontSize: 16,
  },
});
export default SortingButton;
