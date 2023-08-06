import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View, Dimensions, Platform } from 'react-native';

import { TextStyle } from '../Styles.config';

import iOSVid1 from '../../assets/tutorial/iOS/Tutorial1.mp4';
import iOSVid2 from '../../assets/tutorial/iOS/Tutorial2.mp4';
import iOSVid3 from '../../assets/tutorial/iOS/Tutorial3.mp4';
import iOSVid4 from '../../assets/tutorial/iOS/Tutorial4.mp4';
import iOSVid5 from '../../assets/tutorial/iOS/Tutorial5.mp4';
import iOSVid6 from '../../assets/tutorial/iOS/Tutorial6.mp4';

import Video from 'react-native-video';


const Tutorial = () => {
  const { width, height } = Dimensions.get('window');

  // TODO: divide between ios and android videos

  const tutorialSlides = [
    {
      header: 'Welcome to Sistema Toronto LEARN!',
      body: "LEARN (Lessons, Exemplars, Activities, Resources, and Notes) is an all-in-one lesson planner tool that simplifies your teaching process with our very own curriculum materials!",
      videoSource: iOSVid1, 
    },
    {
      header: 'View the latest activities',
      body: "In the home tab, you'll find the most recently uploaded Sistema Toronto Curriculum Activities. If you tap on the card, you can expand it to read the full activity!",
      videoSource: iOSVid2,
    },
    {
      header: 'Create personalized lesson plans',
      body: `In the editor tab, quickly build lessons for the day. Tap on "Add Content" to write your own notes, insert links, upload images, or add a few Sistema Curriculum Activities!`,
      videoSource: iOSVid3,
    },
    {
      header: 'Access Sistema Curriculum Activities',
      body: `Press the “Add activity cards” button to browse Sistema Toronto’s activity library. You can filter by various tags, or you can search for an activity by keyword.`,
      videoSource: iOSVid4,
    },
    {
      header: 'Edit and delete lesson modules',
      body: "After you've added a module, a short press on it allows you to edit or delete. A long press on the module will allow you to drag it up and down the list!",
      videoSource: iOSVid5,
    },
    {
      header: 'Save and share your custom plans',
      body: 'In the library tab, access all your past lesson plans, and favourite your most important ones. You can also export your lesson plans as PDFs to share with other Sistema Toronto Teaching Artists!',
      videoSource: iOSVid6,
    }
  ]

  let index = 0;

  const videoComponents = () => tutorialSlides.map(
    ({ header, body, videoSource }) => {
      index += 1;
      return (
        <View style={{ width, height }}>
            <Video 
              source={videoSource}   // Can be a URL or a local file.
              paused={false}
              style={styles.backgroundVideo}
              repeat={true} 
            />
            <Text style={TextStyle.h1}>{header}</Text>
            <Text style={TextStyle.body}>{body}</Text>
        </View>
      );
    },
  );

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
      >
        {videoComponents}
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  slide: {
    flex: 1,
  }
});

export default Tutorial;
