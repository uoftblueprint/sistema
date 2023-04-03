import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddLessonContentButton from './AddLessonContentButton';
import { Text, View, SafeAreaView, Platform, StyleSheet } from 'react-native';
import store from '../../services/configureStore';
import ContentCard from './ContentCard';
import StoredContent from './StoredContent';
import ChosenActivityCard from './ChosenActivityCard';

const LessonSection = ({ sectionType, subtitle, navigation }) => {
  const lessonPlanState = useSelector(state => state.lessonPlan);
  const [sectionContent, setSectionContent] = useState([]);
  const [sectionActivityCards, setSectionActivityCards] = useState([]);
  const [isTextinputOpen, setisTextinputOpen] = useState(false);
  const handleClick = () => {
    setisTextinputOpen(true);
  };
  const addActivityCard = () => {
    navigation.navigate('Add Activity Card', {
      header: subtitle,
      sectionType: sectionType,
    });
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>{subtitle}</Text>
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
        <ChosenActivityCard navigation={navigation} />
        {/* Stack of content already inserted, available for further editing/removing */}
        {lessonPlanState[sectionType].map((arr, i) => {
          if (arr?.content?.length > 0) {
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
          } else if (arr.type === 'activity' && arr.content?.length > 0) {
            let cardName = arr.name;
            let cardPath = arr.content;
            return (
              <View key={cardName}>
                <ChosenActivityCard name={cardName} path={cardPath} />
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
    color: '#20232a',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28,
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
});

export default LessonSection;
