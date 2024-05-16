import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { NavigateType, OnNavigateCallbackFunction } from "./types";

type NavigateWithCallback = (
	handleNewIndexCallback: OnNavigateCallbackFunction,
	navigateType: NavigateType
) => void;

type useNavigationResult = {
	currentIndex: number;
	isFirst: boolean;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
	goNext: NavigateWithCallback;
	goPrevious: NavigateWithCallback;
	goToFirst: NavigateWithCallback;
};

const useNavigation = (): useNavigationResult => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const isFirst = currentIndex === 0;

	const goNext = useCallback(
		(
			handleNewIndexCallback: OnNavigateCallbackFunction,
			navigateType: NavigateType
		): void => {
			setCurrentIndex((oldIndex) => {
				const nextIndex = oldIndex + 1;
				handleNewIndexCallback(nextIndex, navigateType);

				return nextIndex;
			});
		},
		[]
	);

	const goPrevious = useCallback(
		(
			handleNewIndexCallback: OnNavigateCallbackFunction,
			navigateType: NavigateType
		): void => {
			setCurrentIndex((oldIndex) => {
				const previousIndex = oldIndex - 1;
				handleNewIndexCallback(previousIndex, navigateType);

				return previousIndex;
			});
		},
		[]
	);

	const goToFirst = useCallback(
		(
			handleNewIndexCallback: OnNavigateCallbackFunction,
			navigateType: NavigateType
		): void => {
			setCurrentIndex(() => {
				const firstIndex = 0;

				handleNewIndexCallback(firstIndex, navigateType);

				return firstIndex;
			});
		},
		[]
	);

	return {
		currentIndex,
		isFirst,
		goNext,
		goPrevious,
		goToFirst,
		setCurrentIndex,
	};
};

export default useNavigation;
