var RNFS = require('react-native-fs');

const Local = {
    // All APIs for LessonPlan should be here
    // Hint: check the Wiki in the repo!
    // Use JS Promise syntax to write clean complex calls
    readMainDirectory: async function() {
        try {
            RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then((result) => {
              console.log('GOT RESULT', result);
              return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
              if (statResult[0].isFile()) {
                return RNFS.readFile(statResult[1], 'utf8');
              }
              return 'no file';
            })
            .then((contents) => {
              console.log(contents);
            })
        } catch (e) {
            console.log(err.message, err.code);
        }
    }
};

export default Local;
