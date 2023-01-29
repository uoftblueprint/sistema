import { createSlice } from '@reduxjs/toolkit';

export const lessonPlanSlice = createSlice({
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
    // addToSection - take in section name, type of content, and content
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
        [action.payload.section]: action.payload.content
      };
    }
  }
});

// Dispatch actions to "write" to redux
export const { addToSection, addToNote, removeFromSection } =
  lessonPlanSlice.actions;

// Selector actions to "read" from redux'
export const getLessonSection = (state, sectionName) => {
  return state[sectionName];
};

export default lessonPlanSlice.reducer;
