import RNFS from 'react-native-fs';

export const SectionName = {
  warmUp: 'Warm Up',
  mainLesson: 'Main Lesson',
  coolDown: 'Cool Down',
  notes: 'Notes',
};

export const ModuleType = {
  text: 'text',
  activityCard: 'activityCard',
  link: 'link',
  image: 'image',
};

// LessonPlanService.js
export const MAINDIRECTORY = RNFS.DocumentDirectoryPath;

export const ImageFileExtensions = [
  '.jpg', 
  '.jpe', 
  '.jpe',
  '.jif', 
  '.jfif', 
  '.jfi',
  '.png',
  '.gif', 
  '.webp', 
  '.tiff', 
  '.tif',
  '.psd', 
  '.raw', 
  '.arw', 
  '.cr2', 
  '.nrw', 
  '.k25',
  '.bmp', 
  '.dip',
  '.heif', 
  '.heic',
  '.ind', 
  '.indd', 
  '.indt',
  '.jp2', 
  '.j2k', 
  '.jpf', 
  '.jpx', 
  '.jpm', 
  '.mj2',
  '.svg', 
  '.svgz',
  '.ai', 
  '.eps',
]