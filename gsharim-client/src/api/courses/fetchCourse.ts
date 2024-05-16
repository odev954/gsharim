import { Course } from "@eco8200/data-models";
import { coursesMock } from "mocks/demo/courses/coursesMock";

export async function fetchCourse(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	courseId: string,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	language: string
): Promise<Course> {
	return coursesMock;
}
