import { Course, Lesson } from "@eco8200/data-models";
import { ScrollOptions, buildUrlProps } from "./types";
import { getChapterId, getLessonId, getTaskId } from "./getters";

export const coursesCatalogUrl = "/course-catalog";
export const baseCourseRoadmapUrl = "/course-roadmap";

function buildCourseChapterScrollUrl(chapterId: string): string {
	return `?chapterId=${chapterId}`;
}

function buildCourseLessonScrollUrl(lessonId: string | undefined): string {
	return `?lessonId=${lessonId}`;
}
export function buildCourseRoadmapUrl(
	courseId: string,
	scroll?: ScrollOptions
): string {
	let url = `${baseCourseRoadmapUrl}/${courseId}`;
	if (scroll?.type === "lesson") {
		url += buildCourseLessonScrollUrl(scroll.id);
	}
	if (scroll?.type === "chapter") {
		url += buildCourseChapterScrollUrl(scroll.id);
	}
	return url;
}

export function buildUrl({
	courseId,
	chapterId,
	lessonId,
	taskId,
}: buildUrlProps): string {
	if (chapterId && lessonId && taskId) {
		return `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/task/${taskId}`;
	}

	if (chapterId && lessonId) {
		return `/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`;
	}

	if (chapterId) {
		return `/course/${courseId}/chapter/${chapterId}`;
	}

	return `/course/${courseId}`;
}

export const buildChapterUrlWithIndex = (
	course: Course,
	chapterIndex: number
): string => {
	const chapterId = getChapterId(course, chapterIndex);

	const chapterUrl = buildUrl({ courseId: course.id, chapterId });

	return chapterUrl;
};

export const buildLessonUrlWithIndex = (
	course: Course,
	chapterIndex: number,
	lessonindex: number
): string => {
	const chapterId = getChapterId(course, chapterIndex);
	const lessonId = getLessonId(course, chapterIndex, lessonindex);

	const lessonUrl = buildUrl({
		courseId: course.id,
		chapterId,
		lessonId,
	});

	return lessonUrl;
};

export const buildTaskUrlWithIndex = (
	course: Course,
	lesson: Lesson,
	chapterIndex: number,
	lessonindex: number,
	taskIndex: number
): string => {
	const chapterId = getChapterId(course, chapterIndex);
	const lessonId = getLessonId(course, chapterIndex, lessonindex);
	const newTaskId = getTaskId(lesson, taskIndex);

	const taskUrl = buildUrl({
		courseId: course.id,
		chapterId,
		lessonId,
		taskId: newTaskId,
	});

	return taskUrl;
};
