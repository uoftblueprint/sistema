/**
 * Depending on the type of error, appropriately print/log the AxiosError information.
 * @param {import("axios").AxiosError} error
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

/**
 * Returns the next unique key for a module inside the lesson plan section.
 * @param {string[]} currKeys list of all current keys inside the section
 * @returns module key in format module-\<num\>
 */
export const grabNextKey = currKeys => {
  if (currKeys.length <= 0) {
    return 'module-0'; // If empty, return starting key number
  }

  const regexp = /module-([0-9]+)/; // Use regex to extract the number in the moduleKey string
  let allKeyNums = [];

  currKeys.forEach(moduleKey => {
    const matches = [...moduleKey.match(regexp)];
    allKeyNums.push(Number(matches[1])); // Append to array of all numbers
  });

  // Take the max of the collected nums and plus one to get next unique number
  const currMax = Math.max(...allKeyNums);
  return `module-${currMax + 1}`;
};
