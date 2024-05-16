import { Box, Button, Typography } from "@mui/material";
import TaskFooter from "components/taskFooter";
import {
	CourseContext,
	ChapterContext,
	LessonContext,
	TaskContext,
} from "contexts";
import { useContext } from "react";
import Loader from "components/loading";
import useNavigateInCourse from "hooks/navigation/useNavigateInCourse";
import LessonProgressBar from "components/lessonProgressBar";
import { useLesson } from "hooks/lesson";
import { useLogger } from "hooks/logger";
import Text from "components/text";
import TaskBreadcrumbs from "components/taskBreadcrumbs";
import useTask from "hooks/tasks/useTask";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import TaskContent from "./taskContent";
import { skipTask } from "./strings";

function TaskBody(): JSX.Element {
	const { courseId } = useContext(CourseContext);
	const { chapterId } = useContext(ChapterContext);
	const { lessonId } = useContext(LessonContext);
	const { taskId } = useContext(TaskContext);
	const logger = useLogger();
	const { i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);

	const courseNavigation = useNavigateInCourse({
		courseId,
		chapterId,
		lessonId,
		taskId,
	});

	const {
		data: lesson,
		isLoading: isLessonLoading,
		isError: isLessonError,
	} = useLesson();

	const {
		data: task,
		isLoading: isTaskLoading,
		isError: isTaskError,
	} = useTask();

	if (courseNavigation.isError) {
		throw new Error("error using course navigation");
	}

	if (isLessonError) {
		throw new Error("error fetching lesson");
	}

	if (isTaskError) {
		throw new Error("error fetching task");
	}

	if (courseNavigation.isLoading || isLessonLoading || isTaskLoading) {
		return <Loader isPage />;
	}

	const skipTaskWrapped = (): void => {
		logger.info(
			"skip-button-clicked",
			`lesson footer ${skipTask} button was clicked`
		);

		courseNavigation.goNext();
	};

	return (
		<>
			<Box sx={styles.progressBarContainer}>
				<LessonProgressBar
					tasksMetadata={lesson.tasksMetadata}
					currentTaskId={taskId}
					direction={dir}
				/>
			</Box>
			{courseNavigation.nextType && (
				<Box sx={styles.taskHeaderContainer}>
					<Box sx={styles.titleContainer}>
						<Box sx={styles.taskTitle}>{task.metadata.name}</Box>
						<TaskBreadcrumbs
							courseId={courseId}
							chapterId={chapterId}
							lessonId={lessonId}
							taskId={taskId}
						/>
					</Box>
					<Button
						onClick={skipTaskWrapped}
						color="secondary"
						variant="outlined"
					>
						<Typography>
							<Text textToTranslate={skipTask} />
						</Typography>
					</Button>
				</Box>
			)}
			<TaskContent />
			<Box sx={styles.taskFooterContainer}>
				<TaskFooter courseNavigation={courseNavigation} />
			</Box>
		</>
	);
}

export default TaskBody;
