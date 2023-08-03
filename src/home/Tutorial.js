import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import SistemaLogo from '../../assets/SistemaLogoLoading.svg';

const Tutorial = () => {
  const { width, height } = Dimensions.get('window');

  const tutorialSlides = [
    {
      header: 'Welcome to Sistema Toronto LEARN',
      body: "LEARN (Lessons, Exemplars, Activities, Resources, and Notes) is an all-in-one lesson planner tool that simplifies your teaching process with our very own curriculum materials!",
      imagePath: '', 
    },
    {
      header: 'View the latest activities',
      body: "In the home tab, you'll find the most recently uploaded Sistema Toronto Curriculum Activities. If you tap on the card, you can expand it to read the full activity!",
      imagePath: '',
    },
    {
      header: 'Create personalized lesson plans',
      body: `In the editor tab, quickly build lessons for the day. Tap on "Add Content" to write your own notes, insert links, upload images, or add a few Sistema Curriculum Activities!`,
      imagePath: '',
    },
    {
      header: 'Edit and delete lesson modules',
      body: "After you've added a module, a short press on it allows you to edit or delete. A long press on the module will allow you to drag it up and down the list!",
      imagePath: '',
    },
    {
      header: '',
      body: `Press the “Add activity cards” button to browse Sistema Toronto’s activity library. You can filter by various tags, or you can search for an activity by keyword.`,
      imagePath: '',
    },
    {
      header: 'Save and share your custom plans',
      body: 'In the library tab, access all your past lesson plans, and favourite your most important ones. You can also export your lesson plans as PDFs to share with other Sistema Toronto Teaching Artists!',
      imagePath: '',
    }
  ]

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
      >
        <View style={{ width, height }}>
          <Image>

          </Image>
          <Text>Screen 1</Text>
        </View>
        <View style={{ width, height }}>
          <Image>

          </Image>
          <Text>Screen 2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%', // full screen is filled with color
    flexDirection: 'column', // organize items vertically
    alignItems: 'center', // center items
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
  }
});

export default Tutorial;
