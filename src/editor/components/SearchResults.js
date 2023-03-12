import axios from 'axios';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchResults = ({
  name,
  id,
  setPreviewInfo,
  setHighlightedID,
  isHighlighted,
}) => {
  const display_preview = () => {
    const baseQuery = 'https://www.googleapis.com/drive/v3/files/';
    const params = '?supportsAllDrives=true&fields=thumbnailLink';
    console.log(name);
    console.log(id);
    console.log(`${baseQuery}${id}?`);
    axios
      .get(`${baseQuery}${id}?`, {
        params: {
          supportsAllDrives: 'true',
          fields: 'thumbnailLink'
        }
      })
      .then(function (response) {
        setHighlightedID(id);
        setPreviewInfo({
          url: response.data.thumbnailLink,
          name: name,
          id: id
        });
        console.log(response.data.thumbnailLink);
      });
  };

  return (
    <TouchableOpacity
      onPress={display_preview}
      style={[styles.container, isHighlighted && styles.containerHighlighted]}>
      <Text
        style={{
          fontFamily: 'Mulish-Regular',
          width: '100%',
          fontSize: 17,
          color: 'black',
        }}>
        {name || ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    borderRadius: 4,
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  containerHighlighted: {
    borderWidth: 3,
    borderColor: '#36ABFF',
    borderBottomColor: '#36ABFF',
    borderBottomWidth: 3
  }
});

export default SearchResults;
