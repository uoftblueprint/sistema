import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import ExpandedCard from './ExpandedCard';
import { STACK_SCREENS } from './constants';

const Stack = createStackNavigator();

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
