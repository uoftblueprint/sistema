import axios from 'axios';
import { KJUR } from 'jsrsasign';
import { client_email, private_key, private_key_id } from './jwt.keys.json';
import { OAUTH_API_URL, ACCESS_TOKEN_SCOPE, OAUTH_HEADER } from '../config.json';
import getOAuthToken from '../routes/OAuth';

const refreshAccessToken = async () => {
  // Create header
  const header = {
    ...OAUTH_HEADER,
    kid: private_key_id
  };

  // Create payload
  const now = Math.floor(new Date().getTime() / 1000);     // Convert from ms to seconds
  const duration = 60 * 60;                                // Max token duration allowed (1hr)
  const expireTime = now + duration;
  const claimSet = {
    iss: client_email,
    iat: now,
    exp: expireTime,
    scope: ACCESS_TOKEN_SCOPE,
    aud: OAUTH_API_URL
  };

  // Sign JWT (JSON web token)
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(claimSet);
  const sJWT = KJUR.jws.JWS.sign(null, sHeader, sPayload, private_key);

  // Send request to get access token
  const accessToken = await getOAuthToken(sJWT, now);

  if (accessToken) {
    // Sets access token in auth headers in every axios request moving forward TODO: LOWKEY NOT SAFE... - Emily
    axios.defaults.headers.common.Authorization = `${accessToken.type} ${accessToken.token}`;
    return true; // Succeeded
  } else {
    return false; // Failed to set a new access token
  }
};

export default refreshAccessToken;
