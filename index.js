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
import { AccessToken } from './src/services/models';

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
    // If 4xx client error, purposefully set an invalid token to trigger token refresh on next request
    if (error?.response?.status >= 400  && error?.response?.status < 500) {
      console.warn("Reseting token to refresh on next HTTP request due to 4xx client error.");
      invalidToken = new AccessToken(); // default has automatically invalid expiry time
      store.dispatch(setNewToken(invalidToken)); // set invalid token to redux (isTokenValid checks redux)
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    printAxiosError(error);
    return Promise.reject(error);
  },
);

AppRegistry.registerComponent(appName, () => App);
