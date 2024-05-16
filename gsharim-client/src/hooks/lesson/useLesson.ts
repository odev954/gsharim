import { fetchLesson } from "api/lesson";
import { Lesson } from "@eco8200/data-models";
import { useCallback, useContext } from "react";
import { LessonContext } from "contexts";
import { useServerData } from "hooks/server";
import { UseServerDataResult } from "types/server/useServerData";
import { useTranslation } from "react-i18next";
import { lessonAllowedUpdateKeyPaths, lessonContentQueryKey } from "./consts";
import useLessonMetadata from "./useLessonMetadata";
import { onLessonUpdate } from "./utils";

type UseLessonParams = {
	lessonId: string;
};

export default function useLesson(
	params?: UseLessonParams
): UseServerDataResult<Lesson, unknown> {
	const { lessonId: contextLessonId } = useContext(LessonContext);
	const { setData: setLessonMetadata } = useLessonMetadata({
		lessonId: contextLessonId,
	});
	const { i18n } = useTranslation();

	const { language } = i18n;
	const lessonId = params?.lessonId || contextLessonId;

	const lessonContentFetcher = useCallback(
		() => fetchLesson(lessonId, language),
		[lessonId, language]
	);

	const onUpdate = useCallback(
		async (oldLesson: Lesson, newLesson: Lesson) => {
			return onLessonUpdate(newLesson, setLessonMetadata);
		},
		[setLessonMetadata]
	);

	return useServerData({
		queryKey: [lessonContentQueryKey, lessonId, language],
		queryFn: lessonContentFetcher,
		onUpdate,
		allowedUpdateKeyPaths: lessonAllowedUpdateKeyPaths,
	});
}
