import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  replaceSection,
  getLessonSection,
  getInitialLessonPlanName,
  getCurrImageFiles,
  setCurrImageFiles,
  addToSection,
} from '../../services/editor/lessonPlanSlice';
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import DraggableModuleWithMenu from '../components/DraggableModuleWithMenu';
import SkeletonModule from './SkeletonModule';
import TextCard from './TextCard';
import LinkCard from './LinkCard';
import ActivityCardService from '../../services/ActivityCardService';
import AddLessonContentButton from './AddLessonContentButton';
import { STACK_SCREENS } from '../constants';
import { ModuleType } from '../../services/constants';
import { TextStyle } from '../../Styles.config';
import { launchImageLibrary } from 'react-native-image-picker';

// ICONS
import TextIcon from '../../../assets/textIcon.svg';
import SearchIcon from '../../../assets/Search.svg';
import ImageIcon from '../../../assets/imageIcon.svg';
import LinkIcon from '../../../assets/linkIcon.svg';

const LessonSectionDraggable = ({
  sectionType,
  navigation,
  isFetching,
  disableInteractions,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // REDUX STATES
  const sectionData = useSelector(state =>
    getLessonSection(state.lessonPlan, sectionType),
  );
  const lessonPlanName = useSelector(state =>
    getInitialLessonPlanName(state.lessonPlan),
  );
  const currImageFiles = useSelector(state =>
    getCurrImageFiles(state.lessonPlan),
  );
  const dispatch = useDispatch();
  const updateRedux = newSectionData => {
    dispatch(
      replaceSection({
        section: sectionType,
        allData: newSectionData,
      }),
    );
  };

  console.log(sectionData);

  // COMPONENT STATES
  const [isTextinputOpen, setisTextinputOpen] = useState(false);
  const [isLinkInputOpen, setisLinkInputOpen] = useState(false);

  // ADD LESSON CONTENT FUNCTIONS
  const addTextModule = () => {
    setisTextinputOpen(!isTextinputOpen);
  };

  const addActivityCard = () => {
    navigation.navigate(STACK_SCREENS.ADD_ACTIVITY_CARD, {
      sectionType: sectionType,
      lessonPlanName: lessonPlanName,
    });
  };

  const addImageModule = async () => {
    // You can also use as a promise without 'callback':
    // TODO: dispatch to redux as well as ModuleType.image
    const options = {
      mediaType: 'photo',
      maxWidth: windowWidth,
      maxHeight: windowHeight,
      includeBase64: true,
    };

    const result = await launchImageLibrary(options);
    // Handle response object
    if (result.didCancel) {
      console.log('User cancelled the image picker.');
    } else if (result.error) {
      console.error(result.errorMessage);
    } else {
      const paths = await ActivityCardService.addImageToStorage(
        result.assets[0].base64,
        result.assets[0].fileName,
        lessonPlanName,
      );

      await dispatch(
        addToSection({
          type: ModuleType.image,
          name: paths.relPath,
          section: sectionType,
          content: paths.relPath,
          path: paths.fullPath,
        }),
      );
    }
  };

  const addLinkModule = () => {
    setisLinkInputOpen(!isLinkInputOpen);
  };

  const addContentActions = [
    {
      placeholder: 'Insert text',
      Icon: TextIcon,
      action: addTextModule,
    },
    {
      placeholder: 'Add activity cards',
      Icon: SearchIcon,
      action: addActivityCard,
    },
    {
      placeholder: 'Upload an image',
      Icon: ImageIcon,
      action: addImageModule,
    },
    {
      placeholder: 'Insert link',
      Icon: LinkIcon,
      action: addLinkModule,
    },
  ];

  // MODULE MENU FUNCTIONS
  const deleteModule = keyToDelete => {
    // Remove the module with matching key
    const newSectionData = sectionData.filter(
      module => module.key != keyToDelete,
    );
    
    // Remove module from LP frontend immediately
    updateRedux(newSectionData);

    // If the module is an activity card, update the current list of activity cards
    const acToDelete = sectionData.find(
      module => module.key === keyToDelete && module.type === ModuleType.activityCard, // TODO: support images too
    );
    
    if (acToDelete) {
      // Get rid of activity card with first matching id
      let acArray = [...currImageFiles];
      const index = acArray.indexOf(`/${acToDelete.id}/cardImage.jpg`);
      if (index > -1) {
        acArray.splice(index, 1); 
        dispatch(setCurrImageFiles(acArray));
      }
    } 
  };

  const editModule = (keyToEdit, newContent, newTitle = '') => {
    // Replace the content of the module with a matching key
    const newSectionData = sectionData.map(module => {
      return module.key == keyToEdit
        ? { ...module, content: newContent, title: newTitle ?? '' }
        : module;
    });
    updateRedux(newSectionData);
  };

  const moveModule = (keyToMove, swapUp) => {
    // Moving up or down is equivalent to swapping with module before or after it
    if (swapUp) {
      let index = sectionData.findIndex(module => module.key == keyToMove);
      // Swap if element isn't first
      if (index > 0) {
        let newSection = [...sectionData];
        newSection[index] = newSection[index - 1];
        newSection[index - 1] = sectionData[index];
        updateRedux(newSection);
      }
    } else {
      let index = sectionData.findIndex(module => module.key == keyToMove);
      // Swap if element isn't last
      if (index !== -1 && index < sectionData.length - 1) {
        let newSection = [...sectionData];
        newSection[index] = newSection[index + 1];
        newSection[index + 1] = sectionData[index];
        updateRedux(newSection);
      }
    }
  };

  // To render each module in DraggableFlatList
  const renderModule = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator
        activeScale={0.95} // shrinks the module when dragged
      >
        <DraggableModuleWithMenu
          handleEdit={editModule}
          handleDelete={deleteModule}
          handleMove={moveModule}
          longPressTriggerMs={200} // ms it takes to trigger a LongPress and drag
          drag={drag}
          dragIsActive={isActive}
          data={item}
          lessonPlanName={lessonPlanName}
          navigation={navigation}
          isMenuDisabled={disableInteractions}
        />
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={[styles.title, TextStyle.h2]}>{sectionType}</Text>
      <View style={styles.sectionContainer}>
        {/* New textbox with prompted to insert text */}
        {isTextinputOpen && (
          <TextCard
            setisTextinputOpen={setisTextinputOpen}
            sectionType={sectionType}
          />
        )}

        {isLinkInputOpen && (
          <LinkCard
            setisLinkInputOpen={setisLinkInputOpen}
            sectionType={sectionType}
          />
        )}

        <AddLessonContentButton
          handleClickActions={addContentActions}
          isDisabled={disableInteractions}
        />

        {isFetching ? (
          <SkeletonModule />
        ) : (
          /* Stack of content already inserted, available for further editing/removing */
          <NestableDraggableFlatList
            data={sectionData}
            onDragEnd={({ data }) => updateRedux(data)}
            keyExtractor={item => item.key}
            renderItem={renderModule}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  mainContainer: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
  },
});

export default LessonSectionDraggable;
