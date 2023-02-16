import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import XButton from '../../assets/xButton.svg';

const windowWidth = Dimensions.get('window').width;
const OptionHeader = ({ lastEdited, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.textContainer}>Options</Text>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            postion: 'absolute',
            width: '30%'
          }}
          onPress={() => navigation.goBack()}>
          <XButton style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>{`Last edited: ${lastEdited}`}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'column',
    paddingVertical: '4%'
  },
  headerRow: {
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    alignItems: 'center',
    paddingLeft: '5%',
  },
  textContainer: {
    postion: 'absolute',
    width: '70%',
    color: 'rgba(0,0,0, 0.87)',
    fontWeight: '700',
    fontSize: 20
  },
  icon: {
    paddingRight: '50%',
    alignSelf: 'flex-end',
    width: 14,
    height: 14
  },
  subtitle: {
    marginTop: '2%',
    fontStyle: 'italic',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.63)'
  }
});
export default OptionHeader;
