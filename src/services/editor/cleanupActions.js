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
    // TODO: add acInitial and acCurr inside redux
    // see what ac obj I need to save? id? name? both?
    
    let toDelete = [];
    if (leaveBySave) {
        // Only delete ACs on backend once changes are saved
        toDelete = acInitial.filter(card => !acCurr.includes(card));
    } else if (lp.isDirty) {
        // Discard changes like newly downloaded ACs that aren't being saved
        toDelete = acCurr.filter(card => !acInitial.includes(card));
    }

    // Delete all unused cards
    for (card of toDelete) {
        // TODO
        // await ActivityCardService.deleteActivityCard()
        // make sure to pass in lp.isInitiallyFavorited to find directory
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