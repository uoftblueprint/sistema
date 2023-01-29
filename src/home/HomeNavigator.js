// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './Home';
// import SistemaOverlay from '../Components/SistemaOverlay';

// const Stack = createStackNavigator();

// const STACK_SCREENS = {
//   HOME_SCREEN: 'Home_Screen',
//   HOME_OVERLAY: 'Home_Overlay'
// };

// const HomeNavigator = () => {
//   return (
//     <Stack.Navigator
//       detachInactiveScreens={false}
//       screenOptions={{
//         headerShown: false,
//         detachPreviousScreen: false,
//         presentation: 'transparentModal'
//       }}>
//       <Stack.Screen name={STACK_SCREENS.HOME_SCREEN} component={Home} />
//       <Stack.Screen
//         name={STACK_SCREENS.HOME_OVERLAY}
//         component={SistemaOverlay}
//       />
//     </Stack.Navigator>
//   );
// };

// export default HomeNavigator;
