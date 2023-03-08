import Local, {
  checkFileExists,
  readDirectory,
  moveFile,
  deleteFile,
  makeDirectory
} from './routes/Local';
import { MAINDIRECTORY } from './constants';

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
      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each Lesson Plan as a new directory, we can just unlink it with the deleteFile() function
      var path = MAINDIRECTORY + '/' + name + '/';
      await deleteFile(path);
    } catch (e) {
      console.log('Error deleteLessonPlan: ', e);
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
    } catch (e) {
      // Error
    }
  },

  /**
   * Reach into the lesson plan directory in local storage and return an array
   * of all the names.
   * @return {String[]} The list of lesson plan names
   */
  getAllLessonPlanNames: async function () {
    try {
      //Note: you have to await for the directory (even though VScode says it is unnecessary)
      var favouritedLessonPlans = await readDirectory(
        MAINDIRECTORY + '/Favourited/'
      );
      var defaultLessonPlans = await readDirectory(MAINDIRECTORY + '/Default/');

      var combined = favouritedLessonPlans;

      for (let i = 0; i < defaultLessonPlans.length; i++) {
        combined.push(defaultLessonPlans[i]);
      }

      return combined;
    } catch (e) {
      console.log('Error getAllLessonPlanNames: ', e);
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
      /* Notes:
      - We cannot call recursively move file. So first we are going to check
        if the file exists in the favourtie directory (it shouldnt) but if it does, we
        delete the directory.

      - Next, we will read the current file in default and move each file individually.
        This works under the assumption that it does not call*/

      var oldpath = MAINDIRECTORY + '/Default/' + name + '/';
      var newpath = MAINDIRECTORY + '/Favourited/' + name + '/';

      if (!(await checkFileExists(oldpath))) {
        throw new Error('File is not in Defaults');
      }

      if (await checkFileExists(newpath)) {
        await deleteFile(newpath);
      }

      await makeDirectory(newpath);

      var files = await readDirectory(oldpath);

      for (var i = 0; i < files.length; i++) {
        await moveFile(oldpath + files[i], newpath + files[i]);
      }

      await deleteFile(oldpath);
    } catch (e) {
      console.log('Error favourite: ', e);
    }
  },

  /**
   * Un-favorite a lesson plan. This would put it back in the Default directory.
   * @param {String} name Old name of lesson plan
   */
  unfavouriteLessonPlan: async function (name) {
    try {
      var newpath = MAINDIRECTORY + '/Default/' + name + '/';
      var oldpath = MAINDIRECTORY + '/Favourited/' + name + '/';

      if (!(await checkFileExists(oldpath))) {
        throw new Error('File is not in Favourited');
      }

      if (await checkFileExists(newpath)) {
        await deleteFile(newpath);
      }
      await makeDirectory(newpath);

      var files = await readDirectory(oldpath);

      for (var i = 0; i < files.length; i++) {
        await moveFile(oldpath + files[i], newpath + files[i]);
      }

      await deleteFile(oldpath);
    } catch (e) {
      console.log('Error unfavourite: ', e);
    }
  },
};

export default LessonPlanService;
