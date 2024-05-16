import TaskLayout from "components/taskLayout";
import {
	ChapterContext,
	CourseContext,
	LessonContext,
	TaskContext,
} from "contexts";
import { useContext } from "react";
import useTask from "hooks/tasks/useTask";
import Loader from "components/loading";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import { useCourseMetadata } from "hooks/course";
import useChapter from "hooks/chapter";
import { useLessonMetadata } from "hooks/lesson";
import { pageTemplateTitle, taskPageDefaultTitle } from "./strings";

function TaskContent(): JSX.Element {
	const { courseId } = useContext(CourseContext);
	const { chapterId } = useContext(ChapterContext);
	const { lessonId } = useContext(LessonContext);
	const { taskId } = useContext(TaskContext);
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
		isTaskError ||
		isCourseMetadataError ||
		isChapterError ||
		isLessonMetadataError
	) {
		throw new Error("error fetching task");
	}

	if (
		isTaskLoading ||
		isCourseMetadataLoading ||
		isChapterLoading ||
		isLessonMetadataLoading
	) {
		return <Loader />;
	}

	const taskName = task.metadata.name;

	return (
		<>
			<Seo
				defaultTitle={translate(taskPageDefaultTitle)}
				titleTemplate={`%s | ${translate(pageTemplateTitle)}`}
				title={`${taskName} | ${lessonMetadata.name} | ${chapter.name} | ${courseMetadata.name}`}
				key={taskId}
			/>
			<TaskLayout />
		</>
	);
}

export default TaskContent;
