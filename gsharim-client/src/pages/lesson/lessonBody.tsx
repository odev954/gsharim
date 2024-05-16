import Loader from "components/loading";
import { useCourse } from "hooks/course/useCourse";
import { useLesson, useLessonMetadata } from "hooks/lesson";
import { buildUrl } from "utils/course/buildUrls";
import { Navigate } from "react-router-dom";
import { CourseContext, ChapterContext, LessonContext } from "contexts";
import { useContext } from "react";

function LessonBody(): JSX.Element {
	const { courseId } = useContext(CourseContext);
	const { chapterId } = useContext(ChapterContext);
	const { lessonId } = useContext(LessonContext);

	const { isLoading: isCourseLoading, isError: isCourseError } = useCourse();

	const {
		data: lessonMetaData,
		isLoading: isLessonMetadataLoading,
		isError: isLessonMetadataError,
	} = useLessonMetadata();

	const { isLoading: isLessonLoading, isError: isLessonError } = useLesson();

	if (isCourseError) {
		throw new Error("error fetching course content");
	}

	if (isLessonError) {
		throw new Error("error fetching lesson");
	}

	if (isLessonMetadataError) {
		throw new Error("error fetching lesson");
	}

	if (isCourseLoading || isLessonLoading || isLessonMetadataLoading) {
		return <Loader isPage />;
	}

	const recentTaskId = lessonMetaData.currentTaskId;
	const taskUrl = buildUrl({
		courseId,
		chapterId,
		lessonId,
		taskId: recentTaskId,
	});

	return <Navigate to={taskUrl} replace />;
}

export default LessonBody;
