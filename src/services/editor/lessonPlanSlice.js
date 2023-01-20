import { createSlice } from '@reduxjs/toolkit';
import { AccessToken } from '../models';
import SectionName from 'constants';

export const authSlice = createSlice({
  name: 'lessonPlan',
  initialState: {
    warmUp: [], // [{type: "", content: ""}, {}] // TODO: create an entity/model
    mainLesson: [],
    coolDown: [],
    notes: "",
    isDirty: false // TODO: wipe the entire lessonPlan state store to default when you exit the editor
  },
  reducers: {
    // addToSection - take in section name, and 
    addToSection: (state, action) => {  // payload is string (text or activity card path) 
        // {
        //     section: SectionName.coolDown,
        //     type: text or activity card
        //     content: "",
        // } // TODO: make as model maybe?

        return { 
            ...state,
            isDirty: true,
            [action.payload.section]: [...state[action.payload.section], {
                type: action.payload.type,
                content: action.payload.content
            }]
        }
    }
    // removeFromSection:
  }
});

// Dispatch actions to "write" to redux
export const { addToSection } = authSlice.actions;

// Selector actions to "read" from redux
export const selectLessonPlan = (state, sectionName) => state[sectionName]

export default authSlice.reducer;
