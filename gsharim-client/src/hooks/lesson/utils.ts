import { Chapter, Lesson, LessonMetadata } from "@eco8200/data-models";
import { updateLessonMetadata } from "api/lesson/updateLessonMetadata";
import { SetData } from "types/server/useServerData";
import { findIndexById } from "utils/common";
import { calcProgress } from "utils/course";
import { calcLessonProgress } from "utils/lesson/lessonProgress";

export async function onLessonMetaDataUpdate(
	newLessonMetadata: LessonMetadata,
	chapterId: string,
	lessonId: string,
	setChapter: SetData<Chapter>
): Promise<void> {
	setChapter((oldChapter) => {
		const chapterClone = { ...oldChapter };
		const lessonIndex = findIndexById(chapterClone.lessonsMetadata, lessonId);
		chapterClone.lessonsMetadata[lessonIndex] = newLessonMetadata;
		chapterClone.progress = calcProgress(oldChapter.lessonsMetadata);
		return chapterClone;
	});
	await updateLessonMetadata();
}

export async function onLessonUpdate(
	newLesson: Lesson,
	setLessonMetadata: SetData<LessonMetadata>
): Promise<void> {
	setLessonMetadata((oldLessonMetadata) => {
		return {
			...oldLessonMetadata,
			progress: calcLessonProgress(newLesson.tasksMetadata),
		};
	});
	await updateLessonMetadata();
}
