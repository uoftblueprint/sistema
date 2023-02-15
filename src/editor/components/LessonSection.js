<<<<<<< HEAD
import React, { useState } from 'react';
import AddLessonContentButton from './AddLessonContentButton';
import { Text, View, SafeAreaView, Platform, StyleSheet } from 'react-native';
import store from '../../services/configureStore';
import ContentCard from './ContentCard';
import StoredContent from './StoredContent';

const LessonSection = ({ sectionType, subtitle }) => {
  const [sectionContent, setSectionContent] = useState([]);
  const [sectionActivityCards, setSectionActivityCards] = useState([]);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);
  const handleClick = () => {
    setisTextinputOpen(true);
  };

=======
import React from 'react';
import LessonPlanTextInput from './LessonPlanTextInput';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LessonSection = ({ subtitle, navigation }) => {
>>>>>>> master
  return (
    <SafeAreaView>
      <Text style={styles.title}>{subtitle}</Text>
<<<<<<< HEAD
      <View style={styles.sectionContainer}>
        {/* New textbox with prompted to insert text */}
        {isTextinputOpen && (
          <ContentCard
            setisTextinputOpen={setisTextinputOpen}
            setSectionContent={setSectionContent}
            sectionContent={sectionContent}
            sectionType={sectionType}
          />
        )}

        <AddLessonContentButton
          placeholder={'Input text'}
          handleClick={handleClick}
        />
        <AddLessonContentButton placeholder={'Add activity cards'} />

        {/* Stack of content already inserted, available for further editing/removing */}
        {store.getState(sectionType).lessonPlan[sectionType].map((arr, i) => {
          if (arr.content.length > 0) {
            return (
              <View key={i}>
                <StoredContent
                  text={arr.content}
                  index={i}
                  setSectionContent={setSectionContent}
                  sectionType={sectionType}
                />
              </View>
            );
          }
        })}
=======
      <View>
        <LessonPlanTextInput placeholder={'Input text'} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Add Activity Card', {
              header: subtitle
            })
          }>
          <LessonPlanTextInput
            placeholder={'Add activity cards'}
            isButton={true}
          />
        </TouchableOpacity>
>>>>>>> master
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
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28
  },
  sectionContainer: {
    marginBottom: 20,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
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

export default LessonSection;
