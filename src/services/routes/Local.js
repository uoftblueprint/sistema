import RNFS from 'react-native-fs';

/**
 * Reads the file names in the entirety of the given directory.
 * @param {String} dirpath Full directory path to read
 * @return {String[]} Array of directory names
 */
export async function readDirectory(dirpath) {
  return RNFS.readdir(dirpath)
    .then(result => {
      console.log(`GOT RESULT: ${dirpath}`, result);
      return result;
    })
    .catch(err => {
      console.error(`RNFS readDirectory: ${err.message}`);
    });
}
/**
 * Reads the ReadDirItem in the entirety of the given directory.
 * @param {String} dirpath Full directory path to read
 * @return {RNFS.ReadDirItem[]} Array of directory ReadDirItems
 */
export async function readDDirectory(dirpath) {
  return RNFS.readDir(dirpath)
    .then(result => {
      console.log(`GOT RESULT: ${dirpath}`, result);
      return result;
    })
    .catch(err => {
      console.error(`RNFS readDDirectory: ${err.message}`);
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
      console.error(`RNFS readFile: ${err.message}`);
    });
}

/**
 * Write to the local storage with some file in utf8 encoding.
 * @param {String} filepath Full file path to delete
 * @param {String} content Content to write to given file path
 */
export async function writeFile(isImage, filepath, content) {
  const options = {
    encoding: '',
  };
  if (isImage) {
    options.encoding = 'base64';
    content = content.toString('base64');
  } else {
    options.encoding = 'utf8';
  }
  return RNFS.writeFile(filepath, content, options.encoding)
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
 * @param {String} filepath Full file path to delete
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
 * @param {String} oldpath Full file path to rename
 * @param {String} newpath Destination path
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
 * @param {String} path Full file path to directory to check
 * @return {Bool} result Whether file exists or not
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
    });
}

/**
 * Create a directory at filepath. Automatically creates parents and does not throw
 * if already exists
 * @param {String} dirPath Full file path of the directory to be added
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
