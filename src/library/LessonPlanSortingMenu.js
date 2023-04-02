import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { useState, useEffect } from 'react';
import SortingButton from './components/SortingButton';
import { STACK_SCREENS } from './constants';
import { verticalScale, scale } from 'react-native-size-matters';

const buttons = [
  {
    sortStyle: 'A to Z',
    sortValue: 1,
  },
  {
    sortStyle: 'Z to A',
    sortValue: 2,
  },
  {
    sortStyle: 'Last Edited',
    sortValue: 0,
  },
  {
    sortStyle: 'Oldest',
    sortValue: 3,
  },
];

const LessonPlanSortingMenu = ({ navigation }) => {
  const [sortType, setSort] = useState(null);

  useEffect(() => {
    // if we have changed the sort value we go back to the libarary with
    // the according sort value
    if (sortType !== null) {
      navigation.navigate(STACK_SCREENS.LIBRARY, { sortT: sortType });
    }
  }, [sortType]);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <SafeAreaView style={styles.overlay}>
        <SafeAreaView style={styles.buttons}>
          {buttons.map((button, i) => {
            return (
              <SortingButton
                key={i}
                text={button.sortStyle}
                onPress={() => {
                  setSort(button.sortValue);
                }}
              />
            );
          })}
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(217,217,217, 0.8)',
    justifyContent: 'flex-start',
    flex: 1,
  },
  buttons: {
    marginTop: verticalScale(100),
    marginRight: scale(20),
  },
});
export default LessonPlanSortingMenu;
