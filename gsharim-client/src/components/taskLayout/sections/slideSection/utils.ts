export function slideUrlBuilder(
	slideId: string,
	startIndex: number,
	showControls = true
): string {
	return `https://docs.google.com/presentation/d/${slideId}/embed?slide=${startIndex}${
		showControls ? "" : "&rm=minimal"
	}`;
}
