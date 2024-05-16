import {
	animationDelay,
	heightDivider,
	desktopLandmarkHeight,
	desktopLandmarkWidth,
	originHeightDistance,
	mobileLandmarkHeight,
	mobileLandmarkWidth,
} from "../consts";

export const calcDelayByHeight = (top: number): number => {
	const delay = Math.abs(top) / heightDivider + animationDelay;
	return delay;
};

export const delayToTransitionDelayValue = (delay: number): string => {
	return `${delay}s, ${delay}s`;
};

export const calcEndHeight = (top: number): number => {
	return top + originHeightDistance;
};

export const calcStartPosition = (
	top: number,
	right: number,
	mapHeight: number,
	mapWidth: number,
	isMobile: boolean
): { top: number; right: number; height: number; width: number } => {
	const landmarkHeight = isMobile
		? mobileLandmarkHeight
		: desktopLandmarkHeight;
	const landmarkWidth = isMobile ? mobileLandmarkWidth : desktopLandmarkWidth;
	return {
		top: (mapHeight / 100) * top - landmarkHeight - originHeightDistance,
		right: (mapWidth / 100) * right - landmarkWidth,
		height: landmarkHeight,
		width: landmarkWidth,
	};
};
