import { useMemo } from "react";
import { useElementSize } from "usehooks-ts";
import {
	AlignmentPositionMap,
	RoadmapCurveComponent,
} from "./roadmapCurveComponent";

export interface IRoadmapCurveProps {
	direction: "left" | "right";
	childAlign?: "top" | "center" | "bottom";
	children?: JSX.Element[] | JSX.Element;
}

export function RoadmapCurveContainer({
	direction,
	children,
	childAlign: align,
}: IRoadmapCurveProps): JSX.Element {
	const [setCurveRef, curveRef] = useElementSize();
	const [setChildRef, childRef] = useElementSize();
	const positions = useMemo<AlignmentPositionMap>(
		() => ({
			top: {
				top: `${curveRef.height - childRef.height / 2}px`,
				left: `${-curveRef.width - childRef.width / 2}px`,
			},
			bottom: {
				[direction === "left" ? "right" : "left"]: `${
					-curveRef.width + childRef.width / 2
				}px`,
				top: `${-childRef.height / 2}px`,
			},
			center: {
				top: `${-curveRef.height / 2 - childRef.height / 2}px`,
				[direction]: `${-childRef.width / 4}px`,
			},
		}),
		[curveRef, childRef, direction]
	);

	return (
		<RoadmapCurveComponent
			positions={positions}
			direction={direction}
			setChildrenContainerRef={setChildRef}
			setCurveRef={setCurveRef}
			childAlign={align}
		>
			{children}
		</RoadmapCurveComponent>
	);
}
