import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AddIcon from '../../../assets/add';

const LessonPlanAddItem = ({ placeholder }) => {

  return (
    <SafeAreaView style={styles.SectionStyle}>
      <TouchableOpacity style={styles.SectionStyle}>
        <TouchableOpacity>
          <AddIcon style={styles.ImageStyle} />
        </TouchableOpacity>
        <View
          style={styles.addBox}
          underlineColorAndroid="transparent"
        >
          <Text style={{paddingLeft: "3%"}}>{placeholder}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    shadowColor: '#453E3D',
    fontFamily: 'Mulish-Regular',
    paddingLeft: 12,
    fontSize: 16,
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
    paddingLeft: '3%',
  },
  ImageStyle: {
    height: 25,
    width: 25,
  },
});

export default LessonPlanAddItem;
