import { fetchCourse } from "api/courses/fetchCourse";
import { Course } from "@eco8200/data-models";
import { WithRequired } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { CourseContext } from "contexts";
import { useServerData } from "hooks/server";
import { UseServerDataResult } from "types/server/useServerData";
import { updateCourse } from "api/courses/updateCourse";
import { useTranslation } from "react-i18next";
import { courseAllowedUpdateKeyPaths, getCourseQueryKey } from "./consts";
import { useCourseMetadata } from "./useCourseMetadata";

type UseCourseParamsBase = {
	courseId?: string;
};

type UseCourseParams = WithRequired<UseCourseParamsBase, "courseId">;

export function useCourse(
	params?: UseCourseParams
): UseServerDataResult<Course, unknown> {
	const { courseId: contextCourseId } = useContext(CourseContext);
	const { setData: setCourseMetadata } = useCourseMetadata({
		courseId: contextCourseId,
	});
	const { i18n } = useTranslation();

	const { language } = i18n;
	const courseId = params?.courseId || contextCourseId;
	const onUpdate = useCallback(
		async (oldCourse: Course, newCourse: Course) => {
			return updateCourse(newCourse, setCourseMetadata);
		},
		[setCourseMetadata]
	);

	return useServerData({
		queryKey: [getCourseQueryKey, courseId, language],
		queryFn: () => fetchCourse(courseId, language),
		onUpdate,
		allowedUpdateKeyPaths: courseAllowedUpdateKeyPaths,
	});
}
