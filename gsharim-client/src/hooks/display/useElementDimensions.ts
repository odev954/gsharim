import { useCallback, useState } from "react";

import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";

// code refrence from usehooks-ts documentation: https://usehooks-ts.com/react-hook/use-element-size

interface Dimensions {
	Width: number;
	Height: number;
	OffestY: number;
	OffestX: number;
}

function useElementDimensions<T extends HTMLElement = HTMLDivElement>(): [
	(node: T | null) => void,
	Dimensions
] {
	const [ref, setRef] = useState<T | null>(null);
	const [dimensions, setDimensions] = useState<Dimensions>({
		Width: 0,
		Height: 0,
		OffestY: 0,
		OffestX: 0,
	});

	const handleDimensionChange = useCallback(() => {
		setDimensions({
			Width: ref?.offsetWidth || 0,
			Height: ref?.offsetHeight || 0,
			OffestX: ref?.offsetLeft || 0,
			OffestY: ref?.offsetTop || 0,
		});
	}, [ref?.offsetHeight, ref?.offsetWidth, ref?.offsetLeft, ref?.offsetTop]);

	useEventListener("resize", handleDimensionChange);

	useIsomorphicLayoutEffect(() => {
		handleDimensionChange();
	}, [ref?.offsetHeight, ref?.offsetWidth, ref?.offsetLeft, ref?.offsetTop]);

	return [setRef, dimensions];
}

export default useElementDimensions;
