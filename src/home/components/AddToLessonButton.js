import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { AppColors } from '../../Styles.config';

const AddToLessonButton = () => {
  return (
    <SafeAreaView style={{ paddingVertical: 30 }}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.textContainer}>Add to lesson plan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.tertiary_30,
    height: 32.68,
    width: 134,
    borderWidth: 0.77,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  textContainer: {
    fontFamily: 'Mulish-Regular',
    color: '#000',
    fontSize: 13,
  },
});
export default AddToLessonButton;
