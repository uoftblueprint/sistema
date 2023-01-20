
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import ExpandedCard from './ExpandedCard';

const Stack = createStackNavigator();

const STACK_SCREENS = {
  HOME_SCREEN: 'HomePage',
  EXPANDED_CARD: 'CardView'
};

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.HOME_SCREEN}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={STACK_SCREENS.HOME_SCREEN} component={Home} />
      <Stack.Screen
        name={STACK_SCREENS.EXPANDED_CARD}
        component={ExpandedCard}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;