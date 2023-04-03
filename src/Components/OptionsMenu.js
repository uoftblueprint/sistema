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
import { useSelector } from 'react-redux';
import { createPDF } from '../services/PDFExport.js';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const OptionsMenu = ({ isLessonPlanEditor, lastEdited, navigation }) => {
  const [isFavorited, setFavorited] = useState(false);
  const [isBannerVisible, setBannerVisible] = useState(false);

  const editorButtons = [
    {
      name: 'Export Lesson Plan',
      icon: <ExportIcon />,
    },
    {
      name: 'Favorites',
      icon: <HeartIcon />,
    },
    {
      name: 'Delete Lesson Plan',
      icon: <TrashIcon />,
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

  const lessonPlan = useSelector(state => state.lessonPlan);
  const exportLessonPlan = async () => {
    let r = await createPDF(lessonPlan);
    try {
      await Share.open({
        url: 'file://' + r.filePath,
        type: 'application/pdf',
      });
      console.log('File shared');
    } catch {
      console.log('File not shared');
    }
    await RNFS.unlink(r.filePath);
  };

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
            return (
              <OptionsMenuButton
                key={i}
                text={button.name}
                icon={button.icon}
                onPress={onPress}
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
