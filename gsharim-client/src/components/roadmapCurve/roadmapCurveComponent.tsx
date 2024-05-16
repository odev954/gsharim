import { Box } from "@mui/material";
import { useMemo } from "react";
import HalfCircle from "assets/chapter/halfCircle.svg";
import * as styles from "./styles";

export type Position = { [key: string]: string };

// map of alignment per child x & y offsets (position of child)
export type AlignmentPositionMap = {
	top: Position;
	bottom: Position;
	center: Position;
};

export interface RoadmapCurveComponentProps {
	direction: "left" | "right";
	childAlign?: "top" | "center" | "bottom";
	positions: AlignmentPositionMap;
	setChildrenContainerRef?: (node: HTMLDivElement | null) => void;
	setCurveRef?: (node: HTMLDivElement | null) => void;
	children?: JSX.Element[] | JSX.Element;
}

export function RoadmapCurveComponent({
	direction,
	children,
	childAlign: align,
	setChildrenContainerRef: setChildRef,
	setCurveRef: setRef,
	positions,
}: RoadmapCurveComponentProps): JSX.Element {
	const position = useMemo(
		() => positions[align || "center"],
		[align, positions]
	);

	const dynamicStyles = useMemo(() => {
		if (direction === "left") {
			return {
				mainContainer: styles.mainContainerLeft,
				curveImageContainer: styles.curveImageContainerLeft,
				childContainer: styles.childContainer,
				curveImage: {},
			};
		}
		return {
			mainContainer: styles.mainContainerRight,
			curveImageContainer: styles.curveImageContainerRight,
			curveImage: styles.curveImageRight,
			childContainer: styles.childContainer,
		};
	}, [direction]);

	return (
		<Box sx={[styles.mainContainer, dynamicStyles.mainContainer]}>
			<Box sx={styles.secondaryContainer}>
				<Box sx={dynamicStyles.curveImageContainer}>
					<Box
						ref={setRef}
						sx={[styles.curveImage, dynamicStyles.curveImage]}
						component="img"
						src={HalfCircle}
					/>
				</Box>
				<Box
					ref={setChildRef}
					sx={[styles.childContainer, dynamicStyles.childContainer, position]}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
