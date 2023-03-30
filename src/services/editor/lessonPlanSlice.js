import { createSlice } from '@reduxjs/toolkit';
import { SectionName } from '../constants';
import { grabNextKey } from '../helpers';


export const lessonPlanSlice = createSlice({
  name: 'lessonPlan',
  /**
   * See all { SectionName, ModuleType } constants in ../services/constants.js.
   * Each section except for Notes is an array of { type, content, key }[] where:
   * @property {ModuleType} type
   * @property {string} content
   * @property {string} key Unique in that section. For example, 'module-0'.
   */
  initialState: {
    [SectionName.warmUp]: [], 
    [SectionName.mainLesson]: [],
    [SectionName.coolDown]: [],
    [SectionName.notes]: '',
    isDirty: false, // TODO: wipe the entire lessonPlan state store to default when you exit the editor
  },
  reducers: {
    replaceSection: (state, action) => {
      // action.payload: {       
      //     section: SectionName.warmUp || SectionName.mainLesson || SectionName.coolDown
      //     allData: { type, content, key }[]
      // }

      // TODO: Do some error handling. Confirm that every module is properly formed
        // Check that it has 3 properties [type, section, content]
          // If only missing key property, grab next unique key
          // Else, remove module
        // Check that all keys are unique
      return {
        ...state,
        [action.payload.section]: action.payload.allData,
        isDirty: true,
      };
    },
    addToSection: (state, action) => {
      // action.payload: {       
      //     section: SectionName.warmUp || SectionName.mainLesson || SectionName.coolDown
      //     type: ModuleType.text || ModuleType.activityCard
      //     content: "",
      // }
      const listOfKeys = state[action.payload.section].map(({ key }) => key); // Get a list of all keys in the section
      const nextKey = grabNextKey(listOfKeys);
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          {
            type: action.payload.type,
            content: action.payload.content,
            key: nextKey,
          },
        ],
        isDirty: true,
      };
    },
    removeFromSection: (state, action) => { // TODO: remove if not being used anymore
      const section = action.payload.section;
      const indx = state[section].findIndex(
        e => e.content === action.payload.content,
      );
      return {
        ...state,
        isDirty: true,
        [action.payload.section]: state[section].filter((_, i) => i !== indx),
      };
    },
    addToNote: (state, action) => {
      return {
        ...state,
        notes: action.payload.content,
      };
    },
    removeNote: (state, _) => {
      return {
        ...state,
        notes: '',
      };
    },
  },
});

// Dispatch actions to "write" to redux
export const { addToSection, removeFromSection, addToNote, removeNote, replaceSection } =
  lessonPlanSlice.actions;

// Selector actions to "read" from redux'
export const getLessonSection = (state, sectionName) => {
  try {
    return state[sectionName];
  } catch {
    console.error(`getLessonSection: Could not grab lesson plan section ${sectionName} from redux.`);
    return [];
  }
};

export default lessonPlanSlice.reducer;
