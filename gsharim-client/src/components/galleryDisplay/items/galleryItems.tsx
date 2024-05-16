import React, { useMemo } from "react";
import { Box } from "@mui/material";
import * as styles from "./styles";
import { transitionDuration } from "./consts";
import NoItemsDisplay from "./noItemsDiplayed";

type GalleryItemsProps = {
	children: JSX.Element[];
	itemSize: number;
	offset: number;
	noItemsMessage: string;
	itemRef: React.Ref<Element>;
	dir: "rtl" | "ltr";
};
export default function GalleryItems({
	itemRef,
	children,
	itemSize,
	offset,
	noItemsMessage,
	dir,
}: GalleryItemsProps): JSX.Element {
	const itemsOffset: Object = useMemo(() => {
		const side = dir === "rtl" ? "left" : "right";
		return {
			[side]: `${offset * itemSize}px`,
			transitionDuration,
		};
	}, [itemSize, offset, dir]);

	const renderedItems: JSX.Element = useMemo(() => {
		const firstItemWithRef =
			children[0] && React.cloneElement(children[0], { itemRef });
		return (
			<>
				{firstItemWithRef}
				{children.slice(1, children.length)}
			</>
		);
	}, [children, itemRef]);

	return (
		<Box sx={styles.itemsWrapper}>
			<Box sx={[styles.itemsContainer, itemsOffset]}>
				{children.length ? (
					renderedItems
				) : (
					<NoItemsDisplay text={noItemsMessage} />
				)}
			</Box>
		</Box>
	);
}
