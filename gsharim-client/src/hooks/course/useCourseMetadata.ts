import { CourseMetadata } from "@eco8200/data-models";
import { WithRequired } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { CourseContext } from "contexts";
import { useServerData } from "hooks/server";
import { UseServerDataResult } from "types/server/useServerData";
import { getItemById } from "utils/course";
import { useTranslation } from "react-i18next";
import {
	courseMetadataAllowedToUpdateFields,
	getCourseMetadataQueryKey,
} from "./consts";
import { useCourseMetadataList } from "./useCourseMetadataList";
import { onCourseMetadataUpdate } from "./utils";

type UseCourseMetadataParamsBase = {
	courseId?: string;
};

type UseCourseMetadataParams = WithRequired<
	UseCourseMetadataParamsBase,
	"courseId"
>;

export function useCourseMetadata(
	params?: UseCourseMetadataParams
): UseServerDataResult<CourseMetadata, unknown> {
	const { courseId: contextCourseId } = useContext(CourseContext);
	const { i18n } = useTranslation();

	const { language } = i18n;
	const courseId = params?.courseId || contextCourseId;

	const { data: courseMetadataList, setData: setCourseMetadataList } =
		useCourseMetadataList();

	const courseMetadataParser = useCallback(async () => {
		if (!courseMetadataList)
			throw new Error("courses metadata list is unavailable");
		const courseMetadata = getItemById(courseId, courseMetadataList);
		return courseMetadata;
	}, [courseMetadataList, courseId]);

	const onUpdate = useCallback(
		async (
			oldCourseMetadata: CourseMetadata,
			newCourseMetadata: CourseMetadata
		) => {
			return onCourseMetadataUpdate(
				courseId,
				newCourseMetadata,
				setCourseMetadataList
			);
		},
		[courseId, setCourseMetadataList]
	);

	return useServerData({
		queryKey: [getCourseMetadataQueryKey, courseId, language],
		queryFn: courseMetadataParser,
		enabled: !!courseMetadataList,
		onUpdate,
		allowedUpdateKeyPaths: courseMetadataAllowedToUpdateFields,
	});
}
