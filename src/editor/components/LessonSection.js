import React from 'react';
import LessonPlanTextInput from './LessonPlanTextInput';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LessonSection = ({ subtitle, navigation }) => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text style={styles.title}>{subtitle}</Text>
      <View>
        <LessonPlanTextInput placeholder={'Input text'} />
        <TouchableOpacity onPress={() => navigation.navigate('Add Activity Card', {
          header: subtitle
        })}>
          <LessonPlanTextInput placeholder={'Add activity cards'} isButton={true} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
    letterSpacing: 0.3,
    marginBottom: 10,
    lineHeight: 28
  },
  sectionContainer: {
    marginBottom: 25
  }
});

export default LessonSection;
