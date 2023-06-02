import { useQuery } from '@tanstack/react-query';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ActivityCardService from '../../services/ActivityCardService';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale } from 'react-native-size-matters';

const SearchResults = ({
  name,
  id,
  setPreviewInfo,
  setHighlightedID,
  isHighlighted,
  isFirst,
}) => {
  let fullName;
  let title;
  let subtitle;

  // Remove '.jpg' at end of name
  if (name && name.includes('.jpg')) {
    const regex = /^(.*)(\.jpg)$/m;
    fullName = name.match(regex)[1];

    // Split name into title and subtitle
    const parts = fullName.split('-', 3);
    if (parts.length == 3) {
      let theme = parts[0].trim();
      let type = parts[1].trim();

      title = parts[2].trim();
      subtitle = theme + ' - ' + type; 
    } else if (parts.length == 2) {
      let theme = parts[0].trim();

      title = parts[1].trim();
      subtitle = theme;
    } else {
      title = fullName;
    }
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
          name: fullName,
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
          isFirst && {borderTopWidth: 0} // first element has no border
        ]}>
        <Text style={TextStyle.label}>{title ?? 'Name error'}</Text>
        {subtitle && <Text style={[TextStyle.label, {fontSize: 13}]}>{subtitle}</Text>}
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
    backgroundColor: '#FDFBF7',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),
    borderTopColor: '#D9D9D9',
    borderTopWidth: 0.77,
  },
  containerHighlighted: {
    backgroundColor: '#68577766',
  },
  separator: {
    backgroundColor: '#f2f2f2', // light grey
    width: '100%',
    height: 1,
  },
});

export default SearchResults;
