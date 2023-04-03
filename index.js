/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import axios from 'axios';
import {
  isTokenValid,
  refreshAccessToken,
} from './src/services/login/AuthService';
import store from './src/services/configureStore';
import { setNewToken } from './src/services/login/authSlice';
import { printAxiosError } from './src/services/helpers';

// Add axios interceptor at root level to check and if needed, refresh, for valid token every time an HTTP request is made

/**
 * Axios request interceptor
 */
axios.interceptors.request.use(
  async config => {
    if (!isTokenValid()) {
      console.log('Refreshing access token...');
      const accessToken = await refreshAccessToken();
      store.dispatch(setNewToken(accessToken)); // Set newly obtained access token in redux
    }

    config.headers.Authorization = `${store.getState().auth.driveToken.type} ${
      store.getState().auth.driveToken.token
    }`;
    return config;
  },
  error => {
    printAxiosError(error);
    return Promise.reject(error);
  },
);

/**
 * Axios response interceptor
 */
axios.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response; // Do nothing
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    printAxiosError(error);
    return Promise.reject(error);
  },
);

AppRegistry.registerComponent(appName, () => App);
