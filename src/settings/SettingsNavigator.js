import { createStackNavigator } from '@react-navigation/stack';
import { STACK_SCREENS } from './constants';
import Settings from './screens/Settings';
import TemplatePolicy from './screens/TemplatePolicy';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.SETTINGS_MAIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={STACK_SCREENS.SETTINGS_MAIN} component={Settings} />
      <Stack.Screen name={STACK_SCREENS.TEMPLATE_INFO_PAGE} component={TemplatePolicy} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
