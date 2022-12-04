import axios from 'axios';
import { DRIVE_API_URLS } from '../config.json';
import { printAxiosError } from '../helpers';

/**
 * Test function to make sure access token works. Console logs list of files in drive.
 */
export async function listDriveFiles() {
  axios
    .get(DRIVE_API_URLS.SEARCH_FILES)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      printAxiosError(error);
    });
}