import FavoriteButton from '../editor/components/FavoriteButton.js';
import OptionHeader from './OptionHeader';
import { useState } from 'react';
import OptionsMenuBanner from './OptionsMenuBanner';
import ExportIcon from '../../assets/icons/exportIcon.svg';
import TrashIcon from '../../assets/icons/trashIcon.svg';
import HeartIcon from '../../assets/icons/heartIcon.svg';
import CopyIcon from '../../assets/icons/copyIcon.svg';
import OptionsMenuButton from './OptionsMenuButton';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { createPDF } from '../services/pdf';
import { deleteFile } from '../services/routes/Local';
import Share from 'react-native-share';
import LessonPlanService from '../services/LessonPlanService';

const OptionsMenu = ({
  isLessonPlanEditor,
  lastEdited,
  lessonPlanName,
  navigation,
}) => {
  const [isFavorited, setFavorited] = useState(false);
  const [isBannerVisible, setBannerVisible] = useState(false);
  const lessonPlan = useSelector(state => state.lessonPlan);

  // FUNCTIONS FOR BUTTONS
  const copyLessonPlan = () => {
    LessonPlanService.copyLessonPlan(lessonPlanName);
    navigation.goBack();
  };

  const deleteLessonPlan = async () => {
    await LessonPlanService.deleteLessonPlan(lessonPlanName);
    navigation.goBack();
  };

  const exportLessonPlan = async () => {
    let pdf = await createPDF(lessonPlan);
    try {
      await Share.open({
        url: 'file://' + pdf.filePath,
        type: 'application/pdf',
      });
      console.log('File shared');
    } catch {
      console.log('File not shared');
    }
    await deleteFile(pdf.filePath);
  };

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
          var onPress;
          if (button.name === 'Export Lesson Plan') {
            onPress = exportLessonPlan;
          }
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
