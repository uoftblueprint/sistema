import {
  checkFileExists,
  readFile,
  readDirectory,
  writeFile,
  moveFile,
  deleteFile,
  makeDirectory,
  readDDirectory,
  cpyFile,
} from './routes/Local';
import { MAINDIRECTORY } from './constants';
import { LessonPlan, Module } from './models';

const LessonPlanService = {
  // All APIs for LessonPlan should be here
  // Don't call RNFS directly here!
  // Instead, call a function from Local.js :~]

  /**
   * Delete a Lesson Plan (a.k.a a directory in MAINDIRECTORY and its contents).
   * @param {string} name Name of the lesson plan to delete
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
      // Create lesson plan JSON object from LessonPlan object, as documented in the Wiki
      const lessonJSON = JSON.stringify(lesson);
      // Then, write to local storage with an RNFS call via Local.js
      // By default, new lesson plans should not be favourited
      var path = MAINDIRECTORY + '/Default/' + lesson.name + '/';
      makeDirectory(path)
        .then(() => {
          return writeFile(path + lesson.name + '.json', lessonJSON);
        })
        .then(r => {
          console.log('Successfully saved lesson plan: ' + lesson.name);
        });
    } catch (e) {
      // There was an error, catch it and do something with it
      console.error('Error saving lesson plan: ', e);
    }
  },

  /**
   * Given the name of a lesson plan, return the LessonPlan object by reaching
   * into its directory, checking for the .json file, and later down the line,
   * also its associated .png activity cards.
   * @param {string} name Name of the lesson plan to retrieve
   * @return {Promise<LessonPlan | void>} The requested LessonPlan object
   */
  getLessonPlan: async function (name) {
    try {
      let favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/${name}.json`;
      let defaultPath = `${MAINDIRECTORY}/Default/${name}/${name}.json`;
      let path;
      let lessonPlanObj;

      // check if file exists, assigning appropriate path if so
      if (await checkFileExists(favouritedPath)) {
        path = favouritedPath;
      } else if (await checkFileExists(defaultPath)) {
        path = defaultPath;
      } else {
        throw new Error(`${name} does not exist`);
      }

      // read in the file from RNFS
      let str = await readFile(path);
      // convert string to JSON object
      let json = JSON.parse(str);

      // create Module objects from JSON
      const warmUpList = json.warmUp.map(createModules);
      const mainLessonList = json.mainLesson.map(createModules);
      const coolDownList = json.coolDown.map(createModules);

      // helper function to create Module objects for .map()
      function createModules(module) {
        return new Module(module.type, module.content);
      }

      // create LessonPlan object from JSON
      lessonPlanObj = new LessonPlan(
        json.name,
        warmUpList,
        mainLessonList,
        coolDownList,
        json.notes,
      );

      return lessonPlanObj;
    } catch (e) {
      console.error('Error getLessonPlan: ', e);
    }
  },
  /**
   * Given the name of the lesson plan, copy all files in its directory
   * into a new directory named lesson plan name (i) in the default
   * directory
   * @param {String} name is the lesson plans name
   */
  copyLessonPlan: async function (name) {
    try {
      var j = 1;

      // find which repetition of copy are we on
      while (
        (await checkFileExists(
          MAINDIRECTORY + '/Default/' + name + ' (' + j + ')',
        )) ||
        (await checkFileExists(
          MAINDIRECTORY + '/Favourited/' + name + ' (' + j + ')',
        ))
      ) {
        j++;
      }
      const destPath = MAINDIRECTORY + '/Default/' + name + ' (' + j + ')/';

      // make new directory for the copied file
      await makeDirectory(destPath);

      var filepath;

      // find the original filepath
      if (await checkFileExists(MAINDIRECTORY + '/Favourited/' + name)) {
        filepath = MAINDIRECTORY + '/Favourited/' + name + '/';
      } else {
        filepath = MAINDIRECTORY + '/Default/' + name + '/';
      }

      var files = await readDirectory(filepath);

      // copy all the files in the lesson plans directory to the new directory
      for (var i = 0; i < files.length; i++) {
        // if this is the lesson plan, rename with the new name, otherwise just copy
        if (files[i] === `${name}.json`) {
          await cpyFile(
            filepath + files[i],
            destPath + name + ' (' + j + ').json',
          );
        } else {
          await cpyFile(filepath + files[i], destPath + files[i]);
        }
      }
    } catch (e) {
      console.error('Error copyLessonPlan: ', e);
    }
  },

  /**
   * Reach into the lesson plan directory in local storage and return an array
   * of all the names.
   * @param {number} option decides what option we need, 0 returns all times and names, 1 returns
   * only favourites, and 2 returns only default
   * @return Returns a list of [mtime, name] of the lesson plans
   */
  getAllLessonPlanNames: async function (option = 0) {
    try {
      var favouritedLessonPlans = await readDDirectory(
        MAINDIRECTORY + '/Favourited/',
      );
      var defaultLessonPlans = await readDDirectory(
        MAINDIRECTORY + '/Default/',
      );
      var combined = [];

      if (option === 0 || option === 1) {
        combined = favouritedLessonPlans;

        if (option === 0) {
          for (var i = 0; i < defaultLessonPlans.length; i++) {
            combined.push(defaultLessonPlans[i]);
          }
        }
      } else {
        combined = defaultLessonPlans;
      }

      const lpInfo = combined.map(dirItem => {
        return { mtime: dirItem.mtime, name: dirItem.name };
      });

      return lpInfo;
    } catch (e) {
      console.error('Error getAllLessonPlanNames: ', e);
      return [];
    }
  },

  /**
   * Rename a lesson plan. Throw an error if the lesson DNE or if it's renamed
   * to an existing name.
   * Use RNFS.moveFile() with the original filename and the new filename!
   * @param {string} oldName Old name of lesson plan
   * @param {string} newName New name of lesson plan
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
      if (
        !(
          (await checkFileExists(MAINDIRECTORY + '/Default')) &&
          !(await checkFileExists(MAINDIRECTORY + '/Favourited'))
        )
      ) {
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
   * @param {string} name Old name of lesson plan
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
   * @param {string} name Old name of lesson plan
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
