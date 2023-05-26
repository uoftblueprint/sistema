import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const TagFilter = function (props) {
  return (
    <TouchableOpacity
      style={[
        styles.tagContainer,
        { 
          backgroundColor: props.active ? '#68577766' : 'transparent', 
          marginLeft: props.isFirst ? 0 : 5,
          marginRight: props.isLast ? 0 : 5,
        },
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
    marginVertical: 4,
  },
  text: {
    fontFamily: 'Mulish-Regular',
    color: 'black',
  },
});

export default TagFilter;
