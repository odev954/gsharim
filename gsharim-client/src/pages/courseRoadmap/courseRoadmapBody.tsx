import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCourseMetadata, useCourse } from "hooks/course";
import CourseRoadmapChapter from "components/courseRoadmapChapter";
import Seo from "components/helmetSeo";
import Loader from "components/loading";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import * as strings from "./strings";
import * as consts from "./consts";
import { roadmapPageDefaultTitle } from "./strings";
import { getBackgroundImage } from "./utils";

function CourseRoadmapBody(): JSX.Element {
	const { t: translate } = useTranslation();
	const [searchParams] = useSearchParams();
	const chapterIdToScroll = searchParams.get(consts.chapterIdSearchParamKey);
	const lessonIdToScroll = searchParams.get(consts.lessonIdSearchParamKey);

	const scrollRef = useRef<HTMLDivElement>(null);

	const {
		data: course,
		isError: isCourseError,
		isLoading: isCourseLoading,
	} = useCourse();

	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
	} = useCourseMetadata();

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
			inline: "start",
		});
	}, [scrollRef]);

	if (isCourseError) {
		throw new Error("error in course fetching");
	}

	if (isCourseMetadataError) {
		throw new Error("error in course metadata fetching");
	}

	if (isCourseLoading || isCourseMetadataLoading) {
		return <Loader isPage />;
	}

	const backgroundImage = getBackgroundImage(course.backgroundUrl);

	return (
		<Box
			sx={{
				...styles.container,
				backgroundImage,
				height: styles.normalHeight,
			}}
		>
			<Seo
				defaultTitle={translate(roadmapPageDefaultTitle)}
				titleTemplate={`%s | ${translate(strings.pageTemplateTitle)}`}
				title={courseMetadata.name}
			/>
			{course.chapters.map((chapter) => (
				<CourseRoadmapChapter
					chapterRef={chapter.id === chapterIdToScroll ? scrollRef : null}
					courseId={courseMetadata.id}
					key={chapter.id}
					chapter={chapter}
					lessonIdToRef={lessonIdToScroll}
					lessonRef={scrollRef}
				/>
			))}
			<Box sx={styles.mapEnd} />
		</Box>
	);
}

export default CourseRoadmapBody;
