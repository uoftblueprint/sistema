import axios from 'axios';

/**
 * Test function to make sure access token works. Console logs list of files in drive.
 */
export async function listDriveFiles() {
  axios.get('https://www.googleapis.com/drive/v3/files/')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error(`STATUS ${error.response.status}`, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('NO RESPONSE', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('UNKNOWN ERROR', error.message);
      }
      console.log('Full error log:', error.toJSON());
    });
}