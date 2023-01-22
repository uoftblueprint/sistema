// require the module
var RNFS = require('react-native-fs');

// get a list of files and directories in the main bundle
export async function readMainDirectory() {
  return RNFS
    .readDir(RNFS.DocumentDirectoryPath)
    .then(result => {
      console.log('GOT RESULT', result);

      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then(contents => {
      // log the file contents
      console.log(contents);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
}

export async function writeFile(filepath, content, encoding) {
  return RNFS
    .writeFile(filepath, content, encoding)
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function deleteFile(filepath) {
  return RNFS
    .unlink(filepath)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch((err) => {
      console.log(err.message);
    });
}
