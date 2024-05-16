import { useCourseMetadata } from "hooks/course";
import { createContext, useMemo, useEffect } from "react";
import { Outlet, useParams } from "react-router";

type ChapterContextType = {
	chapterId: string;
};

export const ChapterContext = createContext<ChapterContextType>({
	chapterId: "",
});

export function ChapterProvider(): JSX.Element {
	const { chapterId } = useParams();

	if (!chapterId) {
		throw new Error("undefined chapter id");
	}

	const chapterContext = useMemo<ChapterContextType>(
		() => ({ chapterId }),
		[chapterId]
	);

	const { setData: setCourseMetadata } = useCourseMetadata();

	useEffect(() => {
		setCourseMetadata((currentCourseMetadata) => {
			return {
				...currentCourseMetadata,
				currentChapterId: chapterId,
			};
		});
	}, [chapterId, setCourseMetadata]);

	return (
		<ChapterContext.Provider value={chapterContext}>
			<Outlet />
		</ChapterContext.Provider>
	);
}
