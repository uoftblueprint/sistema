import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ErrorAlert from '../../../assets/icons/errorAlert.svg';

import { useDispatch } from 'react-redux';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import { scale } from 'react-native-size-matters';

const NoCardsFound = ({ text, navigation, section }) => {
  const dispatch = useDispatch();

  const addAsText = async () => {
    dispatch(
      addToSection({
        type: 'text',
        section: section,
        content: text,
      }),
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ErrorAlert
        height={scale(30)}
        width={scale(30)}
        style={styles.errorIcon}
      />
      <View style={[styles.container2, styles.alignFlexStart]}>
        <Text style={styles.text1}> No cards found</Text>
        <Text style={styles.text2}> Please try again.</Text>
      </View>
      <TouchableOpacity onPress={addAsText}>
        <View style={styles.container2}>
          <Text style={styles.text3}>INSERT AS</Text>
          <Text style={styles.text3}>TEXT INSTEAD </Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: scale(10),
    // marginLeft: '5%',
  },
  alignFlexStart: {
    alignItems: 'flex-start',
  },
  text1: {
    color: '#621B16',
    fontFamily: 'Mulish-Bold',
    fontSize: 17,
  },
  text2: {
    color: '#621B16',
    fontFamily: 'Mulish-Regular',
    fontSize: 15,
  },
  text3: {
    color: '#0078E8',
    fontSize: 15,
    fontFamily: 'Mulish-Regular',
  },
});

export default NoCardsFound;
