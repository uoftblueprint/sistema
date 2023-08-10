import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import XButton from '../../../assets/icons/xButton.svg';
import { AppColors } from '../../Styles.config';

const windowWidth = Dimensions.get('window').width;
const OptionHeader = ({ isLessonEditor, lessonName, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textContainer}>
        {isLessonEditor ? 'Options' : `${lessonName}` + ' Options'}
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          postion: 'absolute',
          width: '30%',
        }}
        onPress={() => navigation.goBack()}>
        <XButton style={styles.icon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    alignItems: 'center',
  },
  textContainer: {
    postion: 'absolute',
    width: '70%',
    paddingLeft: '5%',
    color: AppColors.dark,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 60,
  },
  icon: {
    paddingRight: '50%',
    alignSelf: 'flex-end',
    width: 14,
    height: 14,
  },
});
export default OptionHeader;
