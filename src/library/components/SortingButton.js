import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { TextStyle } from '../../Styles.config';

const SortingButton = ({ text, onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={[TextStyle.label, styles.buttonContainer]}
        onPress={onPress}>
        <Text style={styles.textContainer}>{text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginBottom: '2%',
      },
      android: {
        paddingBottom: '2%',
      },
    }),
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
  },
});
export default SortingButton;
