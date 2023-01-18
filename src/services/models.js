/**
 * Access token infomation from getOAuthToken
 * @property {string} token Access token to use in Drive API requests
 * @property {number} expiryTime Local time in seconds at which token expires
 * @property {string} [type=Bearer] Default token type is always 'Bearer'
 */
export class AccessToken {
  constructor(access_token, expires_in, token_type = 'Bearer') {
    this.token = access_token;
    this.expiryTime = expires_in;
    this.type = token_type;
  }
}
