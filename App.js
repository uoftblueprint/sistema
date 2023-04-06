import './src/services/ignoreWarnings'; // Keep at top
import React from 'react'; 
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useSafeAreaInsets,
  SafeAreaProvider
} from 'react-native-safe-area-context';
import HomeNavigator from './src/home/HomeNavigator';
import EditorNavigator from './src/editor/EditorNavigator';
import LibraryNavigator from './src/library/LibraryNavigator';
import SettingsNavigator from './src/settings/SettingsNavigator';
import { STACK_SCREENS as SETTINGS_STACK } from './src/settings/constants';
import { STACK_SCREENS as LIBRARY_STACK } from './src/library/constants';
import { STACK_SCREENS as EDITOR_STACK } from './src/editor/constants';

import { Provider } from 'react-redux';
import configureStore from './src/services/configureStore';

import LibraryNavIcon from './assets/libraryNavIcon.svg';
import HomeNavIcon from './assets/homeNavIcon.svg';
import LessonPlanEditorNavIcon from './assets/lessonPlanEditorNavIcon.svg';

const STACK_SCREENS = {
  HOME: 'HomeNavigator',
  EDITOR: EDITOR_STACK.NAVIGATOR,
  LIBRARY: LIBRARY_STACK.NAVIGATOR,
  SETTINGS: SETTINGS_STACK.NAVIGATOR
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
            { backgroundColor: isFocused ? tabColor : '#B8CFE4' }
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
          headerShown: false
        }}>
        <Tab.Screen
          name={STACK_SCREENS.HOME}
          component={HomeNavigator}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => tabIcon(HomeNavIcon, focused)
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.EDITOR}
          component={EditorNavigator}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => tabIcon(LessonPlanEditorNavIcon, focused),
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.LIBRARY}
          component={LibraryNavigator}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => tabIcon(LibraryNavIcon, focused)
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.SETTINGS}
          component={SettingsNavigator}
          options={{
            tabBarShowLabel: false,
            tabBarButton: () => null, // Not displayed in bottom tab bar
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  underline: {
    width: 50,
    height: 2
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={configureStore}>
        <MainNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
