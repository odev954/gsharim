import fetchCourseMetadataList from "api/courses/fetchCourseMetadataList";
import { CourseMetadata } from "@eco8200/data-models";
import { useServerData } from "hooks/server";
import { UseServerDataResult } from "types/server/useServerData";
import { updateCourseMetadataList } from "api/courses/updateCourseMetadataList";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getHomepageCourseMetadataListQueryKey } from "./consts";

export function useCourseMetadataList(): UseServerDataResult<
	CourseMetadata[],
	Error
> {
	const { i18n } = useTranslation();
	const onUpdate = useCallback(
		async (
			oldCourseMetadata: Array<CourseMetadata>,
			newCourseMetadata: Array<CourseMetadata>
		) => {
			updateCourseMetadataList(newCourseMetadata);
		},
		[]
	);

	const { language } = i18n;
	return useServerData({
		queryKey: [getHomepageCourseMetadataListQueryKey, language],
		queryFn: () => fetchCourseMetadataList(language),
		onUpdate,
	});
}
