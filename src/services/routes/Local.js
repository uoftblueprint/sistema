import RNFS from 'react-native-fs';

/**
 * Reads the file names in the entirety of the given directory.
 * @param {string} dirpath Full directory path to read
 * @return {Promise<string[]>} Array of directory names
 */
export async function readDirectory(dirpath) {
  return RNFS.readdir(dirpath)
    .then(result => {
      console.log(`GOT RESULT: ${dirpath}`, result);
      return result;
    })
    .catch(err => {
      console.error(`RNFS readDirectory: ${err.message}`);
      return [];
    });
}
/**
 * Reads the ReadDirItem in the entirety of the given directory.
 * @param {string} dirpath Full directory path to read
 * @return {Promise<RNFS.ReadDirItem[]>} Array of directory ReadDirItems
 */
export async function readDDirectory(dirpath) {
  return RNFS.readDir(dirpath)
    .then(result => {
      console.log(`GOT RESULT: ${dirpath}`, result);
      return result;
    })
    .catch(err => {
      console.error(`RNFS readDDirectory: ${err.message}`);
      return [];
    });
}

/**
 * Reads the file names in the entirety of the given directory in utf8 encoding.
 * @param {string} filepath Full directory path to read
 * @return {Promise<string>} File you want to read
 */
export async function readFile(filepath) {
  return RNFS.readFile(filepath)
    .then(result => {
      console.log('GOT FILE: ', filepath);
      return result;
    })
    .catch(err => {
      console.error(`RNFS readFile: ${err.message}`);
      return '';
    });
}

/**
 * Write to the local storage with some file in utf8 encoding.
 * @param {boolean} isImage
 * @param {string} filepath Full file path to delete
 * @param {string} content Content to write to given file path
 */
export async function writeFile(isImage, filepath, content) {
  const options = {
    encoding: '',
  };
  if (isImage) {
    options.encoding = 'base64';
  } else {
    options.encoding = 'utf8';
  }
  return RNFS.writeFile(filepath, content, options)
    .then(success => {
      console.log(`FILE WRITTEN!: ${filepath}`);
    })
    .catch(err => {
      console.error(`RNFS writeFile: ${err.message}`);
    });
}

/**
 * Delete a Lesson Plan (a.k.a a directory in RNFS.DocumentDirectoryPath and
 * its contents). This can also recursively delete directories, so don't worry
 * if the path isn't a file, but a directory.
 * @param {string} filepath Full file path to delete
 */
export async function deleteFile(filepath) {
  return (
    RNFS.unlink(filepath)
      .then(() => {
        console.log(`FILE DELETED!: ${filepath}}`);
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.error(`RNFS deleteFile: ${err.message}`);
      })
  );
}

/**
 * Move (rename) a lesson plan or file.
 * @param {string} oldpath Full file path to rename
 * @param {string} newpath Destination path
 */
export async function moveFile(oldpath, newpath) {
  return RNFS.moveFile(oldpath, newpath)
    .then(() => {
      console.log(`FILE MOVED TO: ${newpath}`);
    })
    .catch(err => {
      console.error(`RNFS moveFile: ${err.message}`);
    });
}

/**
 * Check if a file exists.
 * @param {string} path Full file path to directory to check
 * @return {Promise<boolean>} result Whether file exists or not
 */
export async function checkFileExists(path) {
  return RNFS.exists(path)
    .then(result => {
      if (result) {
        console.log('FILE EXISTS');
      } else {
        console.log('FILE DOES NOT EXIST');
      }
      return result;
    })
    .catch(err => {
      console.error(`RNFS checkFileExists: ${err.message}`);
      return false;
    });
}

/**
 * Create a directory at filepath. Automatically creates parents and does not throw
 * if already exists
 * @param {string} dirPath Full file path of the directory to be added
 */
export async function makeDirectory(dirPath) {
  return RNFS.mkdir(dirPath)
    .then(() => {
      console.log(`DIRECTORY MADE: ${dirPath}`);
    })
    .catch(err => {
      console.error(`RNFS makeDirectory: ${err.message}`);
    });
}

/**
 * Copies the file located at filepath to destPath.

   Note: On Android copyFile will overwrite destPath if it already exists. On iOS an error will be thrown if the file already exists.
 * @param {String} filepath the original path to be copied from
 * @param {String} destPath where the file is going
 */
export async function cpyFile(filepath, destPath) {
  return RNFS.copyFile(filepath, destPath)
    .then(() => {
      console.log(`FILE COPIED! ${filepath} => ${destPath}`);
    })
    .catch(err => {
      console.error(`RNFS cpyFile: ${err.message}`);
    });
}
