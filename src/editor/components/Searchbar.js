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
    <View style={styles.shadow}>
    <View style={styles.column}>
      <TouchableOpacity 
        style={styles.searchbarContainer}
        onPress={() => refSearch.current.focus()}>
          <SearchLogo style={styles.IconStyle} width={25} height={25} />
          <TextInput
            style={[TextStyle.h3, styles.InputStyle]}
            placeholder="Search by title or keyword"
            placeholderTextColor={'black'}
            onChangeText={onChangeText}
            ref={refSearch}
          />
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
              isFirst={i == 0}
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
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    marginVertical: verticalScale(10),
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.77,
    borderColor: '#453E3D',
    backgroundColor: '#FDFBF7',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        shadowColor: '#453E3D',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
      },
    }),
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#453E3D',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 5,
      },
    }),
  },
  searchbarContainer: { 
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FDFBF7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 0.77,
    paddingHorizontal: scale(14),
    ...Platform.select({
      ios: {
        paddingVertical: verticalScale(10),
      },
    }),
  },
  searchResultContainer: {
    maxHeight: moderateVerticalScale(200, 2.5),
    width: '100%',
    backgroundColor: '#FDFBF7',
  },
  IconStyle: {
    marginRight: Platform.OS === 'ios' ? '2.5%' : '2%',
  },
  InputStyle: {
    width: Platform.OS === 'ios' ? scale(260) : scale(270),
  },
});

export default Searchbar;
