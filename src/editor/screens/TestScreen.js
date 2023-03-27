import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
} from "react-native-draggable-flatlist";
import { ModuleType, SectionName } from "../../services/constants";

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

export default function TestScreen() {
  const [data, setData] = useState(initialSectionData);

  useEffect(() => {
    // Update redux every time data changes
  }, [data]);

  const renderModule = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity 
          delayLongPress={200}  // ms to trigger a LongPress
          onPress={() => {console.log("pressed!")}}
          onLongPress={drag}
          disabled={isActive} // disable interactions while being dragged
          style={[
            styles.module,
          ]}
        >
          <Text style={styles.text}>{item.content}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList  // draggable list per lesson plan section
      data={data}       
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderModule} 
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
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