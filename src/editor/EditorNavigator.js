import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanEditor from './screens/LessonPlanEditor';
import AddActivityCard from './screens/AddActivityCard';

const Stack = createStackNavigator();

const STACK_SCREENS = {
  LESSON_PLAN_EDITOR: 'Lesson Plan Editor Home',
  ADD_ACTIVITY_CARD: 'Add Activity Card'
};

const EditorNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.LESSON_PLAN_EDITOR}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={STACK_SCREENS.ADD_ACTIVITY_CARD}
        component={AddActivityCard}
      />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_EDITOR}
        component={LessonPlanEditor}
      />
    </Stack.Navigator>
  );
};

export default EditorNavigator;
