import  FavoriteButton from './FavoriteButton.js';
import OptionHeader from './OptionHeader';
import { useState } from 'react';
import OptionsMenuBanner from './OptionsMenuBanner.js';
import ExportIcon from '../../../assets/exportIcon.svg';
import TrashIcon from '../../../assets/trashIcon.svg';
import HeartIcon from '../../../assets/heartIcon.svg';
import CopyIcon from '../../../assets/copyIcon.svg';
import OptionsMenuButton from './OptionsMenuButton.js';
import { StyleSheet, SafeAreaView } from 'react-native';



const OptionsMenu = ( {isLessonPlanEditor, lessonPlanName, navigation} ) => {
  const [isFavorited, setFavorited] = useState(false);
  const [isBannerVisible, setBannerVisible] = useState(false);
  const lessonPlanNameForOptions = lessonPlanName;
  const isLessonPlanEditorCheck = isLessonPlanEditor;

  const editorButtons = [
    {
        name: "Export Lesson Plan",
        icon: <ExportIcon/>,
    }, 
    {
        name: "Favorites",
        icon: <HeartIcon/>,
    },
    {
        name: "Delete Lesson Plan",
        icon: <TrashIcon />,
    }
  ];
  
  const libraryButtons = [
    {
        name: "Export Lesson Plan",
        icon: <ExportIcon/>,
    },
    {
        name: "Copy Lesson Plan",
        icon: <CopyIcon/>
    },
    {
        name: "Delete Lesson Plan",
        icon: <TrashIcon />
    }
  ];

  const buttons = isLessonPlanEditorCheck ? editorButtons : libraryButtons;

    return (
      <SafeAreaView style={styles.screen}>
        <SafeAreaView style={styles.menu}>
          <OptionHeader isLessonEditor={isLessonPlanEditorCheck} 
          lessonName={lessonPlanNameForOptions} navigation={navigation}/>

          {buttons.map((button, i) => { 
            if (button.name == "Favorites") {
              return (<FavoriteButton setBanner={setBannerVisible} setFavor={setFavorited} isFavor={isFavorited}/>);
            } else {
              return (<OptionsMenuButton
                  key={i}
                  text={button.name}
                  icon={button.icon}
              />)
            }
          })}

          </SafeAreaView>
          {isBannerVisible && <OptionsMenuBanner isFav={isFavorited} />}
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
      flexDirection: 'column-reverse',
      alignContent: 'flex-start',
      alignItems: 'stretch',
      width: '100%',
      height: '100%',
    },
    menu: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#FFFAF5',
      width: '100%',
    },
    textContainer: {
      justifyContent: 'center',
      alignSelf: 'flex-start',
      paddingLeft: '7%',
      color: 'rgba(0,0,0, 0.87)',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 32,
    }
  });
  export default OptionsMenu;