import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "hooks/course/useCourse";
import { useLesson } from "hooks/lesson";
import {
	coursesCatalogUrl,
	buildChapterUrlWithIndex,
	buildLessonUrlWithIndex,
	buildTaskUrlWithIndex,
	baseCourseRoadmapUrl,
} from "utils/course";
import useLessonNavigation from "../useLessonNavigation";
import useTasksNavigation from "../useTasksNavigation";
import useChapterNavigation from "../useChapterNavigation";
import { CourseNavigation } from "./types";
import { NavigateTypeInfo, NavigateType } from "../types";

type UseNavigateInCourseProps = {
	courseId: string;
	chapterId: string;
	lessonId: string;
	taskId: string;
};

const useNavigateInCourse = ({
	courseId,
	chapterId,
	lessonId,
	taskId,
}: UseNavigateInCourseProps): CourseNavigation => {
	const navigate = useNavigate();

	const {
		data: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
		isSuccess: isCourseSuccess,
	} = useCourse({ courseId });

	const {
		data: lesson,
		isLoading: isLessonLoading,
		isError: isLessonError,
		isSuccess: isLessonSuccess,
	} = useLesson({ lessonId });

	const {
		currentIndex: currentChapterIndex,
		isLoading: isChapterLoading,
		isError: isChapterError,
		isSuccess: isChapterSuccess,
		isFirst: isFirstChapter,
		isLast: isLastChapter,
		goNext: goNextChapter,
		goPrevious: goPreviousChapter,
	} = useChapterNavigation(chapterId, courseId);

	const {
		currentIndex: currentLessonIndex,
		isLoading: isLessonNavigationLoading,
		isError: isLessonNavigationError,
		isSuccess: isLessonNavigationSuccess,
		isFirst: isFirstLesson,
		isLast: isLastLesson,
		goPrevious: goPreviousLesson,
		goNext: goNextLesson,
	} = useLessonNavigation(lessonId, chapterId, courseId);

	const {
		isLoading: isTaskLoading,
		isError: isTaskError,
		isSuccess: isTaskSuccess,
		isFirst: isFirstTask,
		isLast: isLastTask,
		goPrevious: goPreviousTask,
		goNext: goNextTask,
	} = useTasksNavigation(taskId, lessonId);

	const navigateNewUrl = useCallback(
		(index: number, navigationType: NavigateType) => {
			if (
				isCourseSuccess &&
				isLessonSuccess &&
				isChapterSuccess &&
				isLessonNavigationSuccess &&
				isTaskSuccess
			) {
				let newUrl;

				if (navigationType === "task") {
					newUrl = buildTaskUrlWithIndex(
						course,
						lesson,
						currentChapterIndex,
						currentLessonIndex,
						index
					);
				} else if (navigationType === "lesson") {
					newUrl = buildLessonUrlWithIndex(course, currentChapterIndex, index);
				} else {
					newUrl = buildChapterUrlWithIndex(course, index);
				}

				navigate(newUrl);
			}
		},
		[
			course,
			currentChapterIndex,
			currentLessonIndex,
			isChapterSuccess,
			isCourseSuccess,
			isLessonSuccess,
			isLessonNavigationSuccess,
			isTaskSuccess,
			lesson,
			navigate,
		]
	);

	const nextType = useMemo<NavigateTypeInfo>(() => {
		if (!isLastTask && isTaskSuccess) {
			return "task";
		}

		if (!isLastLesson && isLessonNavigationSuccess) {
			return "lesson";
		}

		if (!isLastChapter && isChapterSuccess) {
			return "chapter";
		}

		return undefined;
	}, [
		isChapterSuccess,
		isLastChapter,
		isLastLesson,
		isLastTask,
		isLessonNavigationSuccess,
		isTaskSuccess,
	]);

	const previousType = useMemo<NavigateTypeInfo>(() => {
		if (!isFirstTask && isTaskSuccess) {
			return "task";
		}

		if (!isFirstLesson && isLessonNavigationSuccess) {
			return "lesson";
		}

		if (!isFirstChapter && isChapterSuccess) {
			return "chapter";
		}

		return undefined;
	}, [
		isChapterSuccess,
		isFirstChapter,
		isFirstLesson,
		isFirstTask,
		isLessonNavigationSuccess,
		isTaskSuccess,
	]);

	const goNext = useCallback(() => {
		if (!isTaskSuccess) throw new Error("error using task navigation");
		if (!isLessonNavigationSuccess)
			throw new Error("error using lesson navigation");
		if (!isChapterSuccess) throw new Error("error using chapter navigation");

		if (nextType === "task") {
			goNextTask(navigateNewUrl);
		} else if (nextType === "lesson") {
			goNextLesson(navigateNewUrl);
		} else if (nextType === "chapter") {
			goNextChapter(navigateNewUrl);
		}
	}, [
		goNextChapter,
		goNextLesson,
		goNextTask,
		isChapterSuccess,
		isLessonNavigationSuccess,
		isTaskSuccess,
		navigateNewUrl,
		nextType,
	]);

	const goPrevious = useCallback(() => {
		if (!isTaskSuccess) throw new Error("error using task navigation");
		if (!isLessonNavigationSuccess)
			throw new Error("error using lesson navigation");
		if (!isChapterSuccess) throw new Error("error using chapter navigation");

		if (previousType === "task") {
			goPreviousTask(navigateNewUrl);
		} else if (previousType === "lesson") {
			goPreviousLesson(navigateNewUrl);
		} else if (previousType === "chapter") {
			goPreviousChapter(navigateNewUrl);
		}
	}, [
		goPreviousChapter,
		goPreviousLesson,
		goPreviousTask,
		isChapterSuccess,
		isLessonNavigationSuccess,
		isTaskSuccess,
		navigateNewUrl,
		previousType,
	]);

	if (
		isTaskLoading ||
		isLessonNavigationLoading ||
		isChapterLoading ||
		isCourseLoading ||
		isLessonLoading
	) {
		return { isLoading: true, isError: false, isSuccess: false };
	}

	if (
		isTaskError ||
		isLessonNavigationError ||
		isChapterError ||
		isCourseError ||
		isLessonError
	) {
		return {
			isLoading: false,
			isError: true,
			isSuccess: false,
		};
	}

	const finishCourse = (): void => navigate(coursesCatalogUrl);
	const goBackFromCourse = (): void =>
		navigate(`${baseCourseRoadmapUrl}/${courseId}`);

	return {
		goNext,
		goPrevious,
		finishCourse,
		goBackFromCourse,
		isLoading: false,
		isError: false,
		isSuccess: true,
		isFirstTask,
		isLastTask,
		isFirstLesson,
		isLastLesson,
		isFirstChapter,
		isLastChapter,
		nextType,
		previousType,
	};
};

export default useNavigateInCourse;
