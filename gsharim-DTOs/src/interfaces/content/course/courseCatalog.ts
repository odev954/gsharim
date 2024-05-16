import Course from "./course";

export default interface CourseCatalog {
	available: Course[];
	popular: Course[];
	newest: Course[];
	recommended?: Course[];
	completed?: Course[];
	ongoing?: Course[];
}
