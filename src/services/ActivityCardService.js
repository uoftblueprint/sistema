import {
  checkFileExists,
  writeFile,
  makeDirectory,
  deleteFile,
} from './routes/Local';
import { MAINDIRECTORY } from './constants';
import { Buffer } from 'buffer';
import axios from 'axios';
import { DRIVE_API_URLS } from './config.json';

const ActivityCardService = {
  // All APIs for ActivityCards should be here
  // Don't call RNFS directly here!
  // Instead, call a function from Local.js :~]

  /**
   * Returns array of file paths for this month's featured activity cards.
   * @return {Promise<String[] | String>}
   */
  getFeaturedActivityCards: async function () {
    try {
      // Retrieve the last week from browser, convert to ISO for use in query
      const weekAgo = new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000,
      ).toISOString();

      // Set up GET url, query, and path to Featured Card directory
      var downloadUrl =
        DRIVE_API_URLS.SEARCH_FILES + DRIVE_API_URLS.SEARCH_PARAMETERS;
      var path = MAINDIRECTORY + '/FeaturedActivityCards/';
      const searchQuery =
        "modifiedTime >= '" +
        weekAgo +
        "' and mimeType contains 'image/' and fullText contains 'ACTVT'";

      const params = {
        q: searchQuery,
        fields:
          'files(kind,driveId,mimeType,id,name,teamDriveId,thumbnailLink,webContentLink,modifiedTime)',
      };

      // Retrieve all Drive files meeting the params
      const response = await axios.get(downloadUrl, { params }).catch(error => {
        // console.error('ERROR IN GETTING FEATURED ACTIVITY CARDS: ' + error);
        if (error.code === 'ERR_NETWORK') {
          throw new Error('no wifi');
        }
      });

      // Access the Array of all files and set up path Array (to be returned)
      const driveFiles = response.data;
      const files_list = driveFiles.files;
      var pathArr = [];

      // no new files found, return an empty array (old Activity Cards are mapped onto frontend)
      if (files_list.length === 0) {
        return [];
      }

      // Delete anything that may currently be in the Featured Cards directory, make the new path with no content
      if (await checkFileExists(path)) {
        await deleteFile(path);
        await makeDirectory(path);
      } else {
        await makeDirectory(path);
      }

      // if new cards were found, save them into the empty directory path
      for (var i = 0; i < files_list.length; i++) {
        await this.downloadActivityCard(
          files_list[i].id,
          'Featured',
          files_list[i].name,
        );

        // once downloaded, check if the file exists. If it does, add the name to a .txt file, and add the path to pathArr
        if (await checkFileExists(path + files_list[i].id + '/')) {
          pathArr.push(path + files_list[i].id + '/');
        } else {
          throw new Error(
            'Error occurred in downloading a Featured Activity Card.',
          );
        }
      }

      return pathArr;
    } catch (e) {
      // There was an error, catch it and do something with it
      // console.error('ERROR IN LISTING FEATURED ACTIVITY CARDS: ' + e);
      if (e.toString() === 'Error: no wifi') {
        return 'no wifi';
      } else {
        return [];
      }
    }
  },

  /**
   * Given the Google Drive ID of an activity card, download the card
   * directly into local storage.
   * @param {String} id ID of the activity card to retrieve
   * @param {String} type Whether the activity card is a "Featured" or "Downloaded" card
   * @param {String} name Name of the activity card
   * @param {String} lessonplan Name of the lesson plan it should be downloaded in (if it's a "Downloaded" card)
   * @return {Promise<String>} The requested ActivityCard object
   */
  downloadActivityCard: async function (id, type, name, lessonplan = '') {
    // Assert that the "type" parameter is valid
    if (!(type === 'Featured' || type === 'Downloaded')) {
      throw new Error('Invalid type for Activity Card');
    }

    try {
      const params = {
        alt: 'media',
        responseType: 'arraybuffer',
      };

      // set up local file path depending on whether the card is Featured or Downloaded
      // if the card is featured, it goes into /FeaturedActivityCards/IMAGEID/...
      // if the card is downloaded, it goes into /LESSONPLANNAME/IMAGEID/...
      let dirPath;
      if (type === 'Featured') {
        dirPath = MAINDIRECTORY + '/FeaturedActivityCards/' + id;
      } else {
        if (
          await checkFileExists(MAINDIRECTORY + '/Favourited/' + lessonplan)
        ) {
          dirPath = MAINDIRECTORY + '/Favourited/' + lessonplan + '/' + id;
        } else {
          dirPath = MAINDIRECTORY + '/Default/' + lessonplan + '/' + id;
        }
      }

      const filePath = `${dirPath}/cardImage.jpg`;

      //check if file exists
      if (await checkFileExists(filePath)) {
        return filePath;
      }

      //set up the get URL, then call axios for response
      const downloadUrl =
        DRIVE_API_URLS.SEARCH_FILES +
        '/' +
        id +
        DRIVE_API_URLS.SEARCH_PARAMETERS;

      //get the response as an arrayBuffer to be read by RNFS
      const response = await axios
        .get(downloadUrl, { params: params, responseType: 'arraybuffer' })
        .catch(error => {
          if (error.code === 'ERR_NETWORK') {
            throw new Error('no wifi');
          } else {
            throw new Error(error);
          }
        });

      //make directory for the newly downloaded card, write the card into this path and return
      await makeDirectory(dirPath);
      // Write the .jpg file to the directory
      await writeFile(true, filePath, Buffer.from(response.data, 'base64'));
      // Add the name of the activity card into the cardName.txt file
      await writeFile(false, dirPath + '/cardName.txt', name + '\n');

      return `/${id}/cardImage.jpg`;
    } catch (e) {
      // console.error('ERROR IN DOWNLOADING ACTIVITY CARD: ' + e);
      if (e.toString() === 'Error: no wifi') {
        return 'no wifi';
      }
    }
  },

  /**
   * Add image from React-Native-Image-Picker to lesson plan's folder in RNFS
   *
   * @async
   * @param {String} base64 file of image
   * @param {String} fileName file name of image
   * @param {String} lessonPlan name of lesson plan we want to add it to
   * @returns {Promise<String>} relative path of the image
   */
  addImageToStorage: async function (base64, fileName, lessonPlan) {
    try {
      let dirPath;
      if (await checkFileExists(MAINDIRECTORY + '/Favourited/' + lessonPlan)) {
        dirPath = MAINDIRECTORY + '/Favourited/' + lessonPlan + '/' + fileName;
      } else if (
        await checkFileExists(MAINDIRECTORY + '/Default/' + lessonPlan)
      ) {
        dirPath = MAINDIRECTORY + '/Default/' + lessonPlan + '/' + fileName;
      } else {
        await makeDirectory(MAINDIRECTORY + '/Default/' + lessonPlan + '/');
        dirPath = MAINDIRECTORY + '/Default/' + lessonPlan + '/' + fileName;
      }

      await writeFile(true, dirPath, base64);
      // console.log('Went into: ' + dirPath);
      return {
        relPath: '/' + fileName,
        fullPath: dirPath,
      };
    } catch (error) {
      // console.error('Error adding image to local storage: ' + error);
    }
  },

  /**
   * get metadata on all activity cards
   *
   * @async
   * @returns {Promise<{id: string, name: string, thumbnailLink: string, description: string}[]>}
   */
  getAllActivityCards: async function () {
    const ACTVTTerm = " and fullText contains 'ACTVT'";
    return (
      await axios.get(DRIVE_API_URLS.SEARCH_FILES, {
        params: {
          trashed: 'false',
          supportsAllDrives: 'true',
          includeItemsFromAllDrives: 'true',
          fields: 'files(id, name, thumbnailLink, description)',
          q: "mimeType='image/jpeg' " + ACTVTTerm,
          pageSize: 1000,
        },
      })
    ).data.files;
  },

  /**
   * delete activity card from local storage
   *
   * @async
   * @param {String} jpgPath path of the activity card jpg to delete in the format `/${id}/cardImage.jpg` or `/${id.jpg}`
   * @param {String} lessonPlan name of the lesson plan to delete from
   * @param {Boolean} isLPFavorited if the lesson plan is located in the Favourited directory
   * @returns {Promise}
   */
  deleteActivityCard: async function (jpgPath, lessonPlan, isLPFavorited) {
    try {
      const dirID = jpgPath.split('/')[1];
      const filePath =
        MAINDIRECTORY +
        (isLPFavorited ? '/Favourited/' : '/Default/') +
        lessonPlan +
        '/' +
        dirID;

      // check if file exists first. if yes, use RNFS.unlink, otherwise throw an error
      if (await checkFileExists(filePath)) {
        await deleteFile(filePath);
        // console.log(`deleteActivityCard: Deleted ${dirID} successfully.`);
      } else {
        // console.error(`deleteActivityCard error: ${filePath} does not exist.`);
      }
    } catch (e) {
      // console.error('Error in deleting activity card: ' + e);
    }
  },
};

export default ActivityCardService;
