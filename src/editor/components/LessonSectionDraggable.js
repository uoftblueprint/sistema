import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import DraggableModuleWithMenu from '../components/DraggableModuleWithMenu';
import { ModuleType } from "../../services/constants";
import { SafeAreaView } from "react-native";
import ContentCard from './ContentCard';
import AddLessonContentButton from './AddLessonContentButton';
import { STACK_SCREENS } from "../constants";
import { TextStyle } from "../../Styles.config";

const randomFillerStoreData = {
  'warmUp': [
    {
      type: ModuleType.text,
      content: 'Lorem ipsum'
    },
    {
      type: ModuleType.text,
      content: 'Random stuff hereRandom stuff here Random stuff here Random stuff here Random stuff here Random stuff here Random stuff here'
    },
    {
      type: ModuleType.text,
      content: ''
    },
  ]
}

// TODO: replace with sectionName
const initialSectionData = randomFillerStoreData['warmUp']
  .filter(module => module.content.length > 0)  // Only keep modules with content in them
  .map((module, i) => {                         
    return {
      ...module,
      key: `module-${i}`,                       // Add an indexing key to each module TODO make sure u add
    }
  })


const LessonSectionDraggable = ({ sectionType, navigation }) => {
  const [data, setData] = useState(initialSectionData);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  useEffect(() => { // TODO
    console.log(data);
    // Update redux every time data changes
            // store.dispatch(
            //   addToSection({
            //     type: 'text',
            //     section: sectionType,
            //     content: e.nativeEvent.text,
            //   }),
            // );
  }, [data]);

  const addTextModule = () => {
    setisTextinputOpen(!isTextinputOpen);
  };

  const addActivityCard = () => {
    navigation.navigate(STACK_SCREENS.ADD_ACTIVITY_CARD, {
      header: sectionType,
    });
  };


  const deleteModule = (keyToDelete) => {
    const newSectionData = data.filter(module => module.key != keyToDelete); // Remove the module with matching key
    setData(newSectionData);
  }

  const editModule = (keyToEdit, newContent) => {
    const newSectionData = data.map((module) => {
      return (module.key == keyToEdit) ? { ...module, content: newContent } : module; // Replace content of the module with matching key
    }); 
    setData(newSectionData);
  }

  // To render each module in DraggableFlatList
  const renderModule = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator 
        activeScale={0.95}          // shrinks the module when dragged
      > 
        <DraggableModuleWithMenu
          handleEdit={editModule}
          handleDelete={deleteModule}
          longPressTriggerMs={200}  // ms to trigger a LongPress and drag
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
            setSectionContent={setData}
            sectionContent={data}
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
          data={data}       
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.key}
          renderItem={renderModule} 
        />
      </View>
    </SafeAreaView>
  );
}

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