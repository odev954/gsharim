import React from "react";
import { Box } from "@mui/material";
import { galleryContainer } from "./styles";
import GalleryItems from "./items/galleryItems";
import { GalleryButtons } from "./galleryButtons";

interface GalleryComponentProps {
	setGalleryRef: (node: HTMLDivElement | null) => void;
	children: JSX.Element[];
	moveRight: VoidFunction;
	moveLeft: VoidFunction;
	noItemsMessage: string;
	offset: number;
	itemRef: React.Ref<Element>;
	itemSize: number;
	canRight: boolean;
	canLeft: boolean;
	isScrollable: boolean;
	dir: "rtl" | "ltr";
}

export function GalleryComponent({
	children,
	setGalleryRef,
	moveRight,
	moveLeft,
	offset,
	itemRef,
	itemSize,
	noItemsMessage,
	canRight,
	canLeft,
	isScrollable,
	dir,
}: GalleryComponentProps): JSX.Element {
	return (
		<Box sx={galleryContainer} ref={setGalleryRef}>
			{isScrollable && (
				<GalleryButtons
					moveRight={moveRight}
					moveLeft={moveLeft}
					canRight={canRight}
					canLeft={canLeft}
				/>
			)}

			<GalleryItems
				offset={offset}
				itemSize={itemSize}
				itemRef={itemRef}
				noItemsMessage={noItemsMessage}
				dir={dir}
			>
				{children}
			</GalleryItems>
		</Box>
	);
}
