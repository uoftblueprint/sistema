import { configureStore } from '@reduxjs/toolkit';


import authReducer from './login/authSlice';
import lessonPlanReducer from './editor/lessonPlanSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    lessonPlan: lessonPlanReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setNewToken'],
        ignoredActionPaths: ['auth.driveToken'],
        ignoredPaths: ['auth.driveToken']
      }
    })
});