import { Box, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { landmarkSVG } from "assets/welcomePageMap";
import { useMemo, useRef, useEffect } from "react";
import { useLogger } from "hooks/logger";
import { useHover } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { LandmarkData } from "./landmarkData";
import * as styles from "./styles";
import {
	calcDelayByHeight,
	calcEndHeight,
	calcStartPosition,
	delayToTransitionDelayValue,
} from "./utils";

interface MapLandmarkProps {
	landmark: { top: number; right: number; name: string };
	show: boolean;
	mapSize: { height: number; width: number };
}

export function MapLandmark({
	landmark,
	show,
	mapSize,
}: MapLandmarkProps): JSX.Element {
	const { t: translate } = useTranslation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);
	const logger = useLogger();
	const landmarkName = landmark.name;

	const landmarkStyles = useMemo(() => {
		const { top, right, height, width } = calcStartPosition(
			landmark.top,
			landmark.right,
			mapSize.height,
			mapSize.width,
			isMobile
		);
		const delay = calcDelayByHeight(top);
		const currentStyles = show ? styles.landmarkDown : styles.landmarkUp;
		const endHeight = calcEndHeight(top);
		return {
			height,
			width,
			top: show ? endHeight : top,
			right,
			...currentStyles,
			transitionDelay: delayToTransitionDelayValue(delay),
		};
	}, [landmark, show, mapSize.height, mapSize.width, isMobile]);

	useEffect(() => {
		if (isHover)
			logger.info(
				"map-landmark-hovered",
				`the landmark of ${translate(landmarkName)} was hovered`,
				{
					landmarkName: translate(landmarkName),
				}
			);
	}, [isHover, logger, landmarkName, translate]);

	return (
		<Tooltip
			title={<LandmarkData text={landmarkName} />}
			placement="top"
			slotProps={{ tooltip: { sx: styles.tooltipBackground } }}
		>
			<Box
				component="img"
				alt={landmarkName}
				src={landmarkSVG}
				sx={landmarkStyles}
				ref={hoverRef}
			/>
		</Tooltip>
	);
}
