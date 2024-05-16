import { Chapter, Course, Lesson, LessonMetadata } from "@eco8200/data-models";
import { get } from "lodash-es";
import { findIndexById } from "utils/common";

export const getTaskIndex = (lesson: Lesson, taskId: string): number => {
	return findIndexById(lesson.tasksMetadata, taskId);
};

export const getTaskId = (lesson: Lesson, taskIndex: number): string => {
	const taskId = get(lesson, ["tasksMetadata", taskIndex, "id"]);

	return taskId;
};

export const getLessonMetadataByIndex = (
	chapter: Chapter,
	lessonIndex: number
): LessonMetadata => {
	const lessonMetadata = chapter.lessonsMetadata[lessonIndex];

	if (!lessonMetadata) throw new Error("lesson metadata not found");

	return lessonMetadata;
};

export const getLessonId = (
	course: Course,
	chapterIndex: number,
	lessonIndex: number
): string => {
	const lessonId = get(course, [
		"chapters",
		chapterIndex,
		"lessonsMetadata",
		lessonIndex,
		"id",
	]);

	return lessonId;
};

export const getChapterId = (course: Course, chapterIndex: number): string =>
	get(course, ["chapters", chapterIndex, "id"]);

export function getItemById<T extends { id: string }>(
	id: string,
	items: Array<T>
): T {
	const item = items.find((currentItem) => currentItem.id === id);

	if (!item) throw new Error("item not found");

	return item;
}
