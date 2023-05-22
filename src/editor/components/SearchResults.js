import { useQuery } from '@tanstack/react-query';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ActivityCardService from '../../services/ActivityCardService';

const SearchResults = ({
  name,
  id,
  setPreviewInfo,
  setHighlightedID,
  isHighlighted,
}) => {
  // Remove '.jpg' at end of name
  let displayName;
  if (name && name.includes('.jpg')) {
    const regex = /^(.*)(\.jpg)$/m;
    displayName = name.match(regex)[1];
  }

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
          name: displayName,
          id: card.id,
        });
      }
    });
  };

  return (
    <View style={styles.column}>
      <TouchableOpacity
        onPress={display_preview}
        style={[
          styles.container,
          isHighlighted && styles.containerHighlighted,
        ]}>
        <Text style={styles.textStyle}>{displayName ?? ''}</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  containerHighlighted: {
    borderColor: '#36ABFF',
  },
  textStyle: {
    fontFamily: 'Mulish-Regular',
    width: '100%',
    fontSize: 17,
    color: 'black',
  },
  separator: {
    backgroundColor: '#f2f2f2', // light grey
    width: '100%',
    height: 1,
  },
});

export default SearchResults;
