import { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const TagFilter = function (props) {
  return (
    <TouchableOpacity
      style={[
        styles.tagContainer,
        { backgroundColor: props.active ? '#68577766' : 'transparent' }
      ]}
      onPress={props.onPress}>
      <Text style={styles.text}>{props.tagContent}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#afafaf',
    marginHorizontal: 5,
    marginVertical: 4
  },
  text: {
    FontFamily: 'Roboto-Regular',
    color: 'black'
  }
});

export default TagFilter;
