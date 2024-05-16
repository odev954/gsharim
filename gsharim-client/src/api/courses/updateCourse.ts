import { Course, CourseMetadata } from "@eco8200/data-models";
import { SetData } from "types/server/useServerData";
import { calcProgress } from "utils/course";

export interface ActivateCourseResult {
	status: string;
}

export interface ActivateCourseProps {
	course: Course;
}

export const updateCourse = async (
	newCourse: Course,
	setCourseMetadata: SetData<CourseMetadata>
): Promise<ActivateCourseResult> => {
	setCourseMetadata((oldCourseMetadata) => {
		return {
			...oldCourseMetadata,
			progress: calcProgress(newCourse.chapters),
		};
	});
	return { status: "ok" };
};
