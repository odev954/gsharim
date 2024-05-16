import { useCallback, useEffect } from "react";
import useChapter from "hooks/chapter";
import { findIndexById } from "utils/common";
import useNavigation from "../useNavigation";
import { OnNavigateCallbackFunction, Navigation } from "../types";

export const useLessonNavigation = (
	lessonId: string,
	chapterId: string,
	courseId: string
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
		data: chapter,
		isLoading,
		isError,
		isSuccess,
	} = useChapter({ chapterId, courseId });

	useEffect(() => {
		if (isSuccess) {
			const newIndex = findIndexById(chapter.lessonsMetadata, lessonId);

			setCurrentIndex(newIndex);
		}
	}, [chapterId, chapter, isSuccess, lessonId, setCurrentIndex]);

	const goNextLesson = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goNext(handleNewIndexCallback, "lesson"),
		[goNext]
	);

	const goPreviousLesson = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goPrevious(handleNewIndexCallback, "lesson"),
		[goPrevious]
	);

	const goToLastLesson = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void => {
			if (isSuccess) {
				setCurrentIndex(() => {
					const lastIndex = chapter.lessonsMetadata.length - 1;
					handleNewIndexCallback(lastIndex, "lesson");

					return lastIndex;
				});
			}
		},
		[chapter, isSuccess, setCurrentIndex]
	);

	const goToFirstLesson = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goToFirst(handleNewIndexCallback, "lesson"),
		[goToFirst]
	);

	if (isLoading) {
		return {
			isLoading: true,
			isError: false,
			isSuccess: false,
		};
	}

	if (isError) {
		return {
			isLoading: false,
			isError: true,
			isSuccess: false,
		};
	}

	const lastIndex = chapter.lessonsMetadata.length - 1;

	const isLast = currentIndex === chapter.lessonsMetadata.length - 1;

	return {
		isLoading: false,
		isError: false,
		isSuccess: true,
		goNext: goNextLesson,
		goPrevious: goPreviousLesson,
		goToFirst: goToFirstLesson,
		goToLast: goToLastLesson,
		isFirst,
		isLast,
		currentIndex,
		lastIndex,
	};
};
