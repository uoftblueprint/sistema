import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IconButton = ({ title, handlePress, children }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.icon}>{children}</View>
      <Text style={styles.title}>{title}</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    letterSpacing: 0.3,
    color: 'black',
    margin: 14,
  },
  icon: {
    marginVertical: 14,
    marginLeft: 14,
  },
});

export default IconButton;
