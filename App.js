import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Home from './src/home/Home';
import EditorNavigator from './src/editor/EditorNavigator';
import Library from './src/library/Library';

import LibraryNavIcon from './assets/LibraryNavIcon.svg';
import HomeNavIcon from './assets/HomeNavIcon.svg';
import LessonPlanEditorNavIcon from './assets/LessonPlanEditorNavIcon.svg';

const STACK_SCREENS = {
  HOME: 'HomePage',
  EDITOR: 'LessonPlanEditor',
  LIBRARY: 'Library',
};

const tabIcon = (iconSVG, isFocused) => {
  const tabColor = isFocused ? '#685777' : '#000000';
  const icon = React.createElement(iconSVG, {
    width: 32,
    height: 32,
    marginBottom: 5,
    color: tabColor
  });

  return (
    <View style={styles.container}>
      {icon}
      {
        <View
          style={[
            styles.underline,
            { backgroundColor: isFocused ? tabColor : '#B8CFE4' },
          ]}
        />
      }
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Tab.Navigator
        initialRouteName={STACK_SCREENS.HOME}
        screenOptions={{
          tabBarActiveBackgroundColor: '#B8CFE4',
          tabBarInactiveBackgroundColor: '#B8CFE4',
          tabBarStyle: {
            height: 60 + insets.bottom,
            backgroundColor: '#B8CFE4'
          },
        }}>
        <Tab.Screen
          name={STACK_SCREENS.HOME}
          component={Home}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => tabIcon(HomeNavIcon, focused),
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.EDITOR}
          component={EditorNavigator}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) =>
              tabIcon(LessonPlanEditorNavIcon, focused)
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.LIBRARY}
          component={Library}
          options={{
            tabBarShowLabel: false,
            headerShown: true,
            tabBarIcon: ({ focused }) => tabIcon(LibraryNavIcon, focused),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  underline: {
    width: 50,
    height: 2,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 17,
  }
});

const App = () => {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
};

export default App;
