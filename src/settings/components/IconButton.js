import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextStyle, AppColors } from '../../Styles.config';

const IconButton = ({ title, handlePress, children }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.icon}>{children}</View>
      <Text style={[TextStyle.label, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    backgroundColor: AppColors.light_background,
    borderRadius: 8,
    borderWidth: 0.77,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    margin: 14,
  },
  icon: {
    marginVertical: 10,
    marginLeft: 15,
  },
});

export default IconButton;
