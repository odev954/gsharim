import { Chapter, Course } from "@eco8200/data-models";
import { SetData } from "types/server/useServerData";
import { findIndexById } from "utils/common";

export async function onChapterUpdate(
	chapterId: string,
	newChapter: Chapter,
	setCourse: SetData<Course>
): Promise<void> {
	setCourse((oldCourse) => {
		const courseClone = { ...oldCourse };
		const chapterIndex = findIndexById(courseClone.chapters, chapterId);
		courseClone.chapters[chapterIndex] = newChapter;

		return courseClone;
	});
}
