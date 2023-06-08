import LessonPlanService from "../LessonPlanService";
import store from '../configureStore';


/**
 * Handle cleanup actions before closing the lesson plan.
 * Includes deleting unused activity cards and handling a change in favorited/default directory.
 */
const handleCleanupActions = () => {
    console.log(`LP CLEANUP: Cleaning up items before closing lesson plan....`);

    try {
        const lpObj = store.getState().lessonPlan;
        deleteUnusedActivityCards(lpObj);
        handleFavChange(lpObj);
    } catch (e) {
        console.error(`handleCleanupActions: ${action}`);
    }
}

/**
 * Handle a change to favorite or unfavorite the lesson plan from the editor. 
 * Done as a cleanup to avoid expense of constantly moving files during editing. 
 * @param {{isInitiallyFavorited: boolean, isCurrentlyFavorited: boolean}} lp 
 */
const handleFavChange = async (lp) => {
    if (lp.isInitiallyFavorited !== lp.isCurrentlyFavorited) {
        console.log(`LP CLEANUP: Favorite directory change detected`);
        if (lp.isCurrentlyFavorited) {
            await LessonPlanService.favouriteLessonPlan(lp.lessonPlanName);
        } else {
            await LessonPlanService.unfavouriteLessonPlan(lp.lessonPlanName);
        }
    }
}

const deleteUnusedActivityCards = () => {
    // TODO: 
    // 1. arr1 = get a list of all activity cards in the directory (RNFS)
    // 2. arr2 = get a list of all activity cards in the lp (check json file/initial state)
    // difference between intial state of LP and redux
    // 3. remove any ACs in arr1 that aren't in arr2
}

export default handleCleanupActions;