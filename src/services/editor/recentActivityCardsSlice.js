import { createSlice } from '@reduxjs/toolkit';

export const recentActivityCardsSlice = createSlice({
  name: 'recentActivityCards',
  initialState: {
    cardNames: [],
  },
  reducers: {
    appendCardName: (state, action) => {
      // Removes duplicate names
      const set = [...new Set([...state.cardNames, action.payload.trim()])];
      return {
        ...state,
        cardNames: set,
      };
    },
  },
});

// Dispatch actions to "write" to redux
export const { appendCardName } = recentActivityCardsSlice.actions;

// Selector actions to "read" from redux'
export const getCardNames = state => {
  try {
    return state.cardNames;
  } catch {
    // console.error(
    //   'getCardNames: Could not grab names of recently added/featured activity cards from redux.',
    // );
    return [];
  }
};

export default recentActivityCardsSlice.reducer;
