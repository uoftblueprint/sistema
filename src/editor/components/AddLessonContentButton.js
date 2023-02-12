import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import AddIcon from '../../../assets/AddIcon';

const AddLessonContentButton = ({ placeholder, handleClick }) => {
  const [number, onChangeNumber] = React.useState(null);

  return (
    <TouchableOpacity onPress={handleClick}>
      <SafeAreaView style={styles.SectionStyle}>
        <AddIcon style={styles.ImageStyle} />
        <View style={styles.input} onChangeText={onChangeNumber}>
          <Text>{placeholder}</Text>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    shadowColor: '#453E3D',
    paddingLeft: 12,
    fontSize: 16
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    height: 49,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 7.69,
    shadowColor: '#453E3D',
    elevation: 7,
    marginVertical: 6,
    paddingHorizontal: 10,
    
  },
  ImageStyle: {
    paddingLeft: 50,
    backgroundColor: 'black'
  }
});

export default AddLessonContentButton;
