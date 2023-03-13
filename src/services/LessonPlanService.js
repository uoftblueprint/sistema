import Local, { readFile, checkFileExists, deleteFile } from './routes/Local';
import { MAINDIRECTORY } from './constants';
import { LessonPlan } from './models';

const LessonPlanService = {
  // All APIs for LessonPlan should be here
  // Don't call RNFS directly here!
  // Instead, call a function from Local.js :~]

  /**
   * Delete a Lesson Plan (a.k.a a directory in MAINDIRECTORY and its contents).
   * @param {String} name Name of the lesson plan to delete
   */
  deleteLessonPlan: async function (name) {
    try {
      let favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/`;
      let defaultPath = `${MAINDIRECTORY}/Default/${name}/`;
      let path;

      // check if file exists, assigning appropriate path if so
      if (await checkFileExists(favouritedPath)) {
        path = favouritedPath;
      } else if (await checkFileExists(defaultPath)) {
        path = defaultPath;
      } else {
        throw new Error(`${name} does not exist`);
      }

      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each Lesson Plan as a new directory, we can just unlink it with the deleteFile() function
      let result = await deleteFile(path);
      return result;
    } catch (e) {
      console.error('deleteLessonPlan error: ', e);
    }
  },

  /**
   * Given a LessonPlan object, create a stringified JSON as defined in the
   * wiki, and save it in a new directory by the same name as the lesson plan
   * under RNFS.DocumentDirectoryPath/LESSON_NAME/LESSON_NAME.json
   *
   * Be sure to think about how to save activity card .pngs later down the line
   * as well!
   * @param {LessonPlan} lesson LessonPlan object to save to local storage
   */
  saveLessonPlan: async function (lesson) {
    try {
      // TODO: create lesson plan JSON object from LessonPlan object, as documented in the Wiki
      // Then, write to local storage with an RNFS call via Local.js
      // ...
    } catch (e) {
      // There was an error, catch it and do something with it
    }
  },

  /**
   * Given the name of a lesson plan, return the LessonPlan object by reaching
   * into its directory, checking for the .json file, and later down the line,
   * also its associated .png activity cards.
   * @param {String} name Name of the lesson plan to retrieve
   * @return {LessonPlan} The requested LessonPlan object
   */
  getLessonPlan: async function (name) {
    try {
      let favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/`;
      let defaultPath = `${MAINDIRECTORY}/Default/${name}/`;
      let path;
      let lessonPlanObj;

      // check if file exists, assigning appropriate path if so
      if (await checkFileExists(favouritedPath)) {
        path = favouritedPath;
      } else if (await checkFileExists(defaultPath)) {
        path = defaultPath;
      } else {
        console.error(`getLessonPlan: ${name} does not exist.`);
      }

      // read in the file from RNFS
      let str = await readFile(path);
      // convert string to JSON object
      let json = JSON.parse(str);
      // create LessonPlan object from JSON
      lessonPlanObj = new LessonPlan(
        json.name,
        json.warmUp,
        json.mainLesson,
        json.coolDown,
        json.notes,
      );

      console.log(lessonPlanObj);
      return lessonPlanObj;
    } catch (e) {
      console.log('Error getLessonPlan: ', e);
    }
  },

  getLessonPlanTest: async function () {
    try {
      let path = `${MAINDIRECTORY}/test.json`;
      // let path = `${MAINDIRECTORY}/.txt`;

      let str = await readFile(path);
      // console.log(`str = ${JSON.stringify(str)}`);
      // console.log(str);

      let json = JSON.parse(str);
      // console.log('json parsed');
      // console.log(json.name);

      const lessonPlanObj = new LessonPlan(
        json.name,
        json.warmUp,
        json.mainLesson,
        json.coolDown,
        json.notes,
      );

      console.log(lessonPlanObj);
    } catch (e) {
      console.log('error in getLessonPlanTest');
    }
  },

  /**
   * Reach into the lesson plan directory in local storage and return an array
   * of all the names.
   * @return {String[]} The list of lesson plan names
   */
  getAllLessonPlanNames: async function () {
    try {
      // ...
    } catch (e) {
      // ...
    }
  },

  /**
   * Rename a lesson plan. Throw an error if the lesson DNE or if it's renamed
   * to an existing name.
   * Use RNFS.moveFile() with the original filename and the new filename!
   * @param {String} old_name Old name of lesson plan
   * @param {String} new_name New name of lesson plan
   */
  setLessonPlanName: async function (oldName, newName) {
    try {
      // ...
    } catch (e) {
      // ...
    }
  },

  /**
   * Favorite a lesson plan. This would place it at the top of the collection
   * in the UI.
   * @param {String} name Old name of lesson plan
   */
  favouriteLessonPlan: async function (name) {
    try {
      // ...
    } catch (e) {
      // ...
    }
  },

  /**
   * Un-favorite a lesson plan. This would put it back in the Default directory.
   * @param {String} name Old name of lesson plan
   */
  unfavouriteLessonPlan: async function (name) {
    try {
      // ...
    } catch (e) {
      // ...
    }
  },
};

export default LessonPlanService;
