import { Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { OptionsMenuPadding } from '../Styles.config';
import { verticalScale, scale } from 'react-native-size-matters';

import CheckMarkIcon from '../../assets/checkMark.svg';
import AlertErrorIcon from '../../assets/errorAlert.svg';

const windowWidth = Dimensions.get('window').width;

const OptionsMenuBanner = ({ isFavoritedPlan }) => {
  const fontColor = isFavoritedPlan ? '#375238' : '#471612'; 
  const backgroundColor = isFavoritedPlan ? '#DEFCDF' : '#FCE5E3'; 
  const displayText = isFavoritedPlan
    ? 'Lesson Plan Added to Favorites'
    : 'Lesson Plan Removed from Favorites';
  const icon = isFavoritedPlan 
    ? <CheckMarkIcon style={styles.iconBanner} /> 
    : <AlertErrorIcon style={styles.iconBanner} />;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: backgroundColor}]}>
      {icon}
      <Text style={[styles.text, {color: fontColor}]}>
        {displayText}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(55),
    paddingVertical: verticalScale(10),
    width: windowWidth,
  },
  text: {
    flex: 1,
    fontFamily: 'Mulish-Regular',
    fontSize: 14,
    marginRight: OptionsMenuPadding,
  },
  iconBanner: {
    width: scale(18.33),
    height: scale(18.33),
    marginHorizontal: OptionsMenuPadding,
  },
});

export default OptionsMenuBanner;
