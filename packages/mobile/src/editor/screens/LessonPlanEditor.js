import React from 'react';
import LessonPlanHeader from '../../components/LessonPlanHeader.js';
import { SafeAreaView, Text, View } from 'react-native';

const LessonPlanEditor = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFAF5' }}>
        <View style={{ flex: 1 }}>
            <LessonPlanHeader />
          </View>
      <Text>HELLO</Text>
    </View>
  );
};

export default LessonPlanEditor;
