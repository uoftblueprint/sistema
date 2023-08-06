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
        await removeEmptyLessonPlanDirectory(lpObj, leaveBySave);
    } catch (e) {
        console.error(`handleCleanupActions: ${action}`);
    }
}

/**
 * Delete any activity cards taking up space in storage that aren't being used anymore. 
 * Case #1: Download AC but discard changes without saving --> newly downloaded AC should be removed.
 * Case #2: User "deletes" an AC. AC is only actually removed once they save.
 * @param {{lessonPlanName: string, initialLessonPlanName: string, initialActivityCards: string[], currActivityCards: string[], isInitiallyFavorited: boolean}} lp 
 * @param {*} leaveBySave 
 */
const deleteUnusedActivityCards = async (lp, leaveBySave) => {
    let toDelete = [];
    const acInitial = lp.initialActivityCards;

    if (leaveBySave) {
        // Flag ACs that the current state of the LP no longer needs
        const acCurr = lp.currActivityCards;
        toDelete = acInitial.filter(card => !(acCurr.includes(card)));
    } else if (lp.isDirty) {
        // Flag ACs on the backend that are unused (added briefly but not saved)
        const acRNFS = await LessonPlanService.getLessonPlanImages(lp.lessonPlanName);
        toDelete = acRNFS.filter(card => !(acInitial.includes(card)));
    }

    if (toDelete.length != 0) console.log('deleteUnusedActivityCards: Found the following unused ACs ', toDelete);

    // Delete all unused cards
    for (const jpgPath of toDelete) {
        try {
            await ActivityCardService.deleteActivityCard(jpgPath, lp.initialLessonPlanName, lp.isInitiallyFavorited);
        } catch (e) {
            console.warn(`deleteUnusedActivityCards: Tried to delete ${jpgPath} but failed. `, e);
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

/**
 * Removes a lesson plan that had its directory created (usually if an image was downloaded) but is otherwise empty. 
 * You can still save and open a "blank" lesson plan, because pressing save will create a .json file that populates the directory.
 * @param {{lessonPlanName: string, isCurrentlyFavorited: boolean}} lp 
 * @param {boolean} leaveBySave 
 */
const removeEmptyLessonPlanDirectory = async (lp, leaveBySave) => {
    // Check that the directory exists and is empty
    if (!leaveBySave && await LessonPlanService.isLessonPlanDirectoryEmpty(lp.lessonPlanName, lp.isCurrentlyFavorited)) {
        // Remove entire lp directory if so
        console.log(`removeEmptyLessonPlanDirectory: ${lp.lessonPlanName}`);
        LessonPlanService.deleteLessonPlan(lp.lessonPlanName);
    }

}

export default handleCleanupActions;