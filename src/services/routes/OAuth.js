import axios from 'axios';
import axiosRetry from 'axios-retry';
import { AccessToken } from '../models';
import { OAUTH_API_URL } from '../config.json';

const uninterceptedAxiosClient = axios.create(); // Bypass interceptor that checks for valid token
axiosRetry(uninterceptedAxiosClient, { retries: 3 });

/**
 * Get a Drive API access token. Token expires in an hour.
 * @param {string} jwt Signed JSON web token
 * @param {number} iat Issued at time in seconds
 * @returns Access token entity (default empty token if error occurs)
 */
async function getOAuthToken(jwt, iat) {
  return uninterceptedAxiosClient
    .post(OAUTH_API_URL, {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${jwt}`
    })
    .then(response => {
      const data = response.data;
      return new AccessToken(
        data.access_token,
        new Date((iat + parseInt(data.expires_in)) * 1000),
        data.token_type
      );
    })
    .catch(() => {
      console.error("getOAuthToken");
      return new AccessToken("this is not right"); // Empty token
    });
}

export default getOAuthToken;

