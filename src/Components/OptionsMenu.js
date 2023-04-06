import FavoriteButton from '../editor/components/FavoriteButton.js';
import OptionHeader from './OptionHeader';
import { useState } from 'react';
import OptionsMenuBanner from './OptionsMenuBanner';
import ExportIcon from '../../assets/exportIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import CopyIcon from '../../assets/copyIcon.svg';
import OptionsMenuButton from './OptionsMenuButton';
import { StyleSheet, SafeAreaView } from 'react-native';
import LessonPlanService from '../services/LessonPlanService';

const OptionsMenu = ({
  isLessonPlanEditor,
  lastEdited,
  lessonPlanName,
  navigation,
}) => {
  const [isFavorited, setFavorited] = useState(false);
  const [isBannerVisible, setBannerVisible] = useState(false);

  // FUNCTIONS FOR BUTTONS
  const copyLessonPlan = () => {
    LessonPlanService.copyLessonPlan(lessonPlanName);
    navigation.goBack();
  }

  const deleteLessonPlan = async () => {
    await LessonPlanService.deleteLessonPlan(lessonPlanName);
    navigation.goBack();
  }

  const defaultPress = () => {
    console.log('This function is not implemented yet.', lessonPlanName);
  }

  // ALL OPTION BUTTONS
  const editorButtons = [
    {
      name: 'Export Lesson Plan',
      icon: <ExportIcon />,
    },
    {
      name: 'Favorites',
      icon: <HeartIcon />,
    },
  ];

  const libraryButtons = [
    {
      name: 'Export Lesson Plan',
      icon: <ExportIcon />,
    },
    {
      name: 'Copy Lesson Plan',
      icon: <CopyIcon />,
    },
    {
      name: 'Delete Lesson Plan',
      icon: <TrashIcon />,
    },
  ];

  const buttons = isLessonPlanEditor ? editorButtons : libraryButtons;

  return (
    <SafeAreaView style={styles.screen}>
      <SafeAreaView style={styles.menu}>
        <OptionHeader lastEdited={lastEdited} navigation={navigation} />

        {buttons.map((button, i) => {
          if (button.name === 'Favorites') {
            return (
              <FavoriteButton
                key={i}
                setBanner={setBannerVisible}
                setFavoritedPlan={setFavorited}
                isFavoritedPlan={isFavorited}
              />
            );
          } else {
            let handlePress;
            switch (button.name) {
              case 'Copy Lesson Plan':
                handlePress = copyLessonPlan;
                break;
              case 'Delete Lesson Plan':
                handlePress = deleteLessonPlan;
                break;
              default:
                handlePress = defaultPress;
            }
            return (
              <OptionsMenuButton
                key={i}
                text={button.name}
                icon={button.icon}
                onPress={handlePress}
              />
            );
          }
        })}
      </SafeAreaView>
      {isBannerVisible && <OptionsMenuBanner isFavoritedPlan={isFavorited} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'column-reverse',
    alignItems: 'stretch',
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  menu: {
    alignItems: 'center',
    backgroundColor: '#FFFAF5',
    width: '100%',
  },
});
export default OptionsMenu;
