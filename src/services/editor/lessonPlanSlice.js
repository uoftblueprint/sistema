import { createSlice } from '@reduxjs/toolkit';

export const lessonPlanSlice = createSlice({
  name: 'lessonPlan',
  initialState: {
    warmUp: [], // [{type: "text", content: "..."} where type: "text" or "activityCard"
    mainLesson: [],
    coolDown: [],
    notes: '',
    isDirty: false // TODO: wipe the entire lessonPlan state store to default when you exit the editor
  },
  reducers: {
    addToSection: (state, action) => {
      // action.payload: {
      //     section: SectionName.coolDown,
      //     type: "text" or "activityCard"
      //     content: "",
      // }
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          {
            type: action.payload.type,
            content: action.payload.content
          },
        ],
        isDirty: true,
      };
    },
    removeFromSection: (state, action) => {
      const section = action.payload.section;
      const indx = state[section].findIndex(
        e => e.content === action.payload.content
      );
      return {
        ...state,
        isDirty: true,
        [action.payload.section]: state[section].filter((_, i) => i != indx)
      };
    },
    addToNote: (state, action) => {
      return {
        ...state,
        notes: action.payload.content
      };
    },
    removeNote: (state, _) => {
      return {
        ...state,
        notes: ''
      };
    }
  }
});

// Dispatch actions to "write" to redux
export const { addToSection, removeFromSection, addToNote, removeNote } =
  lessonPlanSlice.actions;

// Selector actions to "read" from redux'
export const getLessonSection = (state, sectionName) => {
  return state[sectionName];
};

export default lessonPlanSlice.reducer;
