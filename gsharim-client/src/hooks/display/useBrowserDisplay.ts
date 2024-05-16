import { useMemo } from "react";
import useAspectRatio from "./useAspectRatio";
import { AspectRatioThreshold } from "./consts";

export default function useBrowserDisplay(): boolean {
	const aspectRatio = useAspectRatio();
	const isBrowserDisplay = useMemo(() => {
		return aspectRatio >= AspectRatioThreshold;
	}, [aspectRatio]);
	return isBrowserDisplay;
}
