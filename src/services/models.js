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
    token_type = 'Bearer',
  ) {
    this.token = access_token;
    this.expiryTime = expires_in;
    this.type = token_type;
  }
}

/**
 * @property {string} name Name of the lesson plan
 * @property {Module[]} warmUp warmUp module of the lesson
 * @property {Module[]} mainLesson mainLesson module of the lesson
 * @property {Module[]} coolDown coolDown module of the lesson
 * @property {string} notes notes, containing strings
 */
export class LessonPlan {
  constructor(name, warmUp, mainLesson, coolDown, notes) {
    this.name = name;
    this.warmUp = warmUp;
    this.mainLesson = mainLesson;
    this.coolDown = coolDown;
    this.notes = notes;
  }
}

/**
 * @property {string} type type of module content: "text" or "activity card"
 * @property {string} content text: string of content, activity card: "string of path to image"
 */
export class Module {
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}
