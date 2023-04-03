import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Platform, FlatList } from 'react-native';
import SearchLogo from '../../../assets/Search.svg';
import SearchResults from './SearchResults';
import NoCardsFound from './NoCardsFound';
import { TextStyle } from '../../Styles.config';

const Searchbar = ({
  onChangeText,
  onFocus,
  activityList,
  focused,
  setPreviewInfo,
  showNoCards,
}) => {
  useEffect(() => {}, [activityList]);

  const [highlightedID, setHighlightedID] = useState(null);

  return (
    <View>
      <View style={styles.container}>
        <SearchLogo style={styles.IconStyle} width={25} height={25} />
        <TextInput
          style={TextStyle.h3}
          placeholder="Search by title or keyword"
          placeholderTextColor={'black'}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
      </View>
      {focused ? (
        <View style={{ paddingLeft: '4%', height: 200 }}>
          {showNoCards.current ? (
            <>
              <NoCardsFound />
            </>
          ) : (
            <>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ height: '100%', flex: 1 }}
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
            </>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '1%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#453E3D',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFAF5',
    alignItems: 'center',
    paddingHorizontal: '3%',
    ...Platform.select({
      ios: {
        zIndex: 999,
        paddingVertical: '2%',
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
    marginHorizontal: '1.5%',
  },
});

export default Searchbar;
