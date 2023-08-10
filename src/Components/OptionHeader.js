import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import XButton from '../../assets/xButton.svg';
import { TextStyle, AppColors, OptionsMenuPadding } from '../Styles.config';

const windowWidth = Dimensions.get('window').width;

const OptionHeader = ({ lastEdited, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[TextStyle.h2, styles.textContainer]}>Options</Text>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            postion: 'absolute',
            width: '30%',
          }}
          onPress={() => navigation.goBack()}>
          <XButton style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text
          style={[
            TextStyle.h3,
            styles.subtitle,
          ]}>{`Last edited: ${lastEdited}`}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: 'column',
    paddingVertical: '4%',
  },
  headerRow: {
    width: windowWidth,
    flexDirection: 'row',
    backgroundColor: AppColors.background,
    alignItems: 'center',
    paddingLeft: OptionsMenuPadding,
  },
  textContainer: {
    postion: 'absolute',
    width: '70%',
  },
  icon: {
    marginRight: OptionsMenuPadding,
    alignSelf: 'flex-end',
    width: 14,
    height: 14,
  },
  subtitle: {
    marginTop: '2%',
  },
});

export default OptionHeader;
