import Local, {checkFileExists,
        writeFile,
        makeDirectory,
        moveFile
      } from './routes/Local';
import { MAINDIRECTORY } from './constants';
import { AccessToken } from './models';
import axios from 'axios';
import { DRIVE_API_URLS } from '../config.json';

const ActivityCardService = {
  // All APIs for ActivityCards should be here
  // Don't call RNFS directly here!
  // Instead, call a function from Local.js :~]

  // const auth = await google.auth.getClient({
  //   credentials: YOUR_AUTH_CREDENTIALS,
  //   scopes: ['https://www.googleapis.com/auth/drive'],
  // });


  /**
 * Returns array of file paths for this month's featured activity cards.
 * @return {String[]}
 */
  getFeaturedActivityCards: async function () {
    try {

      //Retrieve current year and month from browser
      const today = new Date();
      var currYear = String(today.getFullYear());
      var currMonth = String(today.getMonth() + 1).padStart(2, '0'); //Account for January being '0'

      //Set up GET url and path to Featured Card directory
      var downloadUrl = DRIVE_API_URLS.SEARCH_FILES + "supportsAllDrives=true&trashed=false&includeItemsFromAllDrives=true&fields=files(id,kind,driveId,mimeType,teamDriveId,name,createdTime)";
      var path = MAINDIRECTORY + '/FeaturedActivityCards/'

      //Delete anything that may currently be in the Featured Cards directory, make the new path with no contents
      if(await checkFileExists(path)){
        await deleteFile(path);
      }
      await makeDirectory(path);
  
      //Retreive all Drive files
      await axios
      .get(downloadUrl)
      .then(response => {
        const driveFiles = response.data;
      })
      .catch(error => {
        console.error('ERROR OCCURRED: '+ error);
      });
      
      //Access the Array of all files and set up path Array (to be returned)
      const files_list = driveFiles.files;
      var pathArr = [];

      //Check upload time of each file retrived, match to current month & year
      for(var i=0; i<files_list.length; i++){

        //Read the createdTime param from Google Drive API (in ISO8601 format, so 'new Date' works here)
        const cardUploadDate = new Date(files_list[i].createdTime);
        const cardMonth = String(cardUploadDate.getMonth() + 1).padStart(2, '0');
        const cardYear = String(cardUploadDate.getFullYear());
        
        //download the Card and move it to the Featured Cards directory if
        // 1. file is a .jpg (meaning it's a card)
        // 2. Card was uploaded in the current month of the current year
        if(files_list[i].mimeType == "image/jpeg" && cardMonth == currMonth && cardYear == currYear){
          await this.downloadActivityCard(files_list[i].id);

          //once downloaded, check if the file exists. If it does, move into Featured Cards directory, add the path to pathArr
          if (await checkFileExists(MAINDIRECTORY + '/' + files_list[i].id + '/')) {
            await makeDirectory(path + '/' + files_list[i].id + '/');
            await moveFile(MAINDIRECTORY + '/' + files_list[i].id + '/', path + '/' + files_list[i].id + '/');
            pathArr.push(path + '/' + files_list[i].id + '/');
          }else{
            throw new Error('Error occurred in downloading a Featured Activity Card.')
          }
        }
      }

      return pathArr;
     
    } catch (e) {
      // There was an error, catch it and do something with it
      console.log("ERROR IN LISTING FEATURED ACTIVITY CARDS: " + e);
    }
  },

   /**
   * Given the Google Drive ID of an activity card, download the card
   * directly into local storage.
   * @param {String} id ID of the activity card to retrieve
   * @return {String} The requested LessonPlan object
   */
  downloadActivityCard: async function (id) {
    try {
        var path = MAINDIRECTORY + '/' + id + '/';

        if(await checkFileExists(path)){
          throw new Error('This Activity Card is already downloaded');
        }

        const downloadUrl = DRIVE_API_URLS.SEARCH_FILES+id+'?supportsAllDrives=true&trashed=false&includeItemsFromAllDrives=true';
        
        axios
        .get(downloadUrl)
        .then(response => {
          const card = response.data;
        })
        .catch(error => {
          console.error('ERROR OCCURRED: '+ error);
        });
          
        await makeDirectory(path);
        
        await writeFile(path, card);
        
        return path;

    } catch (e) {
      console.log("ERROR IN DOWNLOADING ACTIVITY CARD: " + e);
    }
  }

};

export default ActivityCardService;

