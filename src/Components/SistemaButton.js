import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppColors } from '../Styles.config';

const SistemaButton = props => {
  switch (props.color) {
    case 'blue':
      styles.buttonContainer.backgroundColor = AppColors.primary_30;
      break;
    case 'purple':
      styles.buttonContainer.backgroundColor = AppColors.tertiary_30;
      break;
    default:
      styles.buttonContainer.backgroundColor = AppColors.tertiary_30;
      break;
  }
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
    borderWidth: 0.77,
    borderRadius: 6,
    borderColor: AppColors.dark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
});

export default SistemaButton;
