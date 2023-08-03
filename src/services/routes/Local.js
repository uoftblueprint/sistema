import RNFS from 'react-native-fs';

/**
 * Reads the file names in the entirety of the given directory.
 * @param {String} dirpath Full directory path to read
 * @return {String[]} Array of directory names
 */
export async function readDirectory(dirpath) {
  return RNFS.readdir(dirpath)
    .then(result => {
      console.log(`GOT RESULT: ${dirpath}`);
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
      console.log(`GOT RESULT: ${dirpath}`);
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
 * Write to the local storage with some file in encoding.
 * @param {Boolean} isImage If file to write is an image, encoding type changes.
 * @param {String} filepath Full file path to write to
 * @param {String} content Content to write to given file path
 */
export async function writeFile(isImage, filepath, content) {
  //set up the encoding based on wether or not content is an image
  let encoding = isImage ? 'base64' : 'utf8';
  const data = isImage ? content.toString('base64') : content;

  return RNFS.writeFile(filepath, data, encoding)
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
        console.log(`FILE DELETED!: ${filepath}`);
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
        console.log(`FILE EXISTS ${path}`);
      } else {
        console.log(`FILE DOES NOT EXIST ${path}`);
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

/**
 * Copies the folder located at filepath to destpath recursively.

 * Note: On Android copyFile will overwrite destpath if it already exists. 
 * On iOS an error will be thrown if the file already exists.
 * @param {String} dirpath the original path to be copied from
 * @param {String} destpath where the file is going
 * @return {String} The final destination path, if successful
 */
export async function copyDir(dirpath, destpath) {
  try {
    const items = await RNFS.readDir(dirpath);
    await RNFS.mkdir(destpath);

    for (const item of items) {
      const dest = `${destpath}/${item.name}`;
      // If item is a directory, recurse into it
      // Otherwise, simply copy the file and move onto the next item
      if (item.isDirectory()) {
        await copyDir(item.path, dest);
      } else {
        await copyFile(item.path, dest);
      }
    }
  } catch (e) {
    console.error(`RNFS copyDir: ${e.message}`);
  }
}

/**
 * Copies the file located at filepath to destpath.

 * Note: On Android copyFile will overwrite destpath if it already exists. 
 * On iOS an error will be thrown if the file already exists.
 * @param {String} filepath the original path to be copied from
 * @param {String} destpath where the file is going
 */
export async function copyFile(filepath, destpath) {
  return RNFS.copyFile(filepath, destpath)
    .then(() => {
      console.log(`FILE COPIED! ${filepath} => ${destpath}`);
    })
    .catch(err => {
      console.error(`RNFS copyFile: ${err.message}`);
    });
}
