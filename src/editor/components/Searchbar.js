import { useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import SearchLogo from '../../../assets/Search.svg';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale } from 'react-native-size-matters';

const Searchbar = ({
  onChangeText,
}) => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    borderRadius: 10,
    borderWidth: 0.77,
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
