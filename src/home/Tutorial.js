import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Platform,
} from 'react-native';

import { TextStyle, AppColors } from '../Styles.config';

import Video from 'react-native-video';

import SquareEmpty from '../../assets/icons/squareEmpty.svg';
import SquareFilled from '../../assets/icons/squareFilled.svg';

import SistemaButton from '../Components/SistemaButton';

const Vid1 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial1.mp4')
    : require('../../assets/tutorial/android/Tutorial1.mp4');
const Vid2 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial2.mp4')
    : require('../../assets/tutorial/android/Tutorial2.mp4');
const Vid3 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial3.mp4')
    : require('../../assets/tutorial/android/Tutorial3.mp4');
const Vid4 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial4.mp4')
    : require('../../assets/tutorial/android/Tutorial4.mp4');
const Vid5 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial5.mp4')
    : require('../../assets/tutorial/android/Tutorial5.mp4');
const Vid6 =
  Platform.OS === 'ios'
    ? require('../../assets/tutorial/ios/Tutorial6.mp4')
    : require('../../assets/tutorial/android/Tutorial6.mp4');

const Tutorial = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const [pageIndex, setPageIndex] = useState(0);

  const tutorialSlides = [
    {
      header: 'Streamline your classes with LEARN!',
      body: 'LEARN (Lessons, Exemplars, Activities, Resources, and Notes) is an all-in-one lesson planner tool that simplifies your teaching process with our very own curriculum materials.',
      videoSource: Vid1,
    },
    {
      header: 'View the latest activities',
      body: "In the home tab, you'll find the most recently uploaded Sistema Toronto Curriculum Activities. If you tap on the card, you can expand it to read the full activity!",
      videoSource: Vid2,
    },
    {
      header: 'Create personalized lesson plans',
      body: `In the editor tab, quickly build lessons for the day. Tap on "Add Content" to write your own notes, insert links, upload images, or add a few Sistema Curriculum Activities!`,
      videoSource: Vid3,
    },
    {
      header: 'Access Sistema Curriculum Activities',
      body: `Press the “Add activity cards” button to browse Sistema Toronto’s activity library. You can filter by various tags, or you can search for an activity by keyword.`,
      videoSource: Vid4,
    },
    {
      header: 'Edit and delete lesson modules',
      body: "After you've added a module, a short press on it allows you to edit or delete. A long press on the module will allow you to drag it up and down the list!",
      videoSource: Vid5,
    },
    {
      header: 'Save and share your custom plans',
      body: 'In the library tab, access all your past lesson plans, and favourite your most important ones. You can also export your lesson plans as PDFs to share with other teachers!',
      videoSource: Vid6,
    },
  ];

  const endTutorial = () => {
    navigation.navigate('TabsNavigator', {
      screen: 'HomeNavigator',
    });
  };

  const setSliderPage = e => {
    const currentPage = pageIndex;
    const { x } = e.nativeEvent.contentOffset;
    const nextIndex = Math.round(x / width);

    if (nextIndex !== currentPage) {
      setPageIndex(nextIndex);
    }
  };

  const videoComponents = tutorialSlides.map(
    ({ header, body, videoSource }, index) => {
      return (
        <View style={{ width, height }} key={index}>
          <Video
            source={videoSource}
            paused={false}
            style={styles.videoStyle}
            repeat={true}
            resizeMode={'stretch'}
            playInBackground={true}
            disableFocus={true}
          />
          <View style={styles.textContainer}>
            <Text style={[TextStyle.h1, { marginBottom: 10 }]}>{header}</Text>
            <Text style={TextStyle.body}>{body}</Text>
          </View>
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
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          setSliderPage(event);
        }}>
        {videoComponents}
      </ScrollView>
      {pageIndex === 5 ? (
        <SistemaButton
          onPress={endTutorial}
          style={{ marginBottom: Platform.OS === 'ios' ? '10%' : '20%' }}
          color={'blue'}>
          <Text style={TextStyle.label}>Let's Go!</Text>
        </SistemaButton>
      ) : (
        <View style={styles.paginationContainer}>
          {[0, 1, 2, 3, 4, 5].map(num => {
            if (num === pageIndex) {
              return <SquareFilled style={styles.dotStyle} key={num} />;
            } else {
              return (
                <SquareEmpty
                  style={styles.dotStyle}
                  key={num}
                  fill={AppColors.background}
                />
              );
            }
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: AppColors.background,
    height: '100%', // full screen is filled with color
    flexDirection: 'column', // organize items vertically
    alignItems: 'center', // center items
    justifyContent: 'center',
    flex: 1,
  },
  videoStyle: {
    height: '50%',
    width: '50%',
    alignSelf: 'center',
    marginVertical: '10%',
    borderRadius: 25,
    borderWidth: 5,
  },
  textContainer: {
    marginHorizontal: '15%',
  },
  paginationContainer: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    marginBottom: Platform.OS === 'ios' ? '10%' : '20%',
  },
  dotStyle: {
    paddingHorizontal: 10,
  },
  slide: {
    flex: 1,
  },
});

export default Tutorial;
