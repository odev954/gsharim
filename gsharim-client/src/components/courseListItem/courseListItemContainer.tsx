import { useMemo } from "react";
import {
	buildUrl,
	buildDurationDisplayString,
	buildCourseRoadmapUrl,
} from "utils/course";
import { useTranslation } from "react-i18next";
import { CourseMetadata } from "@eco8200/data-models";
import CourseListItemComponent from "./courseListItemComponent";
import { hoursPostfix, minutesPrefix, minutesPostfix } from "./strings";

export interface CourseListItemContainerProps {
	courseMetadata: CourseMetadata;
	itemRef?: React.Ref<Element>;
}

export default function CourseListItemContainer({
	courseMetadata,
	itemRef,
}: CourseListItemContainerProps): JSX.Element {
	const { t: translate } = useTranslation();

	const courseUrl = useMemo(
		() => buildUrl({ courseId: courseMetadata.id }),
		[courseMetadata.id]
	);

	const courseRoadmapUrl = useMemo(
		() => buildCourseRoadmapUrl(courseMetadata.id),
		[courseMetadata.id]
	);

	const duration = useMemo(
		() =>
			buildDurationDisplayString(
				translate(hoursPostfix),
				translate(minutesPrefix),
				translate(minutesPostfix),
				courseMetadata.duration
			),
		[courseMetadata.duration, translate]
	);

	return (
		<CourseListItemComponent
			courseMetadata={courseMetadata}
			itemRef={itemRef}
			courseUrl={courseUrl}
			courseRoadmapUrl={courseRoadmapUrl}
			durationDisplay={duration}
		/>
	);
}
