import Loader from "components/loading";
import Seo from "components/helmetSeo";
import { Navigate } from "react-router-dom";
import { buildUrl } from "utils/course";
import { useCourse } from "hooks/course/useCourse";
import { useContext } from "react";
import { CourseContext } from "contexts";
import { useCourseMetadata } from "hooks/course/useCourseMetadata";
import { useTranslation } from "react-i18next";
import * as strings from "../courseRoadmap/strings";
import { coursePageDefaultTitle } from "./strings";

function CourseBody(): JSX.Element {
	const { courseId } = useContext(CourseContext);
	const { t: translate } = useTranslation();

	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
	} = useCourseMetadata({ courseId });

	const {
		data: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
	} = useCourse({ courseId });

	if (isCourseMetadataError) {
		throw new Error("error fetching course Metadata");
	}

	if (isCourseError) {
		throw new Error("error fetching course");
	}

	if (isCourseMetadataLoading || isCourseLoading) {
		return <Loader isPage />;
	}

	const firstChapterId = course.chapters[0].id;
	const recentChapterId = courseMetadata.currentChapterId || firstChapterId;

	const chapterUrl = buildUrl({ courseId, chapterId: recentChapterId });

	return (
		<>
			<Seo
				defaultTitle={translate(coursePageDefaultTitle)}
				titleTemplate={`%s | ${translate(strings.pageTemplateTitle)}`}
				title={courseMetadata.name}
			/>
			<Navigate to={chapterUrl} replace />;
		</>
	);
}

export default CourseBody;
