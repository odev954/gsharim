import Loader from "components/loading";
import { CourseContext, ChapterContext } from "contexts";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { buildUrl } from "utils/course/buildUrls";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import { useCourseMetadata } from "hooks/course/useCourseMetadata";
import useChapter from "hooks/chapter";
import { pageTemplateTitle } from "../courseRoadmap/strings";
import { chapterPageDefaultTitle } from "./strings";

function ChapterBody(): JSX.Element {
	const { courseId } = useContext(CourseContext);
	const { chapterId } = useContext(ChapterContext);
	const { t: translate } = useTranslation();

	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
	} = useCourseMetadata();

	const {
		data: chapter,
		isError: isChapterError,
		isLoading: isChapterLoading,
	} = useChapter();

	if (isChapterError) {
		throw new Error("error fetching chapter");
	}

	if (isCourseMetadataError) {
		throw new Error("error fetching course metadata");
	}

	if (isChapterLoading || isCourseMetadataLoading) {
		return <Loader isPage />;
	}

	const firstLessonId = chapter.lessonsMetadata[0].id;
	const recentLessonId = chapter.currentLessonId || firstLessonId;
	const lessonUrl = buildUrl({ courseId, chapterId, lessonId: recentLessonId });

	return (
		<>
			<Seo
				defaultTitle={translate(chapterPageDefaultTitle)}
				titleTemplate={`%s | ${translate(pageTemplateTitle)}`}
				title={courseMetadata.name}
			/>
			<Navigate to={lessonUrl} replace />;
		</>
	);
}

export default ChapterBody;
