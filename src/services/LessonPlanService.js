import Local from './routes/Local';
var RNFS = require('react-native-fs');

const LessonPlanService = {
  // All APIs for LessonPlan should be here
  // Don't call RNFS directly here (unless it's for one of the path constants!)
  // Instead, call a function from Local.js

  deleteLessonPlan: async function(lessonPlanName) {
    try {
      // Note that RNFS is capable of recursively unlinking directories, so since we're treating each Lesson Plan as a new directory, we can just unlink it with the delete() function
      var path = RNFS.DocumentDirectoryPath + '/' + lessonPlanName + '/';
      const v = await Local.deleteFile(path);
      console.log(v);
      return v;
    } catch (e) {
      // There was an error, catch it and do something with it
    }
  },

  saveLessonPlan: async function(lessonPlan) {
    try {
      // TODO: create lesson plan JSON object from LessonPlan object, as documented in the Wiki
      // Then, write to local storage with an RNFS call via Local.js
      ...
    } catch (e) {
      // There was an error, catch it and do something with it
    }
  },

  getLessonPlan: async function(lessonPlanName) {
    try {
      ...
    } catch (e) {
      ...
    }
  },

  getAllLessonNames: async function() {
    try {
      ...
    } catch (e) {
      ...
    }
  },

  setLessonPlanName: async function(oldName, newName) {
    try {
      ...
    } catch (e) {
      ...
    }
  }
};

export default LessonPlanService;
