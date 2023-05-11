import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  replaceSection,
  getLessonSection,
} from '../../services/editor/lessonPlanSlice';
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import DraggableModuleWithMenu from '../components/DraggableModuleWithMenu';
import SkeletonModule from './SkeletonModule';
import ContentCard from './ContentCard';
import AddLessonContentButton from './AddLessonContentButton';
import { STACK_SCREENS } from '../constants';
import { TextStyle } from '../../Styles.config';

const LessonSectionDraggable = ({ sectionType, navigation, isFetching, disableInteractions }) => {
  // REDUX STATES
  const sectionData = useSelector(state =>
    getLessonSection(state.lessonPlan, sectionType),
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

  // COMPONENT STATES
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  // ADD LESSON CONTENT FUNCTIONS
  const addTextModule = () => {
    setisTextinputOpen(!isTextinputOpen);
  };

  const addActivityCard = () => {
    navigation.navigate(STACK_SCREENS.ADD_ACTIVITY_CARD, {
      sectionType: sectionType,
    });
  };

  // MODULE MENU FUNCTIONS
  const deleteModule = keyToDelete => {
    // Remove the module with matching key
    const newSectionData = sectionData.filter(
      module => module.key != keyToDelete,
    );
    updateRedux(newSectionData);
  };

  const editModule = (keyToEdit, newContent) => {
    // Replace the content of the module with a matching key
    const newSectionData = sectionData.map(module => {
      return module.key == keyToEdit
        ? { ...module, content: newContent }
        : module;
    });
    updateRedux(newSectionData);
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
          longPressTriggerMs={200} // ms it takes to trigger a LongPress and drag
          drag={drag}
          dragIsActive={isActive}
          data={item}
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
          <ContentCard
            setisTextinputOpen={setisTextinputOpen}
            sectionType={sectionType}
          />
        )}

        <AddLessonContentButton
          placeholder={'Input text'}
          handleClick={addTextModule}
          isDisabled={disableInteractions}
        />
        <AddLessonContentButton
          placeholder={'Add activity cards'}
          handleClick={addActivityCard}
          isDisabled={disableInteractions}
        />

        {isFetching 
          ? <SkeletonModule />
          : 
            /* Stack of content already inserted, available for further editing/removing */
            <NestableDraggableFlatList
              data={sectionData}
              onDragEnd={({ data }) => updateRedux(data)}
              keyExtractor={item => item.key}
              renderItem={renderModule}
            />
        }
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
