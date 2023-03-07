import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NextButton from '../../../assets/backArrowEast.svg';

const PolicyButton = ({
  title,
  handlePress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
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
    fontFamily: 'Mulish-Regular',
    fontSize: 18,
    letterSpacing: 0.3,
    color: 'black',
    margin: 14,
    maxWidth: '80%',
  },
  icon: {
    margin: 14,
  }
});

export default PolicyButton;
