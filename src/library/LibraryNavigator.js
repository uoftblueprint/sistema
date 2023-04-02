import { createStackNavigator } from '@react-navigation/stack';
import LessonPlanMenuOverlay from '../Components/LessonPlanMenuOverlay';
import Library from './Library';
import { STACK_SCREENS } from './constants';
import LessonPlanEditorV2 from '../editor/screens/LessonPlanEditorV2';
import LessonPlanSortingMenu from './LessonPlanSortingMenu';

const Stack = createStackNavigator();

const LibraryNavigator = () => {
  return (
    <Stack.Navigator
      intialRouteName={STACK_SCREENS.LIBRARY}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={STACK_SCREENS.LIBRARY}
        component={Library}
        initialParams={{
          sortT: 0,
        }}
      />
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
        name={STACK_SCREENS.LESSON_PLAN_SORTING_MENU}
        component={LessonPlanSortingMenu}
        options={{
          presentation: 'transparentModal',
        }}
      />
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
