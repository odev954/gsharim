import { LessonMetadata } from "@eco8200/data-models";
import { useCallback, useContext } from "react";
import { ChapterContext, CourseContext, LessonContext } from "contexts";
import { getItemById } from "utils/course";
import useChapter from "hooks/chapter";
import { useServerData } from "hooks/server";
import { UseServerDataResult } from "types/server/useServerData";
import { useTranslation } from "react-i18next";
import { lessonMetadataAllowedUpdateKeyPaths, lessonQueryKey } from "./consts";
import { onLessonMetaDataUpdate } from "./utils";

type UseLessonMetadataProps =
	| {
			lessonId: string;
			chapterId?: never;
			courseId?: never;
	  }
	| {
			lessonId: string;
			chapterId: string;
			courseId?: never;
	  }
	| {
			lessonId: string;
			chapterId: string;
			courseId: string;
	  };

export default function useLessonMetadata(
	params?: UseLessonMetadataProps
): UseServerDataResult<LessonMetadata, unknown> {
	const { courseId: contextCourseId } = useContext(CourseContext);
	const { chapterId: contextChapterId } = useContext(ChapterContext);
	const { lessonId: contextLessonId } = useContext(LessonContext);
	const { i18n } = useTranslation();

	const { language } = i18n;
	const lessonId = params?.lessonId || contextLessonId;
	const chapterId = params?.chapterId || contextChapterId;
	const courseId = params?.courseId || contextCourseId;

	const { data: chapter, setData: setChapter } = useChapter({
		courseId,
		chapterId,
	});

	const lessonParser = useCallback(async () => {
		if (!chapter) throw new Error("failed to fetch chapter");

		const lesson = getItemById(lessonId, chapter.lessonsMetadata);

		return lesson;
	}, [chapter, lessonId]);

	const onUpdate = useCallback(
		async (oldData: LessonMetadata, newData: LessonMetadata) => {
			await onLessonMetaDataUpdate(newData, chapterId, lessonId, setChapter);
		},
		[chapterId, lessonId, setChapter]
	);

	return useServerData<LessonMetadata>({
		queryKey: [lessonQueryKey, courseId, chapterId, lessonId, language],
		queryFn: lessonParser,
		enabled: !!chapter,
		onUpdate,
		allowedUpdateKeyPaths: lessonMetadataAllowedUpdateKeyPaths,
	});
}
