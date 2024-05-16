import { useCallback, useMemo, MutableRefObject } from "react";
import {
	useTheme,
	Paper,
	Container,
	Typography,
	SxProps,
	Theme,
	Box,
	Button,
	alpha,
} from "@mui/material";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import useElementDimensions from "hooks/display/useElementDimensions";
import lockedIcon from "assets/chapter/vectorLock.svg";
import { LessonMetadata } from "@eco8200/data-models";
import { useLogger } from "hooks/logger";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";
import * as styles from "./styles";
import {
	lessonIconElevationRate,
	lessonProgressSize,
	lessonProgressThickness,
	strokeWidth,
} from "./consts";

export interface RoadmapLessonProps {
	lessonMetadata: LessonMetadata;
	navigateToLesson: (lessonId: string) => void;
	lessonRef?: MutableRefObject<HTMLDivElement | null> | null;
}

export function RoadmapLesson({
	lessonMetadata,
	navigateToLesson,
	lessonRef,
}: RoadmapLessonProps): JSX.Element {
	const theme = useTheme();
	const logger = useLogger();
	const [setContainerDimensionsRef, dimensions] = useElementDimensions();
	const overlayPositioning: SxProps<Theme> = useMemo(() => {
		return {
			...styles.overlayStyle,
			width: dimensions.Width,
			height: dimensions.Height,
			top: dimensions.OffestY,
			left: dimensions.OffestX,
		};
	}, [
		dimensions.Height,
		dimensions.Width,
		dimensions.OffestX,
		dimensions.OffestY,
	]);
	const lockedIconPositioning: SxProps<Theme> = useMemo(() => {
		return {
			...styles.lockedIconStyle,
			left: `calc(${dimensions.OffestY}px +
				${dimensions.Height}px -
				1.5em)`,
			top: `calc(${dimensions.OffestX}px +
				${dimensions.Width}px -
				1.75em)`,
		};
	}, [
		dimensions.Height,
		dimensions.OffestX,
		dimensions.OffestY,
		dimensions.Width,
	]);

	const LessonHoverDynamicThemeStyles = useMemo(
		() => ({
			...styles.lessonContainerWithHover,
			"&:hover": {
				backgroundColor: alpha(theme.palette.black.main, 0.2),
				borderRadius: "5px",
				padding: "5px",
			},
		}),
		[theme]
	);

	const containerStyle = useMemo(
		() =>
			!lessonMetadata.locked
				? LessonHoverDynamicThemeStyles
				: styles.lessonContainerNoHover,
		[lessonMetadata.locked, LessonHoverDynamicThemeStyles]
	);

	const navigateLogWrapper = useCallback(() => {
		navigateToLesson(lessonMetadata.id);
		logger.info(
			"lesson-clicked",
			`the lesson ${lessonMetadata.name} was clicked`,
			{
				lessonMetadata,
			}
		);
	}, [logger, lessonMetadata, navigateToLesson]);

	return (
		<Button sx={styles.disabledLink} onClick={navigateLogWrapper}>
			<Container sx={containerStyle}>
				<Box sx={styles.progressBarContainerStyle} ref={lessonRef}>
					<CircularProgressbarWithChildren
						value={
							!lessonMetadata.locked && lessonMetadata.progress
								? lessonMetadata.progress
								: 0
						}
						strokeWidth={strokeWidth}
						styles={styles.progressBarStyle}
					>
						{lessonMetadata.locked && (
							<>
								<Container sx={overlayPositioning} />
								<Paper
									sx={lockedIconPositioning}
									elevation={lessonIconElevationRate}
								>
									<Box
										sx={styles.lockedIconImage}
										src={lockedIcon}
										alt={lessonMetadata.name}
										component="img"
									/>
								</Paper>
							</>
						)}
						<Paper
							ref={setContainerDimensionsRef}
							sx={styles.lessonPaperContainerStyle}
							elevation={lessonIconElevationRate}
						>
							<CircularProgressWithLabel
								value={lessonMetadata.progress}
								size={lessonProgressSize}
								thickness={lessonProgressThickness}
							>
								<Box
									sx={styles.lessonIcon}
									src={lessonMetadata.thumbnailUrl}
									alt={lessonMetadata.name}
									component="img"
								/>
							</CircularProgressWithLabel>
						</Paper>
					</CircularProgressbarWithChildren>
				</Box>
				<Typography
					bgcolor={alpha(theme.palette.black.main, 0.09)}
					textAlign="center"
					sx={styles.lessonLabel}
				>
					{lessonMetadata.name}
				</Typography>
			</Container>
		</Button>
	);
}
