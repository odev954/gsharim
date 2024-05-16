import { useEffect, useCallback } from "react";
import { useCourse } from "hooks/course/useCourse";
import { findIndexById } from "utils/common";
import useNavigation from "../useNavigation";
import { OnNavigateCallbackFunction, Navigation } from "../types";

export const useChapterNavigation = (
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
		data: course,
		isLoading,
		isError,
		isSuccess,
	} = useCourse({ courseId });

	useEffect(() => {
		if (isSuccess) {
			const newChapterIndex = findIndexById(course.chapters, chapterId);

			setCurrentIndex(newChapterIndex);
		}
	}, [chapterId, course, isSuccess, setCurrentIndex]);

	const goNextChapter = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goNext(handleNewIndexCallback, "chapter"),
		[goNext]
	);

	const goPreviousChapter = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goPrevious(handleNewIndexCallback, "chapter"),
		[goPrevious]
	);

	const goToLast = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void => {
			if (isSuccess) {
				setCurrentIndex(() => {
					const lastIndex = course.chapters.length - 1;
					handleNewIndexCallback(lastIndex, "chapter");

					return lastIndex;
				});
			}
		},
		[course?.chapters.length, isSuccess, setCurrentIndex]
	);

	const goToFirstChapter = useCallback(
		(handleNewIndexCallback: OnNavigateCallbackFunction): void =>
			goToFirst(handleNewIndexCallback, "chapter"),
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

	const lastIndex = course.chapters.length - 1;

	const isLast = currentIndex === lastIndex;

	return {
		isLoading: false,
		isError: false,
		isSuccess: true,
		goNext: goNextChapter,
		goPrevious: goPreviousChapter,
		goToFirst: goToFirstChapter,
		goToLast,
		isFirst,
		isLast,
		currentIndex,
		lastIndex,
	};
};
