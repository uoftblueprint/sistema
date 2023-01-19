import Local from '../routes/Local';

const LessonPlanService = {
    // All APIs for LessonPlan should be here
    // Hint: check the Wiki in the repo!
    // Use JS Promise syntax to write clean complex calls
    setLessonPlanName: async function(newLessonPlanName) {
        try {
            // Write to RNFS
        } catch (e) {
            // There was an error
        }
    },
    saveLessonPlan: async function(newLessonPlan) {
        try {
            // Write to RNFS
            // use .then in promise syntax to write "chain" calls to RNFS
        } catch (e) {
            // Capture error and return
        }
    },
    getLessonPlan: async function(lessonPlanName) {
        try {
            // GET from RNFS
        } catch (e) {
            // Capture error and return
        }
    },
    getAllLessonPlanNames: async function() {
        try {
            // GET from RNFS
        } catch (e) {
            // Capture error and return
        }
    },
    deleteLessonPlan: async function(lessonPlanName) {
        try {
            // Make call to RNFS
        } catch (e) {
            // Capture error and return
        }
    }
};

export default LessonPlanService;
