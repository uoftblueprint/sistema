import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/home/Home';
import EditorNavigator from './src/editor/EditorNavigator';
import Library from './src/library/Library';

import LibraryNavIcon from './assets/LibraryNavIcon.svg';
import HomeNavIcon from './assets/HomeNavIcon.svg';
import LessonPlanEditorNavIcon from './assets/LessonPlanEditorNavIcon.svg';

const STACK_SCREENS = {
  HOME: 'HomePage',
  EDITOR: 'LessonPlanEditor',
  LIBRARY: 'Library'
};

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Tab.Navigator
        initialRouteName={STACK_SCREENS.HOME}
        screenOptions={{
          tabBarActiveBackgroundColor: '#B8CFE4',
          tabBarInactiveBackgroundColor: '#B8CFE4'
        }}>
        <Tab.Screen
          name={STACK_SCREENS.HOME}
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <HomeNavIcon
                width={32}
                height={32}
                color={focused ? '#685777' : 'black'}
              />
            )
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.EDITOR}
          component={EditorNavigator}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <LessonPlanEditorNavIcon
                width={32}
                height={32}
                color={focused ? '#685777' : 'black'}
              />
            )
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.LIBRARY}
          component={Library}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => (
              <LibraryNavIcon
                width={32}
                height={32}
                color={focused ? '#685777' : 'black'}
              />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <MainNavigator />;
};

export default App;
