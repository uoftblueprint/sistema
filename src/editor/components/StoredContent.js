import React from 'react';
import { SafeAreaView, Platform, StyleSheet, TextInput } from 'react-native';
import {
  addToSection,
  removeFromSection
} from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';

const StoredContent = ({ text, index, setSectionContent, sectionType }) => {
  return (
    <SafeAreaView style={styles.ContentCardStyle}>
      <TextInput
        multiline
        defaultValue={text}
        onEndEditing={e => {
          setSectionContent(state => {
            newContent = [...state];
            // delete the content from section content state when empty
            newContent = newContent.filter((_, i) => i != index);
            store.dispatch(
              removeFromSection({
                type: 'text',
                section: sectionType,
                content: text
              })
            );
            // if the content isn't empty, add the edited content to store and newContent
            if (e.nativeEvent.text) {
              newContent[index] = e.nativeEvent.text;
              store.dispatch(
                addToSection({
                  type: 'text',
                  section: sectionType,
                  content: e.nativeEvent.text
                })
              );
            }
            return newContent;
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContentCardStyle: {
    fontFamily: 'Poppins-Light',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFAF5',
    height: 80,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10
      },
      android: {
        paddingVertical: 0
      },
      default: {
        ios: {
          paddingVertical: 4
        }
      }
    }),
    paddingHorizontal: 10,
    marginVertical: 5
  }
});

export default StoredContent;
