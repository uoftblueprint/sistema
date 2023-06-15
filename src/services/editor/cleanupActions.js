import ActivityCardService from "../ActivityCardService";
import LessonPlanService from "../LessonPlanService";
import store from '../configureStore';


/**
 * Handle cleanup actions before closing the lesson plan.
 * Includes deleting unused activity cards and handling a change in favorited/default directory.
 * @param {boolean} leaveBySave true if user pressed Save button to leave Editor
 */
const handleCleanupActions = async (leaveBySave) => {
    console.log(`LP CLEANUP: Cleaning up items before closing lesson plan....`);

    try {
        const lpObj = store.getState().lessonPlan;
        await deleteUnusedActivityCards(lpObj, leaveBySave);
        await handleFavChange(lpObj);
    } catch (e) {
        console.error(`handleCleanupActions: ${action}`);
    }
}

const deleteUnusedActivityCards = async (lp, leaveBySave) => {
    let toDelete = [];
    const acInitial = lp.initialActivityCards;
    const acCurr = lp.currActivityCards;

    if (leaveBySave) {
        // Only delete ACs on backend once changes are saved
        toDelete = acInitial.filter(card => !acCurr.includes(card));
    } else if (lp.isDirty) {
        // Discard changes like newly downloaded ACs that aren't being saved
        toDelete = acCurr.filter(card => !acInitial.includes(card));
    }

    console.log('List of ACs to delete: ', toDelete);

    // Delete all unused cards
    for (const jpgPath of toDelete) {
        try {
            await ActivityCardService.deleteActivityCard(jpgPath, lp.initialLessonPlanName, lp.isInitiallyFavorited);
        } catch (e) {
            console.warn(e);
        }
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

export default handleCleanupActions;