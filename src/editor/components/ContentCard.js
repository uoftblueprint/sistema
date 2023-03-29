import React from 'react';
import { SafeAreaView, Platform, StyleSheet, TextInput } from 'react-native';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import store from '../../services/configureStore';
import { ModuleType } from '../../services/constants';

const ContentCard = ({
  setisTextinputOpen,
  setSectionContent,
  sectionContent,
}) => {
  return (
    <SafeAreaView style={styles.ContentCardStyle}>
      <TextInput
        style={styles.text}
        placeholder={'Add Text'}
        multiline={true}
        onEndEditing={e => {
          if (e.nativeEvent.text) {
            setSectionContent([             // TODO: Update this store func
              ...sectionContent, 
              {
                type: ModuleType.text,
                content: e.nativeEvent.text
              },
            ]);
          }
          setisTextinputOpen(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  text: {
    color: '#000000',
  }
});

export default ContentCard;
