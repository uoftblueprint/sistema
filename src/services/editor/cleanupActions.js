import ActivityCardService from '../ActivityCardService';
import LessonPlanService from '../LessonPlanService';
import store from '../configureStore';

/**
 * Handle cleanup actions before closing the lesson plan.
 * Includes deleting unused image files and handling a change in favorited/default directory.
 * @param {boolean} leaveBySave true if user pressed Save button to leave Editor
 */
const handleCleanupActions = async leaveBySave => {
  console.log(`LP CLEANUP: Cleaning up items before closing lesson plan....`);

  try {
    const lpObj = store.getState().lessonPlan;
    await deleteUnusedImageFiles(lpObj, leaveBySave);
    await handleFavChange(lpObj);
    await removeEmptyLessonPlanDirectory(lpObj, leaveBySave);
  } catch (e) {
    console.error(`handleCleanupActions: ${e}`);
  }
};

/**
 * Delete any activity cards or self-uploaded images taking up space in storage that aren't being used anymore.
 * Cases to cover:
 * Case #1: Download image but discard changes without saving. --> newly downloaded image should be removed.
 * Case #2: User "deletes" an image. --> Image is only actually removed once they save.
 * @param {{lessonPlanName: string, initialLessonPlanName: string, initialImageFiles: string[], currImageFiles: string[], isInitiallyFavorited: boolean}} lp Lesson plan redux state
 * @param {boolean} leaveBySave true if user pressed Save button to leave Editor
 */
const deleteUnusedImageFiles = async (lp, leaveBySave) => {
  let imgKeep;

  if (leaveBySave) {
    // Compare ACs in RNFS with current AC state (source of truth since we're saving)
    imgKeep = lp.currImageFiles;
  } else if (lp.isDirty) {
    // Else, AC state when the LP was initially opened is our source of truth
    imgKeep = lp.initialImageFiles;
  }

  // Flag ACs to delete
  const imgRNFS = await LessonPlanService.getLessonPlanImages(
    lp.lessonPlanName,
  );
  const toDelete = imgRNFS.filter(card => !imgKeep.includes(card));

  if (toDelete.length != 0)
    console.log(
      'deleteUnusedImageFiles: Found the following unused images ',
      toDelete,
    );

  // Delete all unused cards
  for (const jpgPath of toDelete) {
    try {
      await ActivityCardService.deleteActivityCard(
        jpgPath,
        lp.initialLessonPlanName,
        lp.isInitiallyFavorited,
      );
    } catch (e) {
      console.warn(
        `deleteUnusedImageFiles: Tried to delete ${jpgPath} but failed. `,
        e,
      );
    }
  }
};

/**
 * Handle a change to favorite or unfavorite the lesson plan from the editor.
 * Done as a cleanup to avoid expense of constantly moving files during editing.
 * @param {{isInitiallyFavorited: boolean, isCurrentlyFavorited: boolean}} lp Lesson plan redux state
 */
const handleFavChange = async lp => {
  if (lp.isInitiallyFavorited !== lp.isCurrentlyFavorited) {
    console.log(`LP CLEANUP: Favorite directory change detected`);
    if (lp.isCurrentlyFavorited) {
      await LessonPlanService.favouriteLessonPlan(lp.lessonPlanName);
    } else {
      await LessonPlanService.unfavouriteLessonPlan(lp.lessonPlanName);
    }
  }
};

/**
 * Removes a lesson plan that had its directory created (usually if an image was downloaded) but is otherwise empty.
 * You can still save and open a "blank" lesson plan, because pressing save will create a .json file that populates the directory.
 * @param {{lessonPlanName: string, isCurrentlyFavorited: boolean}} lp Lesson plan redux state
 * @param {boolean} leaveBySave true if user pressed Save button to leave Editor
 */
const removeEmptyLessonPlanDirectory = async (lp, leaveBySave) => {
  // Check that the directory exists and is empty
  if (
    !leaveBySave &&
    (await LessonPlanService.isLessonPlanDirectoryEmpty(
      lp.lessonPlanName,
      lp.isCurrentlyFavorited,
    ))
  ) {
    // Remove entire lp directory if so
    console.log(`removeEmptyLessonPlanDirectory: ${lp.lessonPlanName}`);
    LessonPlanService.deleteLessonPlan(lp.lessonPlanName);
  }
};

export default handleCleanupActions;
