import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanMenuOverlay from '../Components/LessonPlanMenuOverlay';
import Library from './Library';
import { STACK_SCREENS } from './constants';
import LessonPlanEditorV2 from '../editor/screens/LessonPlanEditorV2';

const Stack = createStackNavigator();

const LibraryNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.LIBRARY}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={STACK_SCREENS.LIBRARY} component={Library} />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_MENU_OVERLAY}
        component={LessonPlanMenuOverlay}
        options={{
          presentation: 'transparentModal',
        }}
        initialParams={{
          isLessonPlanEditor: false,
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.LESSON_PLAN_EDITOR_V2}
        component={LessonPlanEditorV2}
      />
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
