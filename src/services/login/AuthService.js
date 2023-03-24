import { KJUR } from 'jsrsasign';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Hex from 'crypto-js/enc-hex';
import CFB from 'crypto-js/mode-cfb';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import {
  OAUTH_API_URL,
  ACCESS_TOKEN_SCOPE,
  OAUTH_HEADER,
} from '../config.json';
import jwt_info from './jwt.keys.json';
import getOAuthToken from '../routes/OAuth';
import store from '../configureStore';

// TODO: delete later once final service account is generated and this function is manually used
const encryptSecret = testKey => {
  var encrypted2 = AES.encrypt(jwt_info[testKey], testKey, {
    iv: Hex.parse('00000000000000000000000000000000'),
    mode: CFB,
    padding: Pkcs7
  }).toString();
  console.log('Salt, ciphertext (OpenSSL format, Base64): ', encrypted2);

  var decrypted = AES.decrypt(encrypted2, testKey, {
    iv: Hex.parse('00000000000000000000000000000000'),
    mode: CFB,
    padding: Pkcs7
  }).toString(Utf8);
  console.log('Decrypted: ', decrypted);
};

/**
 * Decrypt secret using string representation of key itself to the value being obtained.
 * @param {string} key key in jwt.keys.json
 * @returns String or null if key is not found
 */
export const decryptSecret = key => {
  return jwt_info[key]
    ? AES.decrypt(jwt_info[key], key, {
        iv: Hex.parse('00000000000000000000000000000000'),
        mode: CFB,
        padding: Pkcs7
      }).toString(Utf8)
    : null;
};

/**
 * Get a new valid to access Drive API. 
 * @returns Access token entity
 */
export const refreshAccessToken = async () => {
  // Create header
  const header = {
    ...OAUTH_HEADER,
    kid: decryptSecret('private_key_id')
  };

  // Create payload
  const now = Math.floor(new Date().getTime() / 1000);    // Convert from ms to seconds
  const duration = 60 * 60;                               // Max token duration allowed (1hr)
  const expireTime = now + duration;
  const claimSet = {
    iss: decryptSecret('client_email'),
    iat: now,
    exp: expireTime,
    scope: ACCESS_TOKEN_SCOPE,
    aud: OAUTH_API_URL
  };

  // Sign JWT (JSON web token)
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(claimSet);
  const sJWT = KJUR.jws.JWS.sign(
    null,
    sHeader,
    sPayload,
    decryptSecret('private_key')
  );

  return await getOAuthToken(sJWT, now);                  // Send request to get access token
};

/**
 * Check if token in redux is valid or not for the next 5 minutes at least. 
 * If no token currently exists, will always return false because default expiry is smallest Date possible.
 * @returns True if token is still valid or false if token is expired (or will expire in 5mins) 
 */
export function isTokenValid() {
  const currTokenExpiry = store.getState().auth.driveToken.expiryTime;
  const inFiveMinutes = new Date( Date.now() + 1000 * (60 * 5) ) // 5 minutes converted to MS

  return currTokenExpiry > inFiveMinutes;
}

