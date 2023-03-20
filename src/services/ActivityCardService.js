// placeholder file for Drive shenanigans woohoo!
import {
    checkFileExists,
    writeFile,
    makeDirectory,
    moveFile,
    deleteFile,
  } from './routes/Local';
  import { MAINDIRECTORY } from './constants';
  import { AccessToken } from './models';
  import axios from 'axios';
  import { DRIVE_API_URLS } from './config.json';
  ​
  const ActivityCardService = {
    // All APIs for ActivityCards should be here
    // Don't call RNFS directly here!
    // Instead, call a function from Local.js :~]
  ​
    /**
     * Returns array of file paths for this month's featured activity cards.
     * @return {String[]}
     */
    getFeaturedActivityCards: async function () {
      try {
        //Retrieve the last week from browser, convert to ISO for use in query
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toUTCString();
  ​
        //Set up GET url, query, and path to Featured Card directory
        var downloadUrl = DRIVE_API_URLS.SEARCH_FILES + DRIVE_API_URLS.SEARCH_PARAMETERS;
        const searchQuery = `modifiedTime >= '${weekAgo}' and (mimeType contains 'image/')`;
        var path = MAINDIRECTORY + '/FeaturedActivityCards/';
  ​
        //Retreive all Drive files meeting the params
        const response = await axios
          .get(downloadUrl, {
            q: searchQuery
          })
          .catch(error => {
            console.error('ERROR IN GETTING FEATURED ACTIVITY CARDS: ' + error);
        });
        
        //Access the Array of all files and set up path Array (to be returned)
        const driveFiles = response.data
        const files_list = driveFiles.files;
        var pathArr = [];
  ​
        //Delete anything that may currently be in the Featured Cards directory, make the new path with no contents
        if (files_list.length != 0) {
          await deleteFile(path);
          await makeDirectory(path);
        }else{
          return;
        }
        
        //if new cards were found, save them into the empty directory path
        for (var i = 0; i < files_list.length; i++) {
  ​
            await this.downloadActivityCard(files_list[i].id);
  ​
            //once downloaded, check if the file exists. If it does, move into Featured Cards directory, add the path to pathArr
            if (
              await checkFileExists(MAINDIRECTORY + '/' + files_list[i].id + '/')
            ) {
              await makeDirectory(path + '/' + files_list[i].id + '/');
              await moveFile(
                MAINDIRECTORY + '/' + files_list[i].id + '/',
                path + '/' + files_list[i].id + '/',
              );
              pathArr.push(path + '/' + files_list[i].id + '/');
            } else {
              throw new Error(
                'Error occurred in downloading a Featured Activity Card.',
              );
            }
        }
  ​
        return pathArr;
        
      } catch (e) {
        // There was an error, catch it and do something with it
        console.log('ERROR IN LISTING FEATURED ACTIVITY CARDS: ' + e);
      }
    },
  ​
    /**
     * Given the Google Drive ID of an activity card, download the card
     * directly into local storage.
     * @param {String} id ID of the activity card to retrieve
     * @return {String} The requested LessonPlan object
     */
    downloadActivityCard: async function (id) {
      try {
        var path = MAINDIRECTORY + '/' + id + '/';
        let card = {};
  ​
        //check if file exists
        if (await checkFileExists(path)) {
          throw new Error('This Activity Card is already downloaded');
        }
  ​
        //set up the get URL, then call axios for response
        const downloadUrl = DRIVE_API_URLS.SEARCH_FILES + '/'+ id + DRIVE_API_URLS.SEARCH_PARAMETERS;
  ​
        await axios
          .get(downloadUrl)
          .then(response => {
            card = response.data;
          })
          .catch(error => {
            console.error('ERROR IN DOWNLOADING ACTIVITY CARD: ' + error);
          });
  ​
  ​
        //make directory for the newly downloaded card, write the card into this path and return
        await makeDirectory(path);
        await writeFile(path, card);
        return path;
  ​
      } catch (e) {
        console.log('ERROR IN DOWNLOADING ACTIVITY CARD: ' + e);
      }
    },
  };
  ​
  export default ActivityCardService;