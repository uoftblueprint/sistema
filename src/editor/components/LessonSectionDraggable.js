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
import { SafeAreaView } from 'react-native';
import ContentCard from './ContentCard';
import AddLessonContentButton from './AddLessonContentButton';
import { STACK_SCREENS } from '../constants';
import { TextStyle } from '../../Styles.config';

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
  // eslint-disable-next-line no-unused-vars
  const [isLoaded, setLoaded] = useState(false);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  // Equivalent to componentDidMount
  useEffect(() => {
    // TODO: Do all your fetching data here like grab lesson plan from RNFS, and set it to redux.
    // Make sure to add an indexing key to each module when you send it to redux (necessary for keyExtractor in NestableDraggableFlatList)
    // Like so:
    // .map((module, i) => {
    //   return {
    //     ...module,
    //     key: `module-${i}`,   // Whatever key you use, make sure it will work with the regex in grabNextKey inside helpers.js. Must be a string.
    //   }
    // })
    setLoaded(true); // Disable stuff until everything is loaded
  }, []);

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
      module => module.key !== keyToDelete,
    );
    updateRedux(newSectionData);
  };

  const editModule = (keyToEdit, newContent) => {
    // Replace the content of the module with a matching key
    const newSectionData = sectionData.map(module => {
      return module.key === keyToEdit
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
