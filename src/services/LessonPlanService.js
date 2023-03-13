import {
  checkFileExists,
  readDirectory,
  moveFile,
  deleteFile,
  makeDirectory,
  readDDirectory,
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
      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each Lesson Plan 
      // as a new directory, we can just unlink it with the deleteFile() function
      var path = MAINDIRECTORY + '/' + name + '/';
      await deleteFile(path);
    } catch (e) {
      console.error('Error deleteLessonPlan: ', e);
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
   * @param {Integer} option decides what option we need, 0 returns all times and names, 1 returns
   * only favourites, and 2 returns only default
   * @return {String[]} Returns a list of [mtime, name] of the lesson plans
   */
  getAllLessonPlanNames: async function (option = 0) {
    try {
      var favouritedLessonPlans = await readDDirectory(MAINDIRECTORY + '/Favourited/');
      var defaultLessonPlans = await readDDirectory(MAINDIRECTORY + '/Default/');
      var combined = [];

      if (option == 0 || option == 1){
        combined = favouritedLessonPlans;
        if (option == 0){
          for (var i = 0; i < defaultLessonPlans.length; i++){
            combined.push(defaultLessonPlans[i]);
          }
        }
      }else {
        combined = defaultLessonPlans;
      }
      
      const lpInfo = combined.map((dirItem) => {
        return { mtime: dirItem.mtime , 
                    name: dirItem.name }     
      })

      return lpInfo;
    } catch (e) {
      console.error('Error getAllLessonPlanNames: ', e);
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
   * Initialize the empty Default and Favourited directories.
   */

  initializeEmptyDirectories: async function () {
    try {
      if (!(await checkFileExists(MAINDIRECTORY + '/Default') && !(await checkFileExists(MAINDIRECTORY + '/Favourited')))) {
        await makeDirectory(MAINDIRECTORY + '/Default/');
        await makeDirectory(MAINDIRECTORY + '/Favourited/');
      } else {
        console.log('Directories already exist');
      }
    } catch (e) {
      console.error('Error initializing directories: ', e);
    }
  },

  /**
   * Favorite a lesson plan. This would place it at the top of the collection
   * in the UI.
   * @param {String} name Old name of lesson plan
   */
  favouriteLessonPlan: async function (name) {
    try {
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
      console.error('Error favourite: ', e);
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
      console.error('Error unfavourite: ', e);
    }
  },
};

export default LessonPlanService;
