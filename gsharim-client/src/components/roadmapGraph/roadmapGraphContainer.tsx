import { Box } from "@mui/material";
import { Chapter } from "@eco8200/data-models";
import { useNavigate } from "react-router";
import { useCallback, MutableRefObject } from "react";
import { buildUrl } from "utils/course/buildUrls";
import { RoadmapGraphComponent } from "./roadmapGraphComponent";

export interface IRoadmapGraphContainerProps {
	chapter: Chapter;
	courseId: string;
	lessonIdToRef: string | null;
	lessonRef?: MutableRefObject<HTMLDivElement | null>;
}

export function RoadmapGraphContainer({
	chapter,
	courseId,
	lessonIdToRef,
	lessonRef,
}: IRoadmapGraphContainerProps): JSX.Element {
	const navigate = useNavigate();

	const navigateToLesson = useCallback(
		(lessonId: string): void => {
			const lessonUrl = buildUrl({
				courseId,
				chapterId: chapter.id,
				lessonId,
			});

			navigate(lessonUrl);
		},
		[navigate, chapter.id, courseId]
	);

	return (
		<Box>
			<RoadmapGraphComponent
				navigateToLesson={navigateToLesson}
				lessonsMetadata={chapter.lessonsMetadata}
				finalExrecise={chapter.finalExercise}
				lessonIdToRef={lessonIdToRef}
				lessonRef={lessonRef}
			/>
		</Box>
	);
}
