// require the module
var RNFS = require('react-native-fs');

/**
 * Reads the file names in the entirety of the given directory.
 * @param {String} dirpath Full directory path to read
 * @return {String[]} Array of directory names
 */
export async function readDirectory(dirpath) {
  return RNFS.readdir(dirpath)
    .then(result => {
      console.log('GOT RESULT', result);

      // stat the first file
      return result;
    })
    .catch(err => {
      console.log(err.message);
    });
}

/**
 * Reads the file names in the entirety of the given directory in utf8 encoding.
 * @param {String} dirpath Full directory path to read
 * @return {String} File you want to read
 */
export async function readFile(filepath) {
  return RNFS.readFile(filepath)
    .then(result => {
      console.log('GOT FILE: ', filepath);
      return result;
    })
    .catch(err => {
      console.log(err.message);
    })
}

/**
 * Write to the local storage with some file in utf8 encoding.
 * @param {String} filepath Full file path to delete
 * @param {String} content Content to write to given file path
 */
export async function writeFile(filepath, content) {
  return RNFS.writeFile(filepath, content)
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
}

/**
 * Delete a Lesson Plan (a.k.a a directory in RNFS.DocumentDirectoryPath and
 * its contents). This can also recursively delete directories, so don't worry
 * if the path isn't a file, but a directory.
 * @param {String} filepath Full file path to delete
 */
export async function deleteFile(filepath) {
  return RNFS.unlink(filepath)
    .then(() => {
      console.log('FILE DELETED');
    })
    // `unlink` will throw an error, if the item to unlink does not exist
    .catch(err => {
      console.log(err.message);
    });
}

/**
 * Move (rename) a lesson plan or file.
 * @param {String} oldpath Full file path to rename
 * @param {String} newpath Destination path
 */
export async function moveFile(oldpath, newpath) {
  return RNFS.moveFile(oldpath, newpath)
    .then(() => {
      console.log(`FILE MOVED TO: ${newpath}`);
    })
    .catch(err => {
      console.log(err.message);
    });
}
