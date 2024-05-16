import { Box, Breadcrumbs, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { buildCourseRoadmapUrl, isFinalExercise } from "utils/course";
import useChapter from "hooks/chapter";
import useLessonMetadata from "hooks/lesson/useLessonMetadata";
import useTask from "hooks/tasks/useTask";
import { useTranslation } from "react-i18next";
import { useCourseMetadata } from "hooks/course";
import * as styles from "./styles";
import { breadCrumbsAria } from "./string";

interface TaskBreadcrumbsProps {
	taskId: string;
	lessonId: string;
	chapterId: string;
	courseId: string;
}

export function TaskBreadcrumbs({
	taskId,
	lessonId,
	chapterId,
	courseId,
}: TaskBreadcrumbsProps): JSX.Element {
	const { t: translate } = useTranslation();

	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
	} = useCourseMetadata({ courseId });
	const {
		data: chapter,
		isError: isChapterError,
		isLoading: isChapterLoading,
	} = useChapter({ courseId, chapterId });
	const {
		data: lessonMetadata,
		isError: isLessonMetadataError,
		isLoading: isLessonMetadataLoading,
	} = useLessonMetadata({ courseId, chapterId, lessonId });
	const {
		data: task,
		isError: isTaskError,
		isLoading: isTaskLoading,
	} = useTask({ taskId });

	if (
		isCourseMetadataError ||
		isChapterError ||
		isLessonMetadataError ||
		isTaskError
	) {
		throw new Error("missing required content to load the breadcrumbs");
	}

	if (
		isCourseMetadataLoading ||
		isChapterLoading ||
		isLessonMetadataLoading ||
		isTaskLoading
	) {
		return (
			<Breadcrumbs
				aria-label={translate(breadCrumbsAria)}
				separator={<Box sx={styles.breadcrumbs}>/</Box>}
			>
				<Skeleton width={100} />
				<Skeleton width={100} />
				<Skeleton width={100} />
				<Skeleton width={100} />
			</Breadcrumbs>
		);
	}

	return (
		<Box sx={styles.wrapper}>
			<Breadcrumbs
				aria-label={translate(breadCrumbsAria)}
				sx={styles.breadcrumbs}
				separator="/"
			>
				<Box
					sx={styles.linkTitle}
					component={Link}
					to={buildCourseRoadmapUrl(courseId)}
				>
					{courseMetadata.name}
				</Box>

				<Box
					sx={styles.linkTitle}
					component={Link}
					to={buildCourseRoadmapUrl(courseId, {
						id: chapterId,
						type: "chapter",
					})}
				>
					{chapter.name}
				</Box>

				{!isFinalExercise(lessonMetadata, chapter) && (
					<Box
						component={Link}
						to={buildCourseRoadmapUrl(courseId, {
							id: lessonId,
							type: "lesson",
						})}
						sx={styles.linkTitle}
					>
						{lessonMetadata.name}
					</Box>
				)}
				<Box sx={styles.simpleTitle}>{task.metadata.name}</Box>
			</Breadcrumbs>
		</Box>
	);
}
