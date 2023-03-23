import React, { useRef } from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import { TextStyle } from '../../Styles.config';
import store from '../../services/configureStore';

const ContentCard = ({
  setisTextinputOpen,
  setSectionContent,
  sectionContent,
  sectionType,
}) => {
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
            placeholder={'Add Text'}
            multiline={true}
            ref={refInput}
            onEndEditing={e => {
              if (e.nativeEvent.text) {
                setSectionContent([...sectionContent, e.nativeEvent.text]);
                store.dispatch(
                  addToSection({
                    type: 'text',
                    section: sectionType,
                    content: e.nativeEvent.text,
                  }),
                );
              }
              setisTextinputOpen(false);
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContentCardStyle: {
    maxHeight: '100%',
    maxWidth: '100%',
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

export default ContentCard;
