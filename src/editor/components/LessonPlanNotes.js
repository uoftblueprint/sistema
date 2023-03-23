import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import { addToNote, removeNote } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';
import { TextStyle } from '../../Styles.config';

const LessonPlanNotes = ({ sectionType, subtitle, placeholder }) => {
  const [sectionContent, setSectionContent] = useState(placeholder);

  return (
    <SafeAreaView>
      <Text style={[styles.title, TextStyle.h2]}>{subtitle}</Text>
      <SafeAreaView style={styles.SectionStyle}>
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
      </SafeAreaView>
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
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 0,
      },
      default: {
        ios: {
          paddingVertical: 3,
        },
      },
    }),
    fontStyle: 'italic',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    flexDirection: 'column',
    backgroundColor: '#FFFAF5',
    height: 112,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 7.69,
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
