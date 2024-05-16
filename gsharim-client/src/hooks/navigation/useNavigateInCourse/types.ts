import { Task } from "@eco8200/data-models";
import { NavigateTypeInfo } from "../types";

interface ICourseNavigation {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	goNext?: () => void;
	goPrevious?: () => void;
	task?: Task;
	isFirstTask?: boolean;
	isLastTask?: boolean;
	isFirstLesson?: boolean;
	isLastLesson?: boolean;
	isFirstChapter?: boolean;
	isLastChapter?: boolean;
	nextType?: NavigateTypeInfo;
	previousType?: NavigateTypeInfo;
	finishCourse?: VoidFunction;
	goBackFromCourse?: VoidFunction;
}

interface CourseNavigationLoading extends ICourseNavigation {
	isLoading: false;
	isError: true;
	isSuccess: false;
}

interface CourseNavigationError extends ICourseNavigation {
	isLoading: true;
	isError: false;
	isSuccess: false;
}

export interface CourseNavigationSuccess extends ICourseNavigation {
	isLoading: false;
	isError: false;
	isSuccess: true;
	goNext: VoidFunction;
	goPrevious: VoidFunction;
	isFirstTask: boolean;
	isLastTask: boolean;
	isFirstLesson: boolean;
	isLastLesson: boolean;
	isFirstChapter?: boolean;
	isLastChapter?: boolean;
	finishCourse: VoidFunction;
	goBackFromCourse: VoidFunction;
	nextType: NavigateTypeInfo;
	previousType: NavigateTypeInfo;
}

export type CourseNavigation =
	| CourseNavigationLoading
	| CourseNavigationError
	| CourseNavigationSuccess;
