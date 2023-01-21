import React, {useState} from 'react';
import LessonPlanTextInput from './LessonPlanTextInput';
import { Text, View, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const LessonSection = ({ section, subtitle, setText }) => {
  const [clicked, setClicked] = useState(false)
  const isFocused = useIsFocused();

  const handleClick = () => {
    setClicked(true)
  }
  // const courseContent = [
  //   {
  //     section: section,
  //     content: text,
  //   }
  // ]
    
  const ContentCard = () => {
    return(
        clicked && <View style={styles.ContentCardStyle} >
          <TextInput multiline 
          placeholder={"Add text here"} 
          returnKeyType="search"
          onSubmitEditing={(e) => {setText(e.nativeEvent.text)}}
          />
    </View>
    )
  }
  
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.title}>{subtitle}</Text>
      <View>
        <ContentCard/>
        <LessonPlanTextInput placeholder={'Input text'} handleClick={handleClick}/>
        <LessonPlanTextInput placeholder={'Add activity cards'} />
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
    lineHeight: 28
  },
  sectionContainer: {
    fontFamily: 'Poppins-ExtraBold',
    marginBottom: 25
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
    paddingLeft: '3%'
  },
});

export default LessonSection;