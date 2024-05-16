import { useCallback, useRef, useState } from "react";
import { useElementSize } from "usehooks-ts";
import { defaultItemWidth, defaultOffset } from "./consts";
import { GalleryComponent } from "./galleryComponent";
import { calcItemFullWidth } from "./utils";

export interface GalleryContainerProps {
	children: JSX.Element[];
	noItemsMessage: string;
	direction: "rtl" | "ltr";
}

export function GalleryContainer({
	noItemsMessage,
	children,
	direction,
}: GalleryContainerProps): JSX.Element {
	const [offset, setOffset] = useState<number>(defaultOffset);
	const [setGalleryRef, galleryRef] = useElementSize();
	useState<boolean>(false);

	const isRtl = direction === "rtl";
	const itemRef = useRef<Element>(null);
	let itemWidth = defaultItemWidth;
	if (itemRef.current) {
		itemWidth = calcItemFullWidth(itemRef.current);
	}

	const numberOfItemsToDisplay = galleryRef.width / itemWidth + 1;
	const isScrollable = numberOfItemsToDisplay < children.length;
	const canForward = offset < children.length - numberOfItemsToDisplay + 1;
	const canBackward = offset > 0;

	const forward = useCallback((): void => {
		if (canForward) {
			setOffset((prevOffset) => prevOffset + 1);
		}
	}, [canForward]);

	const backwards = useCallback((): void => {
		if (canBackward) {
			setOffset((prevOffset) => prevOffset - 1);
		}
	}, [canBackward]);

	return (
		<GalleryComponent
			setGalleryRef={setGalleryRef}
			moveRight={isRtl ? backwards : forward}
			moveLeft={isRtl ? forward : backwards}
			canRight={isRtl ? canBackward : canForward}
			canLeft={isRtl ? canForward : canBackward}
			offset={offset}
			itemRef={itemRef}
			itemSize={itemWidth}
			noItemsMessage={noItemsMessage}
			isScrollable={isScrollable}
			dir={direction}
		>
			{children}
		</GalleryComponent>
	);
}
