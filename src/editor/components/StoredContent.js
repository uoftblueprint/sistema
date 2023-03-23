import React, { useRef } from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  addToSection,
  removeFromSection,
} from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';
import { TextStyle } from '../../Styles.config';

const StoredContent = ({ text, index, setSectionContent, sectionType }) => {
  const refInput = useRef();

  return (
    <SafeAreaView style={styles.ContentCardStyle}>
      {/* Touching the touchable opacity should focus the text input */}
      <TouchableOpacity
        onPress={() => refInput.current.focus()}
        style={styles.TouchableStyle}>
        <View pointerEvents="none">
          <TextInput
            style={TextStyle.body}
            multiline
            defaultValue={text}
            ref={refInput}
            onEndEditing={e => {
              const currText = e.nativeEvent.text;
              setSectionContent(state => {
                let newContent = [...state];
                // delete the content from section content state when empty
                newContent = newContent.filter((_, i) => i !== index);
                store.dispatch(
                  removeFromSection({
                    type: 'text',
                    section: sectionType,
                    content: text,
                  }),
                );
                // if the content isn't empty, add the edited content to store and newContent
                if (currText) {
                  newContent[index] = currText;
                  store.dispatch(
                    addToSection({
                      type: 'text',
                      section: sectionType,
                      content: currText,
                    }),
                  );
                }
                return newContent;
              });
            }}
          />
        </View>
      </TouchableOpacity>
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 0,
      },
      default: {
        ios: {
          paddingVertical: 4,
        },
      },
    }),
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  TouchableStyle: {
    flex: 1,
    height: 80,
  },
});

export default StoredContent;
