import { configureStore } from '@reduxjs/toolkit';
import authReducer from './login/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer
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
