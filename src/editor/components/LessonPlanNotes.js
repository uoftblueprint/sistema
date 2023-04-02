import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  View,
} from 'react-native';
import { addToNote, removeNote } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';
import { TextStyle } from '../../Styles.config';

const LessonPlanNotes = ({ sectionType, placeholder }) => {
  // eslint-disable-next-line no-unused-vars
  const [sectionContent, setSectionContent] = useState(placeholder); // TODO: fix

  return (
    <SafeAreaView width={'100%'}>
      <Text style={[styles.title, TextStyle.h2]}>{sectionType}</Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={TextStyle.body}
          multiline
          placeholder={'Add lesson notes here'}
          returnKeyType="next"
          onEndEditing={e => {
            if (e.nativeEvent.text) {
              setSectionContent(e.nativeEvent.text);
              store.dispatch(
                addToNote({
                  section: sectionType,
                  content: e.nativeEvent.text,
                }),
              );
            } else {
              setSectionContent(placeholder);
              store.dispatch(removeNote());
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  SectionStyle: {
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 15,
      },
      android: {
        paddingVertical: 0,
      },
    }),
    flexDirection: 'column',
    backgroundColor: '#FFFAF5',
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
    marginBottom: 20,
  },
});

export default LessonPlanNotes;
