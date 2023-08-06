import {
  checkFileExists,
  readFile,
  readDirectory,
  writeFile,
  deleteFile,
  makeDirectory,
  readDDirectory,
  copyDir,
} from './routes/Local';
import { MAINDIRECTORY, SectionName, ImageFileExtensions } from './constants';
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
      const favourited = await this.isLessonPlanFavourited(name);
      const path = favourited
        ? `${MAINDIRECTORY}/Favourited/${name}/`
        : `${MAINDIRECTORY}/Default/${name}/`;

      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each
      // Lesson Plan as a new directory, we can just unlink it with the deleteFile() function
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
  saveLessonPlan: async function (lesson, hasNewName = false, oldLPName = '') {
    try {
      // Create lesson plan JSON object from LessonPlan object, as documented in the Wiki
      const lessonJSON = JSON.stringify(lesson);
      const name = lesson.lessonPlanName.trim();

      let path;

      if (hasNewName) {
        console.log('The lesson plan was saved with a new name.');
        const favourited = await this.isLessonPlanFavourited(oldLPName);
        const folder = favourited ? '/Favourited/' : '/Default/';

        const oldPath = MAINDIRECTORY + folder + oldLPName;
        path = MAINDIRECTORY + folder + name;

        // If the LP has been renamed, we need to delete its old file and directory
        // As well as copy over all the innards of the old directory to the new one
        await copyDir(oldPath, path);
        await writeFile(false, path + '/' + name + '.json', lessonJSON);
        await deleteFile(path + '/' + oldLPName + '.json');
        await this.deleteLessonPlan(oldLPName);
      } else {
        console.log('The lesson plan was saved without a new name.');

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
        await makeDirectory(path);
        await checkFileExists(path);
        await writeFile(false, path + name + '.json', lessonJSON);
        console.log('Successfully saved lesson plan: ' + name);
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
      const favourited = await this.isLessonPlanFavourited(name);
      const path = favourited
        ? `${MAINDIRECTORY}/Favourited/${name}/${name}.json`
        : `${MAINDIRECTORY}/Default/${name}/${name}.json`;

      // read in the file from RNFS
      let lpStr = await readFile(path);
      // convert string to JSON object
      let lpObj = JSON.parse(lpStr);

      // helper function to create Module objects for .map()
      function createModules(module) {
        return new Module(
          module.type,
          module.content,
          module.name,
          module.title,
        );
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
      const defaultPath = `${MAINDIRECTORY}/Default/${name}/`;
      // check if file exists in the favourites folder
      if (await checkFileExists(favouritedPath)) {
        console.log(`Lesson Plan is in Favourited: ${name}`);
        return true;
      } else if (await checkFileExists(defaultPath)) {
        console.log(`Lesson Plan is in Default: ${name}`);
        return false;
      } else {
        console.warn(
          `Lesson Plan ${name} has not been saved into a Favourited or Default folder yet`,
        );
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
      const favourited = await this.isLessonPlanFavourited(name);
      const originalPath = favourited
        ? `${MAINDIRECTORY}/Favourited/${name}`
        : `${MAINDIRECTORY}/Default/${name}`;

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

      const destPath = MAINDIRECTORY + '/Default/' + name + ' (' + j + ')';

      // copy lesson plan directory recursively
      await copyDir(originalPath, destPath);
      // retrieve object from .json file in destination path
      let lpStr = await readFile(`${destPath}/${name}.json`);
      // convert string to JSON object and edit lesson plan name
      let lpObj = JSON.parse(lpStr);
      lpObj.lessonPlanName = `${name} (${j})`;
      // convert back to .json string
      lpStr = JSON.stringify(lpObj);
      // write to RNFS
      await writeFile(false, `${destPath}/${name} (${j}).json`, lpStr);
      // rename the lesson plan .json file inside the copied lesson plan directory
      await deleteFile(`${destPath}/${name}.json`);
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
      var defaultLessonPlans = await readDDirectory(MAINDIRECTORY + '/Default');
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
      var oldpath = MAINDIRECTORY + '/Default/' + name;
      var newpath = MAINDIRECTORY + '/Favourited/' + name;

      if (!(await checkFileExists(oldpath))) {
        throw new Error('File is not in Defaults');
      }

      await copyDir(oldpath, newpath);

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
      var newpath = MAINDIRECTORY + '/Default/' + name;
      var oldpath = MAINDIRECTORY + '/Favourited/' + name;

      if (!(await checkFileExists(oldpath))) {
        throw new Error('File is not in Favourited');
      }

      await copyDir(oldpath, newpath);
      await deleteFile(oldpath);
    } catch (e) {
      console.error('Error unfavourite: ', e);
    }
  },

  /**
   * Check if there is another existing lesson plan with the same name.
   * @param {String} name
   * @param {Boolean} isFavourited Known before so just passed in
   * @returns {Boolean} true if lesson plan name is unique, false otherwise
   */
  isLPNameUnique: async function (name, isFavourited) {
    try {
      // Grab all lesson plan names from list of [mtime, name]
      const lessonPlanArr = await this.getAllLessonPlanNames(0);
      const allNames = lessonPlanArr.map(data => data.name);
      // True if existing allNames doesn't include new name
      const isUnique = !allNames.includes(name.trim());

      // Handle edge case
      if (!isUnique) {
        // If the LP doesn't have a .json (never been saved before), return true
        // Handles case where LP had directory created (usually if an image was downloaded) but is otherwise empty
        const path = isFavourited
          ? `${MAINDIRECTORY}/Favourited/${name}/`
          : `${MAINDIRECTORY}/Default/${name}/`;

        return !(await checkFileExists(path + name + '.json'));
      } else {
        return true;
      }
    } catch (e) {
      console.error('Error isLPNameUnique: ', e);
    }
  },

  /**
   * Get paths of all image (jpg, png) files in the lesson plan directory.
   * @param {String} name Name of the lesson plan
   * @returns {String[]} List of all image paths in the format `/${id}/cardImage.jpg` or `/${id}`
   */
  getLessonPlanImages: async function (name) {
    try {
      const favourited = await this.isLessonPlanFavourited(name);
      const dir = favourited
        ? `${MAINDIRECTORY}/Favourited/${name}/`
        : `${MAINDIRECTORY}/Default/${name}/`;

      const lpFiles = await readDDirectory(dir).catch(() => []);

      let images = [];
      for (let file of lpFiles) {
        if (file.isDirectory()) {
          // Image is an activity card downloaded into a directory
          images.push(`/${file.name}/cardImage.jpg`);
        } else if (ImageFileExtensions.some(ext => file.name.includes(ext))) {
          // Image is self-uploaded and the file ext is considered part of the file name itself
          images.push(`/${file.name}`);
        }
      }

      return images;
    } catch (e) {
      console.error('Error getLessonPlanImages: ', e);
      return [];
    }
  },

  /**
   * Checks if the lesson plan directory is empty.
   * If the directory doesn't exist (lesson plan hasn't been saved yet), will return false.
   * @param {String} name Name of lesson plan
   * @param {Boolean} isFavourited Known before in cleanupActions.js so just passed in
   * @returns {Promise<Boolean>} True if lesson plan doesn't have a .json file and any images, False otherwise
   */
  isLessonPlanDirectoryEmpty: async function (name, isFavourited) {
    try {
      const path = isFavourited
        ? `${MAINDIRECTORY}/Favourited/${name}/`
        : `${MAINDIRECTORY}/Default/${name}/`;

      if (await checkFileExists(path)) {
        const files = await readDirectory(path);
        return files.length == 0;
      } else {
        console.log(
          `isLessonPlanDirectoryEmpty: ${name} directory does not exist`,
        );
        return false;
      }
    } catch (e) {
      console.error('Error isLessonPlanDirectoryEmpty: ', e);
    }
  },
};

export default LessonPlanService;
