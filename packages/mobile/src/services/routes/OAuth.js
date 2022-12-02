import axios from 'axios';
import { AccessToken } from '../models';

/**
 * Get a Drive API access token. Token expires in an hour. 
 * @param {string} jwt Signed JSON web token
 * @param {number} iat Issued at time in seconds
 * @returns JSON object of access token
 */
async function getOAuthToken(jwt, iat) {
  return axios.post('https://oauth2.googleapis.com/token', {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: `${jwt}`
  })
  .then((response) => {
    const data = response.data;
    return new AccessToken(data.access_token, iat + data.expires_in, data.token_type);
  })
  .catch((error) => {
    if (error.response) {
      console.error(`STATUS ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('NO RESPONSE', error.request);
    } else {
      console.error('UNKNOWN ERROR', error.message);
    }
    console.log('Full error log:', error.toJSON());
    return null;
  });
}

export default getOAuthToken;