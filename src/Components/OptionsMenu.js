import FavoriteButton from '../editor/components/FavoriteButton.js';
import OptionHeader from './OptionHeader';
import { useState } from 'react';
import OptionsMenuBanner from './OptionsMenuBanner';
import ExportIcon from '../../assets/exportIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import CopyIcon from '../../assets/copyIcon.svg';
import OptionsMenuButton from './OptionsMenuButton';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createPDF } from '../services/pdf';
import { deleteFile } from '../services/routes/Local';
import Share from 'react-native-share';
import LessonPlanService from '../services/LessonPlanService';
import {
  setFavState,
  getCurrFavState,
} from '../services/editor/lessonPlanSlice.js';

const OptionsMenu = ({
  isLessonPlanEditor,
  lastEdited,
  lessonPlanName,
  navigation,
  isFavorited,
}) => {
  const dispatch = useDispatch();
  const [isBannerVisible, setBannerVisible] = useState(false);
  const lessonPlan = useSelector(state => state.lessonPlan);
  const isCurrentlyFavorited =
    isFavorited ?? // from library
    // eslint-disable-next-line
    useSelector(state => getCurrFavState(state.lessonPlan)); // from editor
  // TODO can i move this into export helper func if
  // it's only being used once b/c lastEdited is passed in

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

  // FUNCTIONS FOR BUTTONS
  const copyLessonPlan = () => {
    LessonPlanService.copyLessonPlan(lessonPlanName);
    navigation.goBack();
  };

  const deleteLessonPlan = async () => {
    await LessonPlanService.deleteLessonPlan(lessonPlanName);
    navigation.goBack();
  };

  const handleFavoriteChange = newState => {
    dispatch(setFavState(newState));
  };

  const exportLessonPlan = async () => {
    const lpObj = isLessonPlanEditor
      ? lessonPlan // get lesson plan from redux since we're in the editor already
      : await LessonPlanService.getLessonPlan(lessonPlanName);
    let pdf = await createPDF(lpObj);
    try {
      await Share.open({
        url: 'file://' + pdf.filePath,
        type: 'application/pdf',
      });
      console.log('File shared');
    } catch (err) {
      const exception =
        Platform.OS === 'android' &&
        err.toString().includes('User did not share');
      if (!exception) {
        console.error('File not shared', err);
      }
    }
    await deleteFile(pdf.filePath);
  };

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
                setFavoritedPlan={handleFavoriteChange}
                isFavoritedPlan={isCurrentlyFavorited}
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
                handlePress = exportLessonPlan;
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
      {isBannerVisible && (
        <OptionsMenuBanner isFavoritedPlan={isCurrentlyFavorited} />
      )}
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
