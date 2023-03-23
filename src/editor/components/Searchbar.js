import { StyleSheet, TextInput, View, Platform } from 'react-native';
import SearchLogo from '../../../assets/Search.svg';

const Searchbar = ({ onChangeText }) => {
  return (
    <View style={styles.container}>
      <SearchLogo style={styles.IconStyle} width={25} height={25} />
      <TextInput
        style={styles.TextStyle}
        placeholder="Search by title or keyword"
        placeholderTextColor={'black'}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '8%',
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
    // background color must be set
  },
  TextStyle: {
    fontFamily: 'Mulish-Italic',
    width: '100%',
    fontSize: 17,
  },
  IconStyle: {
    marginHorizontal: '1.5%',
  },
});

export default Searchbar;
