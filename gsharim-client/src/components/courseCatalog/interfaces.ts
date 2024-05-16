import { CourseMetadata } from "@eco8200/data-models";

export interface CoursesMapping {
	[key: string]: CourseMetadata[];
}

export interface CoursesComponentMapping {
	[key: string]: JSX.Element[];
}
