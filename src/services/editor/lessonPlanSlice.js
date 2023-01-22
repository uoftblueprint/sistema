import { createSlice } from '@reduxjs/toolkit';
import { AccessToken } from '../models';
import SectionName from '../constants';

export const authSlice = createSlice({
  name: 'lessonPlan',
  // initialState: {
  //   warmUp: [{type: "text", content: "C-minor, F-sharp"}, {type: "activityCard", content:"/path/to/activityCard"}]
  //   mainLesson: [],
  //   coolDown: [],
  //   notes: "Remember to take attendance",
  //   isDirty: false
  // }
  initialState: {
    warmUp: [], // [{type: "", content: ""}
    mainLesson: [],
    coolDown: [],
    notes: '',
    isDirty: false // TODO: wipe the entire lessonPlan state store to default when you exit the editor
  },
  reducers: {
    // addToSection - take in section name, and
    addToSection: (state, action) => {
      // payload is string (text or activity card path)
      // action.payload: {
      //     section: SectionName.coolDown,
      //     type: "text" or "activityCard"
      //     content: "",
      // }
      return {
        ...state,
        isDirty: true,
        [action.payload.section]: [
          ...state[action.payload.section],
          {
            type: action.payload.type,
            content: action.payload.content
          },
        ]
      };
    },
    removeFromSection: (state, action) => {
      const section = action.payload.section;
      const indx = state[section].findIndex(
        e => e.content === action.payload.content
      );
      return {
        ...state,
        [action.payload.section]: state[section].splice(indx, indx >= 0 ? 1 : 0)
      };
    }
  }
});

// Dispatch actions to "write" to redux
export const { addToSection, removeFromSection } = authSlice.actions;

// Selector actions to "read" from redux
export const selectLessonPlan = (state, sectionName) => state[sectionName]; //give state and section name to get the section content

export default authSlice.reducer;
