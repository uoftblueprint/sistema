import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STACK_SCREENS } from '../constants';
import NextButton from '../../../assets/backArrowEast.svg';
import { TextStyle } from '../../Styles.config';

const PolicyButton = ({ title, content, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(STACK_SCREENS.TEMPLATE_INFO_PAGE, {
          pageTitle: title,
          pageContent: content,
        });
      }}>
      <Text style={[TextStyle.body, styles.title]}>{title}</Text>
      <View style={styles.icon}>
        <NextButton width={14} height={17} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FDFBF7',
    borderRadius: 7.7,
    borderWidth: 0.77,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    margin: 14,
    maxWidth: '80%',
  },
  icon: {
    margin: 14,
  },
});

export default PolicyButton;
