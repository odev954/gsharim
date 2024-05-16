import { Chapter } from "@eco8200/data-models";
import { useCallback, useContext } from "react";
import { ChapterContext, CourseContext } from "contexts";
import { useCourse } from "hooks/course/useCourse";
import { getItemById } from "utils/course";
import { UseServerDataResult } from "types/server/useServerData";
import { useServerData } from "hooks/server";
import { useTranslation } from "react-i18next";
import { chapterAllowedUpdateKeyPaths, chapterQueryKey } from "./consts";
import { onChapterUpdate } from "./utils";

type UseChapterParams =
	| {
			chapterId: string;
			courseId?: never;
	  }
	| {
			chapterId: string;
			courseId: string;
	  };

export default function useChapter(
	params?: UseChapterParams
): UseServerDataResult<Chapter, unknown> {
	const { courseId: contextCourseId } = useContext(CourseContext);
	const { chapterId: contextChapterId } = useContext(ChapterContext);
	const { i18n } = useTranslation();

	const { language } = i18n;
	const courseId = params?.courseId || contextCourseId;
	const chapterId = params?.chapterId || contextChapterId;

	const { data: course, setData: setCourse } = useCourse({ courseId });

	const chapterParser = useCallback(async () => {
		if (!course) throw new Error("course is unavailable");
		const chapter = getItemById(chapterId, course.chapters);
		return chapter;
	}, [course, chapterId]);

	const onUpdate = useCallback(
		async (oldChapter: Chapter, newChapter: Chapter) => {
			return onChapterUpdate(chapterId, newChapter, setCourse);
		},
		[chapterId, setCourse]
	);

	return useServerData<Chapter>({
		queryKey: [chapterQueryKey, courseId, chapterId, language],
		queryFn: chapterParser,
		enabled: !!course,
		onUpdate,
		allowedUpdateKeyPaths: chapterAllowedUpdateKeyPaths,
	});
}
