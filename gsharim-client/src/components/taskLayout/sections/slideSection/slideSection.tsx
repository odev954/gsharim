import Iframe from "react-iframe";
import { SlideSectionData } from "@eco8200/data-models";
import { useMemo } from "react";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { useTimeout } from "usehooks-ts";
import * as styles from "./styles";
import { slideUrlBuilder } from "./utils";

export function SlideSection({
	id,
	googleSlideId,
	slideStartIndex,
	mandatoryTime,
	options,
}: SlideSectionData): JSX.Element {
	const url = useMemo(
		() => slideUrlBuilder(googleSlideId, slideStartIndex, options.showControls),
		[googleSlideId, options.showControls, slideStartIndex]
	);
	const { approveSection } = useSetSectionBlocking(id);

	useTimeout(() => {
		approveSection();
	}, mandatoryTime);

	return (
		<Iframe
			url={url}
			frameBorder={styles.slideIframe.border}
			width={styles.slideIframe.width}
			height={styles.slideIframe.height}
			display={styles.slideIframe.display}
		/>
	);
}
