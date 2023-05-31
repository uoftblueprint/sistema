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
};

// LessonPlanService.js
export const MAINDIRECTORY = RNFS.DocumentDirectoryPath;
export const ANDROIDDOWNLOADDIRECTORY = RNFS.DownloadDirectoryPath;
