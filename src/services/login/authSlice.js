import { createSlice } from '@reduxjs/toolkit';
import { AccessToken } from '../models';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    driveToken: new AccessToken()
  },
  reducers: {
    setNewToken: (state, action) => {
      // action.payload is an AccessToken object
      return {
        ...state, // Because redux uses immuitable logic, we have to "copy" the original state first
        driveToken: action.payload // Then replace with new token
      };
    }
  }
});

// Dispatch actions to "write" to redux
export const { setNewToken } = authSlice.actions;

export default authSlice.reducer;
