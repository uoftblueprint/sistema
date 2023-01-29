import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToNote } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';

const LessonPlanNotes = ({ sectionType, subtitle }) => {
  const [sectionContent, setSectionContent] = useState();
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text style={styles.title}>{subtitle}</Text>
      <SafeAreaView style={styles.SectionStyle}>
        <TextInput
          multiline
          placeholder={'Add lesson notes here'}
          defaultValue={sectionContent}
          returnKeyType="next"
          onSubmitEditing={e => {
            if (e.nativeEvent.text) {
              setSectionContent(e.nativeEvent.text);
              store.dispatch(
                addToNote({ section: sectionType, content: e.nativeEvent.text })
              );
            }
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28,
    fontFamily: 'Poppins-Bold',
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
        }
      }
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
