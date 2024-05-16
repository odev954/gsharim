import { useCallback, MutableRefObject } from "react";
import { Box, Button } from "@mui/material";
import { RoadmapLesson } from "components/roadmapLesson";
import Text from "components/text";
import { LessonMetadata } from "@eco8200/data-models";
import { RoadmapCurve } from "../roadmapCurve";
import { finalExerciseButtonTitle } from "./strings";
import * as styles from "./styles";

export interface IRoadmapGraphProps {
	lessonsMetadata: LessonMetadata[];
	finalExrecise?: LessonMetadata;
	navigateToLesson: (lessonId: string) => void;
	lessonIdToRef: string | null;
	lessonRef?: MutableRefObject<HTMLDivElement | null>;
}

export function RoadmapGraphComponent({
	lessonsMetadata,
	finalExrecise,
	navigateToLesson,
	lessonIdToRef,
	lessonRef,
}: IRoadmapGraphProps): JSX.Element {
	const configureSide = useCallback(
		(index: number) => (index % 2 === 0 ? "left" : "right"),
		[]
	);

	const navigateToFinalExercise = useCallback(() => {
		if (finalExrecise) navigateToLesson(finalExrecise.id);
	}, [finalExrecise, navigateToLesson]);

	return (
		<Box sx={styles.container}>
			<Box>
				{lessonsMetadata.map((lessonMetadata, index) => {
					if (lessonsMetadata.length - 1 === index && !finalExrecise)
						return (
							<RoadmapCurve
								key={lessonMetadata.id}
								direction={configureSide(index)}
								childAlign="bottom"
							>
								<RoadmapLesson
									lessonMetadata={lessonMetadata}
									navigateToLesson={navigateToLesson}
									lessonRef={
										lessonMetadata.id === lessonIdToRef ? lessonRef : null
									}
								/>
							</RoadmapCurve>
						);
					return (
						<RoadmapCurve
							key={lessonMetadata.id}
							direction={configureSide(index)}
						>
							<RoadmapLesson
								lessonMetadata={lessonMetadata}
								navigateToLesson={navigateToLesson}
								lessonRef={
									lessonMetadata.id === lessonIdToRef ? lessonRef : null
								}
							/>
						</RoadmapCurve>
					);
				})}
			</Box>
			{finalExrecise && (
				<RoadmapCurve
					direction={configureSide(lessonsMetadata.length)}
					childAlign="bottom"
				>
					<Box ref={finalExrecise.id === lessonIdToRef ? lessonRef : null}>
						<Button
							color="blue"
							sx={styles.button}
							variant="contained"
							onClick={navigateToFinalExercise}
						>
							<Text textToTranslate={finalExerciseButtonTitle} />
						</Button>
					</Box>
				</RoadmapCurve>
			)}
		</Box>
	);
}
