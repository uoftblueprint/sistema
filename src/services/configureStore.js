import { configureStore } from '@reduxjs/toolkit';

import authReducer from './login/authSlice';
import lessonPlanReducer from './editor/lessonPlanSlice';
import recentActivityCardsReducer from './editor/recentActivityCardsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    lessonPlan: lessonPlanReducer,
    recentActivityCards: recentActivityCardsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setNewToken'],
        ignoredActionPaths: ['auth.driveToken'],
        ignoredPaths: ['auth.driveToken'],
      },
    }),
});
