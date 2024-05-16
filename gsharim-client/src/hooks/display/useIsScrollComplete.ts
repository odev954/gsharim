import { RefObject, useCallback, useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { scrollThreshold } from "./consts";

interface IUseIsScrollComplete<TElement> {
	ref: RefObject<TElement>;
	querySelector?: string;
	markAsComplete?: boolean;
}

function useIsScrollComplete<TElement extends HTMLElement>({
	ref,
	querySelector,
	markAsComplete = true,
}: IUseIsScrollComplete<TElement>): { isScrollComplete: boolean } {
	const [isScrollComplete, setIsScrollComplete] = useState(false);
	const { width, height } = useResizeObserver({ ref });

	const onScroll: EventListener = useCallback(({ currentTarget }) => {
		const { scrollHeight, clientHeight, scrollTop } = currentTarget as TElement;

		if (Math.abs(scrollHeight - clientHeight - scrollTop) < scrollThreshold) {
			setIsScrollComplete(true);
		} else {
			setIsScrollComplete(false);
		}
	}, []);

	useEffect(() => {
		const element = ref.current;
		const targetElement = querySelector
			? element?.querySelector(querySelector)
			: element;

		if (targetElement) {
			const { scrollHeight, clientHeight } = targetElement;

			if (scrollHeight === clientHeight) {
				// set scroll is complete if there is no scroll
				setIsScrollComplete(true);
			}

			targetElement.addEventListener("scroll", onScroll);

			if (isScrollComplete && markAsComplete) {
				targetElement.removeEventListener("scroll", onScroll);
			}
		}

		return () => {
			if (targetElement) {
				targetElement.removeEventListener("scroll", onScroll);
			}
		};
	}, [
		isScrollComplete,
		markAsComplete,
		onScroll,
		querySelector,
		ref,
		width,
		height,
	]);

	return { isScrollComplete };
}

export default useIsScrollComplete;
