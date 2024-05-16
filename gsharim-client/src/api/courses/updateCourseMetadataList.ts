import { CourseMetadata } from "@eco8200/data-models";

type setCourseContentServerStateResults = {
	status: string;
};
export async function updateCourseMetadataList(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	newCourseMetadataList: Array<CourseMetadata>
): Promise<setCourseContentServerStateResults> {
	return { status: "ok" };
}
