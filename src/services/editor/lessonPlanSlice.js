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
   *
   * Only the "link" type module has an extra param:
   * @property {string} title
   */
  initialState: {
    lessonPlanName: '',
    initialLessonPlanName: '',
    [SectionName.warmUp]: [],
    [SectionName.mainLesson]: [],
    [SectionName.coolDown]: [],
    [SectionName.notes]: '',
    isDirty: false,
    isInitiallyFavorited: null,
    isCurrentlyFavorited: null,
    initialImageFiles: [],
    currImageFiles: [],
  },
  reducers: {
    /**
     * Load the redux store with a data from an existing lesson plan.
     * isDirty stays false.
     * @property {Object} action.payload
     */
    loadInitialLessonPlan: (state, action) => {
      return {
        ...state,
        lessonPlanName: action.payload.lessonPlanName,
        initialLessonPlanName: action.payload.lessonPlanName,
        [SectionName.warmUp]: action.payload[SectionName.warmUp],
        [SectionName.mainLesson]: action.payload[SectionName.mainLesson],
        [SectionName.coolDown]: action.payload[SectionName.coolDown],
        [SectionName.notes]: action.payload[SectionName.notes] ?? '',
        isDirty: false,
        initialImageFiles: action.payload.initialImageFiles,
        currImageFiles: action.payload.initialImageFiles,
      };
    },

    setLessonPlanName: (state, action) => {
      return {
        ...state,
        lessonPlanName: action.payload.name,
        isDirty: action.payload.isDirty,
      };
    },

    setInitialLessonPlanName: (state, action) => {
      return {
        ...state,
        initialLessonPlanName: action.payload.name,
      };
    },

    /**
     * action.payload: { section: SectionName, allData: { type, content, key,... }[] }
     */
    replaceSection: (state, action) => {
      return {
        ...state,
        [action.payload.section]: action.payload.allData,
        isDirty: true,
      };
    },

    /**
     * action.payload: { section: SectionName, type: ModuleType, content: String }
     */
    addToSection: (state, action) => {
      const listOfKeys = state[action.payload.section].map(({ key }) => key); // Get a list of all keys in the section
      const nextKey = grabNextKey(listOfKeys);
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          {
            type: action.payload.type,
            content: action.payload.content,
            name: action.payload.name ?? '',
            id: action.payload.id ?? '',
            path: action.payload.path ?? '',
            title: action.payload.title ?? '',
            key: nextKey,
          },
        ],
        isDirty: true,
      };
    },

    replaceNote: (state, action) => {
      return {
        ...state,
        [SectionName.notes]: action.payload,
        isDirty: true,
      };
    },

    loadInitialFavState: (state, action) => {
      return {
        ...state,
        isInitiallyFavorited: action.payload,
        isCurrentlyFavorited: action.payload,
      };
    },

    setFavState: (state, action) => {
      return {
        ...state,
        isCurrentlyFavorited: action.payload,
      };
    },

    setCurrImageFiles: (state, action) => {
      return {
        ...state,
        currImageFiles: action.payload,
      };
    },

    reset: () => {
      // console.log('Reseting redux...');
      return {
        lessonPlanName: '',
        initialLessonPlanName: '',
        [SectionName.warmUp]: [],
        [SectionName.mainLesson]: [],
        [SectionName.coolDown]: [],
        [SectionName.notes]: '',
        isDirty: false,
        isInitiallyFavorited: null,
        isCurrentlyFavorited: null,
        initialImageFiles: [],
        currImageFiles: [],
      };
    },
  },
});

// Dispatch actions to "write" to redux
export const {
  addToSection,
  removeFromSection,
  replaceNote,
  replaceSection,
  setLessonPlanName,
  setInitialLessonPlanName,
  loadInitialLessonPlan,
  loadInitialFavState,
  setFavState,
  setCurrImageFiles,
  reset,
} = lessonPlanSlice.actions;

// Selector actions to "read" from redux'
export const getLessonSection = (state, sectionName) => {
  try {
    return state[sectionName];
  } catch {
    // console.error(
    //   `getLessonSection: Could not grab lesson plan section ${sectionName} from redux.`,
    // );
    return [];
  }
};

export const getLessonPlanName = state => {
  try {
    return state.lessonPlanName;
  } catch {
    // console.error(
    //   'getLessonPlanName: Could not grab lesson plan name from redux.',
    // );
    return '';
  }
};

export const getDirty = state => {
  return state.isDirty;
};

export const getInitialLessonPlanName = state => {
  return state.initialLessonPlanName;
};

export const getLessonPlan = state => {
  try {
    const removeModuleKey = module => {
      const { key, path, ...rest } = module; // using rest parameter to store properties other than key
      return rest;
    };
    const warmUp = state[SectionName.warmUp].map(removeModuleKey);
    const mainLesson = state[SectionName.mainLesson].map(removeModuleKey);
    const coolDown = state[SectionName.coolDown].map(removeModuleKey);

    return {
      lessonPlanName: state.lessonPlanName,
      [SectionName.warmUp]: warmUp,
      [SectionName.mainLesson]: mainLesson,
      [SectionName.coolDown]: coolDown,
      [SectionName.notes]: state[SectionName.notes],
    };
  } catch {
    // console.error('getLessonPlan: Could not grab lesson plan from redux.');
    return {};
  }
};

export const getInitialFavState = state => {
  return state.isInitiallyFavorited;
};

export const getCurrFavState = state => {
  return state.isCurrentlyFavorited;
};

export const getCurrImageFiles = state => {
  return state.currImageFiles;
};

export default lessonPlanSlice.reducer;
