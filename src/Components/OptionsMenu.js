import FavoriteButton from '../editor/components/FavoriteButton.js';
import OptionHeader from './OptionHeader';
import { useEffect, useState } from 'react';
import OptionsMenuBanner from './OptionsMenuBanner';
import ExportIcon from '../../assets/exportIcon.svg';
import TrashIcon from '../../assets/trashIcon.svg';
import HeartIcon from '../../assets/heartIcon.svg';
import CopyIcon from '../../assets/copyIcon.svg';
import OptionsMenuButton from './OptionsMenuButton';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { createPDF } from '../services/pdf';
import { deleteFile } from '../services/routes/Local';
import Share from 'react-native-share';
import LessonPlanService from '../services/LessonPlanService';
import RNFS from 'react-native-fs';

const OptionsMenu = ({
  isLessonPlanEditor,
  lastEdited,
  lessonPlanName,
  navigation,
}) => {
  const [fetchingData, setFetching] = useState(true);
  const [isFavorited, setFavorited] = useState(false);
  const [isBannerVisible, setBannerVisible] = useState(false);
  const lessonPlan = useSelector(state => state.lessonPlan); 
  // TODO can i move this into export helper func if 
  // it's only being used once b/c lastEdited is passed in 

  useEffect(() => {
    if (isLessonPlanEditor && fetchingData) {
      // TODO grab if lesson is favorited from LessonPlanService
      // set isFavorited
      // console.log('Checking is if favorited');
      // TODO grab lastEdited? here or pass it into OptionsMenu since that's how the overlay does it?
    }
  }, [])

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

  const handleFavoriteChange = () => {
    // TODO
    // (isFavorited
    //   ? LessonPlanService.unfavouriteLessonPlan(NAME_HERE) //TODO
    //   : LessonPlanService.favouriteLessonPlan()
    // )
  }

  const exportLessonPlan = async () => {
    const lpObj = isLessonPlanEditor 
      ? lessonPlan // get lesson plan from redux since we're in the editor already
      : await LessonPlanService.getLessonPlan(lessonPlanName);
    let pdf = await createPDF(lpObj);
    try {
      const localPath = 'file://' + pdf.filePath;
      const exportedFilename = lpObj.lessonPlanName
        ? lpObj.lessonPlanName.replace(/ /g,"_") // replace spaces with underscores
        : 'Sistema_Lesson_Plan'; 

      if (Platform.OS === 'ios') {
        await Share.open({
          url: localPath,
          type: 'application/pdf',
        });
        console.log('File shared on ios');
      } else {
        // await LessonPlanService.downloadLessonPlanAndroid(localPath, exportedFilename)
        await RNFS.exists(localPath)
          .then((doesExist) => console.log(`Does this file exist?2 ${doesExist}`))
          .catch(() => console.log('existsAssets err'));
      }
    } catch (err) {
      console.error('File not shared', err);
    }
    await deleteFile(pdf.filePath);
  };

  const buttons = isLessonPlanEditor ? editorButtons : libraryButtons;

  return (
    <SafeAreaView style={styles.screen}>
      <SafeAreaView style={styles.menu}>
        <OptionHeader lastEdited={lastEdited} navigation={navigation} />

        {buttons.map((button, i) => {
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
