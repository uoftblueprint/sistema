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
import HomeIcon from './assets/HomeIcon.js';


const STACK_SCREENS = {
  HOME: 'HomePage',
  EDITOR: 'LessonPlanEditor',
  LIBRARY: 'Library'
}

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <Tab.Navigator initialRouteName={STACK_SCREENS.HOME}>
        <Tab.Screen
          name={STACK_SCREENS.HOME}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <HomeIcon {...props} />
            ),
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.EDITOR}
          component={EditorNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={STACK_SCREENS.LIBRARY}
          component={Library}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return <MainNavigator />;
};

export default App;
