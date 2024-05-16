import { CourseMetadata, CourseMetadataSchema } from "@eco8200/data-models";
import { coursesMetadataMock } from "mocks/demo/courses/courseMetadataMock";
import { z as zod } from "zod";

export default async function fetchCourseMetadataList(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	language: string
): Promise<CourseMetadata[]> {
	const courseMetadataListSchema = zod.array(CourseMetadataSchema);
	return courseMetadataListSchema.parse(coursesMetadataMock);
}
