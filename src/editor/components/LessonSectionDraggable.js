import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
import { ModuleType } from '../../services/constants';
import { SafeAreaView } from 'react-native';
import ContentCard from './ContentCard';
import AddLessonContentButton from './AddLessonContentButton';
import { STACK_SCREENS } from '../constants';
import { TextStyle } from '../../Styles.config';
import ChosenActivityCard from './ChosenActivityCard';

const LessonSectionDraggable = ({ sectionType, navigation }) => {
  // REDUX STATES
  const sectionData = useSelector(state =>
    getLessonSection(state.lessonPlan, sectionType),
  );
  console.log(sectionType, sectionData); // TODO: delete once you're done, helpful to see for now
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
  const [isLoaded, setLoaded] = useState(false);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  // ADD LESSON CONTENT FUNCTIONS
  const addTextModule = () => {
    setisTextinputOpen(!isTextinputOpen);
  };

  const addActivityCard = () => {
    navigation.navigate(STACK_SCREENS.ADD_ACTIVITY_CARD, {
      header: sectionType,
    });
  };

  const expandActivityCard = () => {
    navigation.navigate(STACK_SCREENS.EXPANDED_ACTIVITY_CARD);
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
        />

        <AddLessonContentButton
          placeholder={'Add activity cards'}
          handleClick={addActivityCard}
        />

        {/* Stack of content already inserted, available for further editing/removing */}
        <NestableDraggableFlatList
          data={sectionData}
          onDragEnd={({ data }) => updateRedux(data)}
          keyExtractor={item => item.key}
          renderItem={renderModule}
        />
        <ChosenActivityCard handleClick={expandActivityCard} />
        {/* cardName={cardName}
          cardPath={cardPath} /> */}
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