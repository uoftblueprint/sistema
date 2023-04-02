import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import HeartIcon from '../../../assets/heartIcon.svg';
import FavoriteIcon from '../../../assets/favoriteIcon.svg';
import { OptionsMenuPadding } from '../../Styles.config';

const windowWidth = Dimensions.get('window').width;
let timer;

const FavoriteButton = ({ setBanner, setFavoritedPlan, isFavoritedPlan }) => {
  const onPress = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setFavoritedPlan(!isFavoritedPlan);
    setBanner(true);
    timer = setTimeout(() => {
      setBanner(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
        <SafeAreaView style={styles.icon}>
          {!isFavoritedPlan ? <HeartIcon /> : <FavoriteIcon />}
        </SafeAreaView>
        <Text style={styles.textContainer}>
          {!isFavoritedPlan ? 'Add to Favorites' : 'Remove from Favorites'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderColor: '#000000',
    borderWidth: 0.25,
  },
  buttonContainer: {
    paddingLeft: OptionsMenuPadding,
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    width: '100%',
    height: 45,
  },
  textContainer: {
    paddingLeft: OptionsMenuPadding,
    color: 'rgba(0,0,0, 0.87)',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
  },
  icon: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavoriteButton;
