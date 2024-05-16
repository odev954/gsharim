export const getBackgroundImage = (
	backgroundUrl: string | undefined
): string | undefined => {
	const backgroundImage = backgroundUrl
		? `
	linear-gradient(to left, rgba(255, 255, 255, .7) 50%, white 100%),
	linear-gradient(to right, rgba(255, 255, 255, .7) 50%, white 100%),
	url(${backgroundUrl})`
		: undefined;

	return backgroundImage;
};
