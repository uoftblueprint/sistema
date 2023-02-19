import Local from './routes/Local';
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
      var favouritedLessonPlans = await Local.readDirectory(
        MAINDIRECTORY + '/Favourited'
      );
      var defaultLessonPlans = await Local.readDirectory(
        MAINDIRECTORY + '/Default'
      );

      return favouritedLessonPlans.concat(defaultLessonPlans);
    } catch (e) {
      console.log(e);
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

      const output_exists = await Local.checkFileExists(newpath);
      const input_file = await Local.checkFileExists(oldpath);

      if (!input_file) {
        throw new Error('File is not in defaults');
      }

      if (output_exists) {
        //DELETE THE FILE
        await Local.deleteFile(newpath);
        await Local.makeDirectory(newpath);
      }
      var files = await Local.readFile(oldpath);

      for (var i = 0; i < files.length; i++) {
        var file = await Local.moveFile(oldpath + files[i], newpath + files[i]);
      }

      const v = await Local.deleteFile(oldpath);
      return v;
    } catch (e) {
      console.log(e);
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

      await Local.checkFileExists(newpath);

      const output_exists = await Local.checkFileExists(newpath);
      const input_file = await Local.checkFileExists(oldpath);

      if (!input_file) {
        throw new Error('File is not in favourites');
      }

      if (output_exists) {
        await Local.deleteFile(newpath);
        await Local.makeDirectory(newpath);
      }
      var files = await Local.readFile(oldpath);

      for (var i = 0; i < files.length; i++) {
        var file = await Local.moveFile(oldpath + files[i], newpath + files[i]);
      }

      const v = await Local.deleteFile(oldpath);
      return v;
    } catch (e) {
      console.log(e);
    }
  }
};

export default LessonPlanService;
