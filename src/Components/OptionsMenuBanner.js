import { Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

import CheckMarkIcon from '../../assets/checkMark.svg';
import AlertErrorIcon from '../../assets/errorAlert.svg';

const windowWidth = Dimensions.get('window').width;

const OptionsMenuBanner = ({ isFavoritedPlan }) => {
  return (
    <SafeAreaView
      style={isFavoritedPlan ? styles.containerAdded : styles.containerRemoved}>
      {isFavoritedPlan ? (
        <CheckMarkIcon style={styles.iconBanner} />
      ) : (
        <AlertErrorIcon style={styles.iconBanner} />
      )}
      <Text
        style={
          isFavoritedPlan
            ? styles.textContainerAdded
            : styles.textContainerRemoved
        }>
        {isFavoritedPlan
          ? 'Lesson Plan Added to Favorites'
          : 'Lesson Plan Removed from Favorites'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerAdded: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEFCDF',
    height: 55,
    width: windowWidth,
  },
  containerRemoved: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE5E3',
    height: 55,
    width: windowWidth,
  },
  textContainerAdded: {
    fontFamily: 'Mulish-Regular',
    fontSize: 14,
    color: '#375238',
  },
  textContainerRemoved: {
    fontFamily: 'Mulish-Regular',
    fontSize: 14,
    color: '#471612',
  },
  iconBanner: {
    width: 18.33,
    height: 18.33,
    paddingLeft: '20%',
  },
});

export default OptionsMenuBanner;
