import React, { useState } from 'react';
import AddLessonContentButton from './AddLessonContentButton';
import { Text, View, SafeAreaView, Platform, StyleSheet } from 'react-native';
import store from '../../services/configureStore';
import { TextStyle } from '../../Styles.config';
import ContentCard from './ContentCard';
import StoredContent from './StoredContent';

const LessonSection = ({ sectionType, subtitle, navigation }) => {
  const [sectionContent, setSectionContent] = useState([]);
  const [sectionActivityCards, setSectionActivityCards] = useState([]);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);

  const handleClick = () => {
    setisTextinputOpen(true);
  };

  const addActivityCard = () => {
    navigation.navigate('Add Activity Card', {
      header: subtitle,
    });
  };

  return (
    <SafeAreaView>
      <Text style={[styles.title, TextStyle.h2]}>{subtitle}</Text>
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
        <AddLessonContentButton
          placeholder={'Add activity cards'}
          handleClick={addActivityCard}
        />

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default LessonSection;
