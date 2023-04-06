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
   * @return {String[]}
   */
  getFeaturedActivityCards: async function () {
    try {
      //Retrieve the last week from browser, convert to ISO for use in query
      const weekAgo = new Date(
        Date.now() - 15 * 24 * 60 * 60 * 1000,
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
      if (files_list.length !== 0) {
        await deleteFile(path);
        await makeDirectory(path);
      } else {
        return;
      }

      //if new cards were found, save them into the empty directory path
      for (var i = 0; i < files_list.length; i++) {
        await this.downloadActivityCard(files_list[i].id);

        //once downloaded, check if the file exists. If it does, add the name to a .txt file, and add the path to pathArr
        if (await checkFileExists(path + files_list[i].id + '/')) {
          const cardName = files_list[i].name;
          await writeFile(
            false,
            path + files_list[i].id + '/' + 'cardName.txt',
            cardName + '\n',
          );
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
   * @return {String} The requested ActivityCard object
   */
  downloadActivityCard: async function (id) {
    try {
      const params = {
        alt: 'media',
        responseType: 'arraybuffer',
      };
      const dirPath = MAINDIRECTORY + '/FeaturedActivityCards/' + id;
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
          console.log('ERROR IN DOWNLOADING ACTIVITY CARD: ' + error);
        });

      //make directory for the newly downloaded card, write the card into this path and return

      await makeDirectory(dirPath);
      await writeFile(true, filePath, Buffer.from(response.data, 'base64'));

      return filePath;
    } catch (e) {
      console.log('ERROR IN DOWNLOADING ACTIVITY CARD: ' + e);
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
};

export default ActivityCardService;
