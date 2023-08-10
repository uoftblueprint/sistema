import './src/services/ignoreWarnings'; // Keep at top
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import HomeNavigator from './src/home/HomeNavigator';
import EditorNavigator from './src/editor/EditorNavigator';
import LibraryNavigator from './src/library/LibraryNavigator';
import SettingsNavigator from './src/settings/SettingsNavigator';
import { STACK_SCREENS as SETTINGS_STACK } from './src/settings/constants';
import { STACK_SCREENS as LIBRARY_STACK } from './src/library/constants';
import { STACK_SCREENS as EDITOR_STACK } from './src/editor/constants';
import Loading from './src/home/Loading';
import Tutorial from './src/home/Tutorial';
import Welcome from './src/home/Welcome';

import { Provider } from 'react-redux';
import configureStore from './src/services/configureStore';

import LibraryNavIcon from './assets/icons/libraryNavIcon.svg';
import HomeNavIcon from './assets/icons/homeNavIcon.svg';
import LessonPlanEditorNavIcon from './assets/icons/lessonPlanEditorNavIcon.svg';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ActivityCardService from './src/services/ActivityCardService';
import LessonPlanService from './src/services/LessonPlanService';
import { AppColors } from './src/Styles.config';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 3, // 3 minute stale time
      cacheTime: 1000 * 60 * 60 * 12, // 12 hour cache
    },
  },
});

const STACK_SCREENS = {
  TABS: 'TabsNavigator',
  HOME: 'HomeNavigator',
  TUTORIAL: 'Tutorial',
  WELCOME: 'Welcome',
  EDITOR: EDITOR_STACK.NAVIGATOR,
  LIBRARY: LIBRARY_STACK.NAVIGATOR,
  SETTINGS: SETTINGS_STACK.NAVIGATOR
};

const tabIcon = (iconSVG, isFocused) => {
  const tabColor = isFocused ? AppColors.tertiary : '#000000';
  const icon = React.createElement(iconSVG, {
    width: 32,
    height: 32,
    marginBottom: 5,
    color: tabColor,
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

const TabsNavigator = () => {
  const insets = useSafeAreaInsets();

  return  (
    <Tab.Navigator
        initialRouteName={STACK_SCREENS.HOME}
        screenOptions={{
          tabBarActiveBackgroundColor: '#B8CFE4',
          tabBarInactiveBackgroundColor: '#B8CFE4',
          tabBarStyle: {
            height: 60 + insets.bottom,
            backgroundColor: '#B8CFE4',
          },
          headerShown: false,
        }}>
        <Tab.Screen
          name={STACK_SCREENS.HOME}
          component={HomeNavigator}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ focused }) => tabIcon(HomeNavIcon, focused),
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
            tabBarIcon: ({ focused }) => tabIcon(LibraryNavIcon, focused),
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
  )
}

const Stack = createStackNavigator();

const MainNavigator = ({displayTutorial}) => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Stack.Navigator
        initialRouteName={displayTutorial ? STACK_SCREENS.WELCOME : STACK_SCREENS.TABS}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
            name={STACK_SCREENS.WELCOME}
            component={Welcome}
          />
        <Stack.Screen
            name={STACK_SCREENS.TUTORIAL}
            component={Tutorial}
          />
        <Stack.Screen 
          name={STACK_SCREENS.TABS} 
          component={TabsNavigator} 
        />
      </Stack.Navigator>
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
  },
});

const App = () => {
  // State variables for displaying onboarding screens
  const [shouldDisplayTutorial, setShouldDisplayTutorial] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const welcomeSetup = async () => {
    LessonPlanService.isUserOnboarded().then((res) => {
      setShouldDisplayTutorial(!res);
    }).then(() => {
      queryClient.prefetchQuery({
        queryKey: ['activityCards'],
        queryFn: ActivityCardService.getAllActivityCards,
      });
    }).finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    welcomeSetup();
  }, []);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={configureStore}>
          {isLoading 
            ? <Loading /> 
            : <MainNavigator displayTutorial={shouldDisplayTutorial} />
          }
        </Provider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
