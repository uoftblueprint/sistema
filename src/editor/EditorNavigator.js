import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanEditorV2 from './screens/LessonPlanEditorV2';
import AddActivityCard from './screens/AddActivityCard';
import ExpandedCard from '../home/ExpandedCard';
import LessonPlanMenuOverlay from '../Components/LessonPlanMenuOverlay';
import { STACK_SCREENS } from './constants';

const Stack = createStackNavigator();

const EditorNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.LESSON_PLAN_EDITOR_V2}
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: false,
      }}>
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_EDITOR_V2}
        component={LessonPlanEditorV2}
      />
      <Stack.Screen
        name={STACK_SCREENS.ADD_ACTIVITY_CARD}
        component={AddActivityCard}
      />
      <Stack.Screen
        name={STACK_SCREENS.EXPANDED_CARD}
        component={ExpandedCard}
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
