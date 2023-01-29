import React, { useState} from 'react';
import LessonPlanTextInput from './LessonPlanTextInput';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import {useDispatch } from 'react-redux';
import { addToSection, removeFromSection } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';


const LessonSection = ({ sectionType, subtitle }) => {

  const [sectionContent, setSectionContent] = useState([]);
    // const sectionContent = [
  //   {
  //     section: "warmup",
  //     content: "warmup content",
  //   }
  // ]
  const [sectionActivityCards,
    setSectionActivityCards] = useState([]);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setClicked(true);
  };

  const ContentCard = () => {
    return (
      clicked && (
        <View style={styles.ContentCardStyle}>
          <TextInput
            multiline
            placeholder={'Add Text'}
            returnKeyType="next"
            onSubmitEditing={e => {
              if (e.nativeEvent.text) {
                setSectionContent([...sectionContent, e.nativeEvent.text]);
                store.dispatch(addToSection({type: "text", section: sectionType, content: e.nativeEvent.text}))
              }
              setClicked(false);
            }}
          />
        </View>
      )
    );
  };

  const StoredContent = ({ text, index }) => {
    const [newText, setnewText] = useState(text);
    return (
      <View style={styles.ContentCardStyle}>
        <TextInput
          multiline
          defaultValue={text}
          onChangeText={txt => setnewText(txt)}
          returnKeyType="submit"
          onSubmitEditing={e => {
            //if (!e.nativeEvent.text) {
            setSectionContent(state => {
              newContent = [...state];
              //delete the content from section content state when empty
              newContent = newContent.filter((_, i) => i != index);
              store.dispatch(removeFromSection({ type: "text", section: sectionType, content: text }))
              // if the content isn't empty, add the edited content to store and newContent
              if (e.nativeEvent.text) {
                newContent[index] = e.nativeEvent.text;
                store.dispatch(addToSection({ type: "text", section: sectionType, content: e.nativeEvent.text }))
              }
              return newContent;
            });
            }
          }
        />
      </View>
    );
  };

  return (
      <SafeAreaView style={styles.sectionContainer}>
        <Text style={styles.title}>{subtitle}</Text>
        <View>
          <ContentCard />
          <LessonPlanTextInput
            placeholder={'Input text'}
            handleClick={handleClick}
          />
          <LessonPlanTextInput placeholder={'Add activity cards'} />
          {sectionContent.map((c, i) => {
            if (c) {
              return (
                <View key={i}>
                  <StoredContent text={c} index={i} />
                </View>
              );
            }
          })}
        </View>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28,
  },
  sectionContainer: {
    fontFamily: 'Poppins-ExtraBold',
    marginBottom: 25,
  },
  ContentCardStyle: {
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFAF5',
    height: 80,
    width: 333,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 7.69,
    shadowColor: '#453E3D',
    elevation: 7,
    marginVertical: 10,
    paddingLeft: '3%',
  }
});

export default LessonSection;
