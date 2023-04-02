/**
 * Access token infomation from getOAuthToken
 */
export class AccessToken {
  token;
  expiryTime;
  type;
  /**
   * @param {string} access_token Access token to use in Drive API requests
   * @param {Date} expires_in Local time in seconds at which token expires. Default is min date.
   * @param {string} token_type Default token type is always 'Bearer'
   */
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

export class LessonPlan {
  name;
  warmUp;
  mainLesson;
  coolDown;
  notes;
  /**
   * @param {string} name Name of the lesson plan
   * @param {Module[]} warmUp warmUp module of the lesson
   * @param {Module[]} mainLesson mainLesson module of the lesson
   * @param {Module[]} coolDown coolDown module of the lesson
   * @param {string} notes notes, containing strings
   */
  constructor(name, warmUp, mainLesson, coolDown, notes) {
    this.name = name;
    this.warmUp = warmUp;
    this.mainLesson = mainLesson;
    this.coolDown = coolDown;
    this.notes = notes;
  }
}

export class Module {
  type;
  content;
  /**
   * @param {"text" | "activity card"} type type of module content: "text" or "activity card"
   * @param {string} content text: "ALL_CONTENT", activity card: "PATH_TO_IMAGE_IN_DEFAULT_DIR"
   */
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}
