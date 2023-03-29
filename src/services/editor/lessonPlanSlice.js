import { createSlice } from '@reduxjs/toolkit';
import { SectionName } from '../constants';

export const lessonPlanSlice = createSlice({
  name: 'lessonPlan',
  initialState: {
    [SectionName.warmUp]: [], // [{type: "text", content: "..."} where type is ModuleType.text || ModuleType.activityCard
    [SectionName.mainLesson]: [],
    [SectionName.coolDown]: [],
    [SectionName.notes]: '',
    isDirty: false, // TODO: wipe the entire lessonPlan state store to default when you exit the editor
  },
  reducers: {
    addToSection: (state, action) => {
      // See constants in ../services/constants.js
      // action.payload: {       
      //     section: SectionName.warmUp || SectionName.mainLesson || SectionName.coolDown
      //     type: ModuleType.text || ModuleType.activityCard
      //     content: "",
      // }
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          {
            type: action.payload.type,
            content: action.payload.content,
          },
        ],
        isDirty: true,
      };
    },
    removeFromSection: (state, action) => {
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
export const { addToSection, removeFromSection, addToNote, removeNote } =
  lessonPlanSlice.actions;

// Selector actions to "read" from redux'
export const getLessonSection = (state, sectionName) => {
  return state[sectionName];
};

export default lessonPlanSlice.reducer;
