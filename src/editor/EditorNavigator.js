import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanEditor from './screens/LessonPlanEditor';
import TestScreen from './screens/TestScreen';      // TODO: revert everything back to master to stop testing draggable
import AddActivityCard from './screens/AddActivityCard';
import LessonPlanMenuOverlay from '../Components/LessonPlanMenuOverlay';

const Stack = createStackNavigator();

const STACK_SCREENS = {
  LESSON_PLAN_EDITOR: 'Lesson Plan Editor Home',
  ADD_ACTIVITY_CARD: 'Add Activity Card',
  LESSON_PLAN_MENU_OVERLAY: 'Lesson_Plan_Editor_Menu',
  TEST: 'test'
};

const EditorNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.TEST}
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
      }}>
      <Stack.Screen
        name={STACK_SCREENS.TEST}
        component={TestScreen}
      />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_EDITOR}
        component={LessonPlanEditor}
      />
      <Stack.Screen
        name={STACK_SCREENS.ADD_ACTIVITY_CARD}
        component={AddActivityCard}
      />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY}
        component={LessonPlanMenuOverlay}
        options={{
          presentation: 'transparentModal',
        }}
        initialParams={{
          isLessonPlanEditor: false,
          lessonPlanName: 'Lesson Plan Name',
        }}
      />
    </Stack.Navigator>
  );
};

export default EditorNavigator;
