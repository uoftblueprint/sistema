import { AxiosError } from 'axios';

/**
 * Create a helper function which passes in the key from the json file, decrypts the corresponding value, and returns it
 */

/**
 * Depending on the type of error, appropriately print/log the AxiosError information. 
 * @param {AxiosError} error 
 */
export function printAxiosError(error) {
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
}