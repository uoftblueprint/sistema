import { StyleSheet, View, Text } from 'react-native';
import ErrorAlert from '../../../assets/errorAlert.svg';

const NoCardsFound = () => {
  return (
    <View style={styles.container}>
      <ErrorAlert height={20} width={20} style={styles.errorIcon} />
      <View style={[styles.container2, styles.alignFlexStart]}>
        <Text style={[styles.fontFamilyMulish, styles.text1]}>
          {' '}
          No cards found
        </Text>
        <Text style={(styles.fontFamilyMulish, styles.text2)}>
          {' '}
          Please try again.
        </Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.text3}> INSERT AS</Text>
        <Text style={styles.text3}> TEXT INSTEAD </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    border: 4,
    backgroundColor: '#F4433618',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: '2%',
    marginLeft: '5%',
  },
  alignFlexStart: {
    alignItems: 'flex-start',
  },
  fontFamilyMulish: {
    fontFamily: 'Mulish-Regular',
  },
  errorIcon: {
    marginLeft: '5%',
    marginBottom: '5%',
  },
  text1: {
    fontColor: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  text2: {
    fontColor: 'black',
    fontSize: 15,
  },
  text3: {
    color: '#0078E8',
    fontSize: 15,
    fontFamily: 'Mulish-Regular',
  },
});

export default NoCardsFound;
