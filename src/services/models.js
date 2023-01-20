/**
 * Access token infomation from getOAuthToken
 * @property {string} token Access token to use in Drive API requests
 * @property {number} expiryTime Local time in seconds at which token expires. Default is min date. 
 * @property {string} [type=Bearer] Default token type is always 'Bearer'
 */
export class AccessToken {
  constructor(
    access_token = '', 
    expires_in = new Date(-8640000000000000), // min date allowed (Tue, 20 Apr -271821 00:00:00 GMT)
    token_type = 'Bearer'
  )
  {
    this.token = access_token;
    this.expiryTime = expires_in;
    this.type = token_type;
  }
}
