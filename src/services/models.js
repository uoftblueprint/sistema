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
 * @property {string[]} warmUp warmUp module of the lesson
 * @property {string[]} mainLesson mainLesson module of the lesson
 * @property {string[]} coolDown coolDown module of the lesson
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
 * @property {string} name Name of the add activity card
 * @property {string} path path to image in RNHS
 */
export class ActivityCard {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }
}

//TODO: delete module because it is not used in LessonPLan anymore
/**
 * @property {string} type type of module content: "text" or "activity card"
 * @property {string} content text: "ALL_CONTENT", activity card: "PATH_TO_IMAGE_IN_DEFAULT_DIR"
 */
export class Module {
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}
