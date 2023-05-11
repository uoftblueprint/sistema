import { useState, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchLogo from '../../../assets/Search.svg';
import SearchResults from './SearchResults';
import NoCardsFound from './NoCardsFound';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale, moderateVerticalScale } from 'react-native-size-matters';

const Searchbar = ({
  onChangeText,
  value,
  activityList,
  setPreviewInfo,
  showNoCards,
  navigation,
  section,
}) => {
  const [highlightedID, setHighlightedID] = useState(null);
  const refSearch = useRef();

  return (
    <View style={{marginVertical: verticalScale(10)}}>
      <TouchableOpacity onPress={() => refSearch.current.focus()}>
        <View style={styles.searchContainer}>
          <SearchLogo style={styles.IconStyle} width={25} height={25} />
          <TextInput
            style={[TextStyle.h3, styles.InputStyle]}
            placeholder="Search by title or keyword"
            placeholderTextColor={'black'}
            onChangeText={onChangeText}
            ref={refSearch}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        {showNoCards.current ? (
          <NoCardsFound
            text={value}
            navigation={navigation}
            section={section}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ height: '100%' }}
            data={activityList}
            renderItem={({ item }) => {
              return (
                <SearchResults
                  name={item?.name}
                  id={item?.id}
                  setPreviewInfo={setPreviewInfo}
                  setHighlightedID={setHighlightedID}
                  isHighlighted={highlightedID === item?.id}
                />
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(160, 2.5),
    width: '100%',
  },
  searchContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#453E3D',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: '3%',
    ...Platform.select({
      ios: {
        zIndex: 999,
        paddingVertical: '3%',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'gray',
        shadowRadius: 3,
        shadowOpacity: 0.4,
      },
      android: {
        elevation: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOpacity: 1,
      },
    }),
  },
  IconStyle: {
    marginRight: Platform.OS === 'ios' ? '2.5%' : '2%',
  },
  InputStyle: {
    width: Platform.OS === 'ios' ? scale(260) : scale(270),
  },
});

export default Searchbar;
