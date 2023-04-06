import axios from 'axios';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DRIVE_API_URLS } from '../../services/config.json';

const SearchResults = ({
  name,
  id,
  setPreviewInfo,
  setHighlightedID,
  isHighlighted,
}) => {
  const display_preview = () => {
    const baseQuery = DRIVE_API_URLS.SEARCH_FILES;

    axios
      .get(`${baseQuery}/${id}`, {
        params: {
          supportsAllDrives: 'true',
          fields: 'thumbnailLink',
        },
      })
      .then(function (response) {
        setHighlightedID(id);
        setPreviewInfo({
          url: response.data.thumbnailLink,
          name: name,
          id: id,
        });
      })
      .catch(function (error) {
        console.log("Couldn't get thumbnail link");
        console.error(error);
      });
  };

  return (
    <TouchableOpacity
      onPress={display_preview}
      style={[styles.container, isHighlighted && styles.containerHighlighted]}>
      <Text style={styles.textStyle}>{name || ''}</Text>
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
    borderBottomWidth: 1,
  },
  containerHighlighted: {
    borderWidth: 3,
    borderColor: '#36ABFF',
    borderBottomColor: '#36ABFF',
    borderBottomWidth: 3,
  },
  textStyle: {
    fontFamily: 'Mulish-Regular',
    width: '100%',
    fontSize: 17,
    color: 'black',
  },
});

export default SearchResults;
