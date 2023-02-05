import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanEditor from './screens/LessonPlanEditor';
import LessonPlanMenuOverlay from './screens/LessonPlanMenuOverlay';

const Stack = createStackNavigator();

const STACK_SCREENS = {
  LESSON_PLAN_EDITOR: 'Lesson Plan Editor Home',
  LESSON_PLAN_MENU_OVERLAY: 'Lesson_Plan_Editor_Menu'
};

const EditorNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.LESSON_PLAN_EDITOR}
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
        presentation: 'transparentModal'
      }}>
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_EDITOR}
        component={LessonPlanEditor}
      />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY}
        component={LessonPlanMenuOverlay}
        initialParams={{
          isLessonPlanEditor: false,
          lessonPlanName: 'Lesson Plan Name'
        }}
      />
    </Stack.Navigator>
  );
};

export default EditorNavigator;
