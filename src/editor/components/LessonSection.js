import React, { useState } from 'react';
import AddLessonContentButton from './AddLessonContentButton';
import { Text, View, SafeAreaView, Platform, StyleSheet } from 'react-native';
import store from '../../services/configureStore';
import { TextStyle } from '../../Styles.config';
import ContentCard from './ContentCard';
import StoredContent from './StoredContent';
import ChosenActivityCard from './ChosenActivityCard';

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
    <SafeAreaView style={styles.mainContainer}>
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
        <ChosenActivityCard navigation={ navigation }/>
        {/* Stack of content already inserted, available for further editing/removing */}
        {/* arr is [{type: "text", content: "textcontent / path"}, {type: "text", content: "path"}, where type: "text" or "activityCard" */}
        {store.getState(sectionType).lessonPlan[sectionType].map((arr, i) => {
          if (arr.type === "text" && arr.content.length > 0) {
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
          else if (arr.type === "activity" && arr.content.length > 0) {
            let cardName = arr.name;
            let cardPath = arr.content;
            return (
              <View key={cardName}>
                <ChosenActivityCard name={cardName} path={cardPath}/>
              </View>
            )
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
  mainContainer: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 20,
  },
});

export default LessonSection;
