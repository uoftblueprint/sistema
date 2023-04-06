import { useQuery } from '@tanstack/react-query';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ActivityCardService from '../../services/ActivityCardService';

const SearchResults = ({
  name,
  id,
  setPreviewInfo,
  setHighlightedID,
  isHighlighted,
}) => {
  const { data: activityCards } = useQuery({
    queryKey: ['activityCards'],
    queryFn: ActivityCardService.getAllActivityCards,
  });
  const display_preview = () => {
    activityCards?.forEach(card => {
      if (card.id === id) {
        setHighlightedID(id);
        setPreviewInfo({
          url: card.thumbnailLink,
          name: card.name,
          id: card.id,
        });
      }
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
