import axios from 'axios';
import { AccessToken } from '../models';
import { OAUTH_API_URL } from '../config.json';
import { printAxiosError } from '../helpers';

/**
 * Get a Drive API access token. Token expires in an hour.
 * @param {string} jwt Signed JSON web token
 * @param {number} iat Issued at time in seconds
 * @returns JSON object of access token
 */
async function getOAuthToken(jwt, iat) {
  return axios
    .post(OAUTH_API_URL, {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${jwt}`
    })
    .then(response => {
      const data = response.data;
      return new AccessToken(
        data.access_token,
        iat + data.expires_in,
        data.token_type
      );
    })
    .catch(error => {
      printAxiosError(error);
      return null;
    });
}

export default getOAuthToken;