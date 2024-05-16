import { CourseNavigationSuccess } from "hooks/navigation/useNavigateInCourse";
import { vi } from "vitest";
import { tasksMock } from "../tasks";

export const courseNavigationNextLessonMock: CourseNavigationSuccess = {
	isError: false,
	isLoading: false,
	isSuccess: true,
	isFirstLesson: false,
	isLastLesson: false,
	isFirstTask: false,
	isLastTask: true,
	isFirstChapter: false,
	isLastChapter: false,
	goNext: vi.fn(),
	goPrevious: vi.fn(),
	task: tasksMock["737e0622-7c1e-4ab8-b344-991a2be25b9f"],
	finishCourse: vi.fn(),
	nextType: "lesson",
	previousType: "task",
};

export const courseNavigationPreviousLessonMock: CourseNavigationSuccess = {
	isError: false,
	isLoading: false,
	isSuccess: true,
	isFirstLesson: false,
	isLastLesson: false,
	isFirstTask: true,
	isLastTask: false,
	isFirstChapter: false,
	isLastChapter: false,
	goNext: vi.fn<[void]>(),
	goPrevious: vi.fn<[void]>(),
	task: tasksMock["737e0622-7c1e-4ab8-b344-991a2be25b9f"],
	finishCourse: vi.fn(),
	nextType: "task",
	previousType: "lesson",
};

export const courseNavigationEndCourseMock: CourseNavigationSuccess = {
	isError: false,
	isLoading: false,
	isSuccess: true,
	isFirstLesson: false,
	isLastLesson: true,
	isFirstTask: false,
	isLastTask: true,
	isFirstChapter: false,
	isLastChapter: true,
	goNext: vi.fn(),
	goPrevious: vi.fn(),
	task: tasksMock["737e0622-7c1e-4ab8-b344-991a2be25b9f"],
	finishCourse: vi.fn(),
	nextType: undefined,
	previousType: "task",
};
