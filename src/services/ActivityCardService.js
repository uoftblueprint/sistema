import {
  checkFileExists,
  writeFile,
  makeDirectory,
  moveFile,
  deleteFile,
} from './routes/Local';
import { MAINDIRECTORY } from './constants';
import { AccessToken } from './models';
import { Buffer } from 'buffer';
import axios from 'axios';
import { DRIVE_API_URLS } from './config.json';

const ActivityCardService = {
  // All APIs for ActivityCards should be here
  // Don't call RNFS directly here!
  // Instead, call a function from Local.js :~]

  /**
   * Returns array of file paths for this month's featured activity cards.
   * @return {String[]}
   */
  getFeaturedActivityCards: async function () {
    try {
      //Retrieve the last week from browser, convert to ISO for use in query
      const weekAgo = new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000,
      ).toISOString();

      //Set up GET url, query, and path to Featured Card directory
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

      //Retreive all Drive files meeting the params
      const response = await axios.get(downloadUrl, { params }).catch(error => {
        console.log('ERROR IN GETTING FEATURED ACTIVITY CARDS: ' + error);
      });

      //Access the Array of all files and set up path Array (to be returned)
      const driveFiles = response.data;
      const files_list = driveFiles.files;
      var pathArr = [];

      if (files_list.length == 0) {
        return [];
      }

      //Delete anything that may currently be in the Featured Cards directory, make the new path with no contents
      if (files_list.length != 0 && (await checkFileExists(path))) {
        await deleteFile(path);
        await makeDirectory(path);
      }

      //if new cards were found, save them into the empty directory path
      for (var i = 0; i < files_list.length; i++) {
        this.downloadActivityCard(
          files_list[i].id,
          'Featured',
          files_list[i].name,
        );

        //once downloaded, check if the file exists. If it does, add the name to a .txt file, and add the path to pathArr
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
      console.log('ERROR IN LISTING FEATURED ACTIVITY CARDS: ' + e);
      return [];
    }
  },

  /**
   * Given the Google Drive ID of an activity card, download the card
   * directly into local storage.
   * @param {String} id ID of the activity card to retrieve
   * @param {String} type Whether the activity card is a "Featured" or "Downloaded" card
   * * @param {String} name Name of the activity card
   * @return {String} The requested ActivityCard object
   */
  downloadActivityCard: async function (id, type, name) {
    if (!(type === 'Featured' || type === 'Downloaded')) {
      throw new Error('Invalid type for Activity Card');
    }

    try {
      const params = {
        alt: 'media',
        responseType: 'arraybuffer',
      };

      const dirPath =
        type === 'Featured'
          ? MAINDIRECTORY + '/FeaturedActivityCards/' + id
          : MAINDIRECTORY + '/DownloadedActivityCards/' + id;
      const filePath = `${dirPath}/cardImage.jpg`;

      //check if file exists
      if (await checkFileExists(filePath)) {
        throw new Error('This Activity Card is already downloaded');
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
          console.error('ERROR IN DOWNLOADING ACTIVITY CARD: ' + error);
        });

      await makeDirectory(dirPath);
      // Write the .jpg file to the directory
      await writeFile(true, filePath, Buffer.from(response.data, 'base64'));
      // Add the name of the activity card into the cardName.txt file
      await writeFile(false, dirPath + '/cardName.txt', name + '\n');

      return filePath;
    } catch (e) {
      console.error('ERROR IN DOWNLOADING ACTIVITY CARD: ' + e);
    }
  },
};

export default ActivityCardService;
