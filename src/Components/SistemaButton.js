import { TouchableOpacity, StyleSheet } from 'react-native';

const SistemaButton = props => {
  switch (props.color) {
    case 'blue':
      styles.buttonContainer.backgroundColor = '#B8CFE4';
      break;
    case 'purple':
      styles.buttonContainer.backgroundColor = '#68577760';
      break;
    default:
      styles.buttonContainer.backgroundColor = '#68577760';
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
    borderColor: '#453e3d66',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
});

export default SistemaButton;
