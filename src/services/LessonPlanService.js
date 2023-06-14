import {
  checkFileExists,
  readFile,
  readDirectory,
  writeFile,
  moveFile,
  deleteFile,
  makeDirectory,
  readDDirectory,
  copyDir,
} from './routes/Local';
import { MAINDIRECTORY, SectionName } from './constants';
import { Module } from './models';

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
      const favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/`;
      const defaultPath = `${MAINDIRECTORY}/Default/${name}/`;
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
   * @param {Object} lesson LessonPlan object to save to local storage
   * @param {Boolean} hasNewName if the LP has been renamed
   * @param {String} oldLPName to delete old files and directories
   */
  saveLessonPlan: async function (lesson, hasNewName = false, oldLPName = '', newLesson) {
    try {
      // Create lesson plan JSON object from LessonPlan object, as documented in the Wiki
      const lessonJSON = JSON.stringify(lesson);
      const name = lesson.lessonPlanName.trim();

      let path;

      if (hasNewName) {
        console.log("The lesson plan was saved with a new name.");

        const favouritedPath = `${MAINDIRECTORY}/Favourited/${oldLPName}/`;
        const defaultPath = `${MAINDIRECTORY}/Default/${oldLPName}/`;

        let oldPath;

        // Check if file exists, assigning appropriate path if so
        if (await checkFileExists(favouritedPath)) {
          console.log("The lesson plan exists in Favourites.");
          path = `${MAINDIRECTORY}/Favourited/${name}/`;
          oldPath = favouritedPath;
        } else if (await checkFileExists(defaultPath)) {
          console.log("The lesson plan exists in Default.");
          path = `${MAINDIRECTORY}/Default/${name}/`;
          oldPath = defaultPath;
        } else {
          throw new Error(`${oldLPName} does not exist`); // If the LP has a new name, it has to already exist
        }

        // If the LP has been renamed, we need to delete its old file and directory
        // As well as copy over all the innards of the old directory to the new one
        await copyDir(oldPath, path)
          .then(() => {
            writeFile(false, path + name + '.json', lessonJSON);
          })
          .then(() => {
            deleteFile(path + oldLPName + '.json');
          })
          .then(() => {
            this.deleteLessonPlan(oldLPName);
          });
      } else {
        console.log("The lesson plan was saved without a new name.");

        const favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/`;
        const defaultPath = `${MAINDIRECTORY}/Default/${name}/`;

        // Check if file exists, assigning appropriate path if so
        if (await checkFileExists(favouritedPath)) {
          path = favouritedPath;
        } else if (await checkFileExists(defaultPath)) {
          path = defaultPath;
        } else {
          path = defaultPath; // By default, new lesson plans should not be favourited
        }

        // Then, write to local storage with an RNFS call via Local.js
        await makeDirectory(path)
          .then(async () => {
            await checkFileExists(path);
          })
          .then(async () => {
            await writeFile(false, path + name + '.json', lessonJSON);
          })
          .then(() => {
            console.log('Successfully saved lesson plan: ' + name);
          });
      }
    } catch (e) {
      // There was an error, catch it and do something with it
      console.error('Error saving lesson plan: ', e);
    }
  },

  /**
   * Given the name of a lesson plan, return the LessonPlan object by reaching
   * into its directory, checking for the .json file, and later down the line,
   * also its associated .png activity cards.
   * @param {String} name Name of the lesson plan to retrieve
   * @return {Object} the requested lesson plan
   */
  getLessonPlan: async function (name) {
    try {
      let favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/${name}.json`;
      let defaultPath = `${MAINDIRECTORY}/Default/${name}/${name}.json`;

      let path;
      // check if file exists, assigning appropriate path if so
      if (await checkFileExists(favouritedPath)) {
        path = favouritedPath;
      } else if (await checkFileExists(defaultPath)) {
        path = defaultPath;
      } else {
        throw new Error(`${name} does not exist`);
      }

      // read in the file from RNFS
      let lpStr = await readFile(path);
      // convert string to JSON object
      let lpObj = JSON.parse(lpStr);

      // helper function to create Module objects for .map()
      function createModules(module) {
        return new Module(module.type, module.content, module.name);
      }

      // create Module objects from JSON
      const warmUpList = lpObj[SectionName.warmUp].map(createModules);
      const mainLessonList = lpObj[SectionName.mainLesson].map(createModules);
      const coolDownList = lpObj[SectionName.coolDown].map(createModules);

      // create LessonPlan object from JSON
      let lessonPlanObj = {
        lessonPlanName: lpObj.lessonPlanName,
        [SectionName.warmUp]: warmUpList,
        [SectionName.mainLesson]: mainLessonList,
        [SectionName.coolDown]: coolDownList,
        [SectionName.notes]: lpObj[SectionName.notes],
      };

      return lessonPlanObj;
    } catch (e) {
      console.error('Error getLessonPlan: ', e);
    }
  },

  /**
   * Find out whether or not a given LP is favourited
   * @param {String} name Name of the lesson plan to check for
   * @return {Boolean} True if the lesson plan is favourited
   */
  isLessonPlanFavourited: async function (name) {
    try {
      const favouritedPath = `${MAINDIRECTORY}/Favourited/${name}/`;
      // check if file exists in the favourites folder
      if (await checkFileExists(favouritedPath)) {
        console.log(`Lesson Plan is in Favourited: ${name}`);
        return true;
      } else {
        console.log(`Lesson Plan is in Default: ${name}`);
        return false;
      }
    } catch (e) {
      console.error('isLessonPlanFavourited error: ', e);
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

      // find the original filepath
      let filepath;
      if (await checkFileExists(MAINDIRECTORY + '/Favourited/' + name)) {
        filepath = MAINDIRECTORY + '/Favourited/' + name + '/';
      } else {
        filepath = MAINDIRECTORY + '/Default/' + name + '/';
      }

      // copy lesson plan directory recursively
      await copyDir(filepath, destPath);
      // rename the lesson plan .json inside the copied lesson plan directory
      await moveFile(`${destPath}${name}.json`, `${destPath}${name} (${j}).json`);
    } catch (e) {
      console.error('Error copyLessonPlan: ', e);
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
      var favouritedLessonPlans = await readDDirectory(
        MAINDIRECTORY + '/Favourited',
      );
      var defaultLessonPlans = await readDDirectory(
        MAINDIRECTORY + '/Default',
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

      const lpInfo = combined.reduce(function (result, dirItem) {
        if (dirItem.name !== '.DS_Store') {
          result.push({ mtime: dirItem.mtime, name: dirItem.name });
        }
        return result;
      }, []);

      return lpInfo;
    } catch (e) {
      console.error('Error getAllLessonPlanNames: ', e);
    }
  },

  /**
   * Initialize the empty Default and Favourited directories.
   */

  initializeEmptyDirectories: async function () {
    try {
      let defaultExists = await checkFileExists(MAINDIRECTORY + '/Default');
      let favouritedExists = await checkFileExists(MAINDIRECTORY + '/Default');

      if (defaultExists && favouritedExists) {
        console.log('initializeEmptyDirectories: Directories already exist.');
        return;
      }

      if (!defaultExists) {
        makeDirectory(MAINDIRECTORY + '/Default/');
        console.log('initializeEmptyDirectories: Created Default directory.');
      }
      if (!favouritedExists) {
        makeDirectory(MAINDIRECTORY + '/Favourited/');
        console.log(
          'initializeEmptyDirectories: Created Favourited directory.',
        );
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

  /**
   * Check if there is another existing lesson plan with the same name.
   * @param {String} name 
   * @returns {Boolean} true if lesson plan name is unique, false otherwise
   */
  isLPNameUnique: async function (name) {
    try {
      // Grab all lesson plan names from list of [mtime, name]
      const lessonPlanArr = await this.getAllLessonPlanNames(0);
      const allNames =  lessonPlanArr.map(data => data.name);
      // Return true if existing allNames doesn't include new name
      return !(allNames.includes(name.trim()));
    } catch (e) {
      console.error('Error isLPNameUnique: ', e);
    }
  },
};

export default LessonPlanService;
