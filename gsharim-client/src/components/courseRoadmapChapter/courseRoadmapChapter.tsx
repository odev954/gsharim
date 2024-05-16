import {
	Box,
	Container,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { RoadmapGraph } from "components/roadmapGraph";
import { Chapter } from "@eco8200/data-models";
import { MutableRefObject } from "react";
import CircularProgressWithLabel from "components/CircularProgressWithLabel";
import * as styles from "./styles";

export interface CourseChapterProps {
	chapter: Chapter;
	courseId: string;
	lessonIdToRef: string | null;
	lessonRef: MutableRefObject<HTMLDivElement | null>;
	chapterRef: MutableRefObject<HTMLDivElement | null> | null;
}

export function CourseRoadmapChapter({
	courseId,
	chapter,
	lessonIdToRef,
	lessonRef,
	chapterRef,
}: CourseChapterProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<Box ref={chapterRef}>
			<Container sx={styles.titleContainer}>
				<Box sx={isMobile ? styles.mobileTitle : styles.title}>
					<CircularProgressWithLabel value={chapter.progress}>
						<Typography sx={styles.percents}>{`${
							chapter.progress || 0
						}%`}</Typography>
					</CircularProgressWithLabel>
					<Typography sx={styles.chapterTitle}>{chapter.name}</Typography>
				</Box>
			</Container>
			<RoadmapGraph
				courseId={courseId}
				chapter={chapter}
				lessonIdToRef={lessonIdToRef}
				lessonRef={lessonRef}
			/>
		</Box>
	);
}
