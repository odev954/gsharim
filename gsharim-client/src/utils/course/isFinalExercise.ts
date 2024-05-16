import { Chapter, LessonMetadata } from "@eco8200/data-models";

export const isFinalExercise = (
	lessonMetadata: LessonMetadata,
	chapter: Chapter
): boolean => {
	return lessonMetadata.id === chapter.finalExercise?.id;
};
