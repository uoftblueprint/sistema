import Local from './routes/Local';
var RNFS = require('react-native-fs');

const LessonPlanService = {
  // All APIs for LessonPlan should be here
  // Don't call RNFS directly here (unless it's for one of the path constants!)
  // Instead, call a function from Local.js

  /**
   * Delete a Lesson Plan (a.k.a a directory in RNFS.DocumentDirectoryPath and
   * its contents).
   * @param {String} name Name of the lesson plan to delete
   * @return {Bool} Whether or not the lesson plan was successfully deleted
   */
  deleteLessonPlan: async function (name) {
    try {
      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each Lesson Plan as a new directory, we can just unlink it with the delete() function
      var path = RNFS.DocumentDirectoryPath + '/' + name + '/';
      const v = await Local.deleteFile(path);
      console.log(v);
      return v;
    } catch (e) {
      // There was an error, catch it and do something with it
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
   * @return {Bool} Whether or not the lesson plan was successfully saved
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
   * @param {String} filepath Full path of the directory
   * @return {LessonPlan} The requested LessonPlan object
   */
  getLessonPlan: async function (name, filepath) {
    try {
      // ...
    } catch (e) {
      // ...
    }
  },

  /**
   * Reach into the lesson plan directory in local storage and return an array
   * of all the names.
   * @param {String} filepath Full path of the directory
   * @return {String[]} The list of lesson plan names
   */
  getAllLessonPlanNames: async function (filepath) {
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
   * @return {Bool} Whether the operation failed or succeeded
   */
  setLessonPlanName: async function (oldName, newName) {
    try {
      // ...
    } catch (e) {
      // ...
    }
  }
};

export default LessonPlanService;
