import { CourseMetadata } from "@eco8200/data-models";
import { findIndexById } from "utils/common";

type SetCourseMetadataListAction = (
	oldCourseMetadataList: Array<CourseMetadata>
) => Array<CourseMetadata>;
type SetCourseMetadataList = (action: SetCourseMetadataListAction) => void;
export async function onCourseMetadataUpdate(
	courseId: string,
	newCourseMetadata: CourseMetadata,
	setCourseMetadataList: SetCourseMetadataList
): Promise<void> {
	setCourseMetadataList((oldCourseMetadataList) => {
		const courseMetadataListClone = [...oldCourseMetadataList];
		const courseIndex = findIndexById(courseMetadataListClone, courseId);
		courseMetadataListClone[courseIndex] = newCourseMetadata;
		return courseMetadataListClone;
	});
}
