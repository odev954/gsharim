import { useCallback, useEffect } from "react";
import { getTaskIndex } from "utils/course";
import useLesson from "../../lesson/useLesson";
import useNavigation from "../useNavigation";
import { OnNavigateCallbackFunction, Navigation } from "../types";

export const useTasksNavigation = (
	taskId: string,
	lessonId: string
): Navigation => {
	const {
		currentIndex,
		isFirst,
		setCurrentIndex,
		goNext,
		goPrevious,
		goToFirst,
	} = useNavigation();

	const {
		data: lesson,
		isLoading: isLessonLoading,
		isError: isLessonError,
		isSuccess: isLessonSuccess,
	} = useLesson({ lessonId });

	useEffect(() => {
		if (isLessonSuccess) {
			setCurrentIndex(getTaskIndex(lesson, taskId));
		}
	}, [isLessonSuccess, lesson, setCurrentIndex, taskId]);

	const goNextTask = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goNext(handleNewIndexCallback, "task"),
		[goNext]
	);

	const goPreviousTask = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goPrevious(handleNewIndexCallback, "task"),
		[goPrevious]
	);

	const goToLastTask = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void => {
			if (isLessonSuccess) {
				setCurrentIndex(() => {
					const lastIndex = lesson.tasksMetadata.length - 1;
					handleNewIndexCallback(lastIndex, "task");

					return lastIndex;
				});
			}
		},
		[isLessonSuccess, lesson?.tasksMetadata.length, setCurrentIndex]
	);

	const goToFirstTask = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goToFirst(handleNewIndexCallback, "task"),
		[goToFirst]
	);

	if (isLessonLoading) {
		return {
			isLoading: true,
			isError: false,
			isSuccess: false,
		};
	}

	if (isLessonError) {
		return {
			isLoading: false,
			isError: true,
			isSuccess: false,
		};
	}

	const lastIndex = lesson.tasksMetadata.length - 1;
	const isLast = currentIndex === lastIndex;

	return {
		goNext: goNextTask,
		goPrevious: goPreviousTask,
		goToFirst: goToFirstTask,
		goToLast: goToLastTask,
		isLoading: false,
		isError: false,
		isSuccess: true,
		isFirst,
		isLast,
		currentIndex,
		lastIndex,
	};
};
