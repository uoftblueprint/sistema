import { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchLogo from '../../../assets/Search.svg';
import SearchResults from './SearchResults';
import NoCardsFound from './NoCardsFound';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale, moderateVerticalScale } from 'react-native-size-matters';

const Searchbar = ({ navigation, onChangeText, resultData, setPreviewInfo, setHighlightedID, highlightedID, searchQuery, sectionType }) => {
  const refSearch = useRef();

  return (
    <View style={styles.column}>
      <TouchableOpacity onPress={() => refSearch.current.focus()}>
        <View style={styles.searchbarContainer}>
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
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.searchResultContainer}>
        {resultData.length > 0 ? (
          resultData.map((item, i) => (
            <SearchResults
              key={i}
              name={item?.name}
              id={item?.id}
              setPreviewInfo={setPreviewInfo}
              setHighlightedID={setHighlightedID}
              isHighlighted={highlightedID === item?.id}
            />
          ))
        ) : (
          <NoCardsFound
            text={searchQuery}
            navigation={navigation}
            section={sectionType}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    marginVertical: verticalScale(10),
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  searchbarContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 0.77,
    borderColor: '#453E3D',
    borderBottomColor: '#FFFAF5',  
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
  searchResultContainer: {
    maxHeight: moderateVerticalScale(230, 2.5),
    width: '100%',
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
