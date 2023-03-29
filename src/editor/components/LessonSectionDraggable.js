import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  NestableDraggableFlatList,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import DraggableModuleWithMenu from '../components/DraggableModuleWithMenu';
import { ModuleType } from "../../services/constants";
import { SafeAreaView } from "react-native";
import ContentCard from './ContentCard';
import AddLessonContentButton from './AddLessonContentButton';

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
  .map((module, i) => {                         // Add an indexing key to each module
    return {
      ...module,
      key: `module-${i}`, 
    }
  })


const LessonSectionDraggable = ({ sectionType, navigation }) => {
  const [data, setData] = useState(initialSectionData);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  useEffect(() => { // TODO
    // Update redux every time data changes
            // store.dispatch(
            //   addToSection({
            //     type: 'text',
            //     section: sectionType,
            //     content: e.nativeEvent.text,
            //   }),
            // );
  }, [data]);


  // Renders each module in DraggableFlatList
  const renderModule = ({ item, drag, isActive }) => {
    // TODO: add editModule and deleteModule functions
    return (
      <ScaleDecorator>
        <DraggableModuleWithMenu
          destructiveIndex={1}      // index of "Delete" for iOS menu only
          options={["Edit", "Delete"]}
          actions={[this.editModule, this.deleteModule]}
          longPressTriggerMs={200}  // ms to trigger a LongPress 
          drag={drag}
          dragIsActive={isActive}
          style={styles.module}
        >
          <Text style={styles.text}>{item.content}</Text>
        </DraggableModuleWithMenu>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>{sectionType}</Text>
      <View style={styles.sectionContainer}>
         {/* Content Card that opens at top of section, with prompt to type some text and insert new text module */}
         {isTextinputOpen && (
          <ContentCard
            setisTextinputOpen={setisTextinputOpen}
            setSectionContent={setData}
            sectionContent={data}
          />
          )}

        <AddLessonContentButton
          placeholder={'Input text'}
          handleClick={() => setisTextinputOpen(true)}
        />
        <AddLessonContentButton
          placeholder={'Add activity cards'}
          handleClick={() => setisTextinputOpen(true)} // TODO
        />

        {/* Stack of content already inserted, available for further editing/removing by tapping or rearraging order by dragging */}
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
  title: { // TODO: replace
    color: '#20232a',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28,
  },
  sectionContainer: { // TODO: check that styling matches LessonSection in frontend review branch
    marginBottom: 20,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  module: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // TODO: only for text, center for images
    backgroundColor: '#FFFAF5',
    height: 'auto',
    width: '100%', 
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 5,
    paddingVertical: 15, // TODO: scale once merge w/ master
    paddingHorizontal: 10,
  },
  text: { // TODO: replace with Styls.sconfig.js once git merge with master
    fontFamily: 'Poppins-Light',
    color: '#000000',
  },
});

export default LessonSectionDraggable;