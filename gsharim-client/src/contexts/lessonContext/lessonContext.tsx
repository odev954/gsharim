import Loader from "components/loading";
import WelcomePage from "components/welcomePage";
import { useCourseMetadata } from "hooks/course/useCourseMetadata";
import { createContext, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { lessonBackground } from "assets/lessonWelcomePage";
import useChapter from "hooks/chapter";
import { useLessonMetadata, useLesson } from "hooks/lesson";
import { findIndexById } from "utils/common";
import { isActive } from "utils/course";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "components/helmetSeo";
import { calcLessonProgress } from "utils/lesson/lessonProgress";
import {
	creatorPrefix,
	lessonButtonText,
	lessonPageDefaultTitle,
	pageTemplateTitle,
} from "./strings";

import { lessonWelcomePageLayoutType } from "./consts";

type LessonContextType = {
	lessonId: string;
};

export const LessonContext = createContext<LessonContextType>({
	lessonId: "",
});

export function LessonProvider(): JSX.Element {
	const { lessonId } = useParams();
	const { t: translate } = useTranslation();
	if (!lessonId) {
		throw new Error("undefined lesson id");
	}

	const {
		data: chapter,
		isLoading: isChapterLoading,
		isError: isChapterError,
		setData: setChapter,
	} = useChapter();

	useEffect(() => {
		setChapter((currentChapter) => {
			return { ...currentChapter, currentLessonId: lessonId };
		});
	}, [lessonId, setChapter]);

	const {
		data: lesson,
		isLoading: isLessonLoading,
		isError: isLessonError,
	} = useLesson({ lessonId });

	const {
		data: lessonMetadata,
		setData: setLessonMetadata,
		isLoading: isLessonMetadataLoading,
		isError: isLessonMetadataError,
	} = useLessonMetadata({ lessonId });

	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
	} = useCourseMetadata();

	const activateLesson = useCallback(() => {
		if (!lesson) throw new Error("Lesson is not available");
		if (!lessonMetadata) throw new Error("LessonMetadata is not available");
		if (lessonMetadata.currentTaskId === undefined) {
			setLessonMetadata((currentLessonMetadata) => {
				return {
					...currentLessonMetadata,
					progress: calcLessonProgress(lesson.tasksMetadata),
					currentTaskId: lesson.tasksMetadata[0].id,
				};
			});
		}
	}, [lesson, lessonMetadata, setLessonMetadata]);

	const lessonContext = useMemo(() => ({ lessonId }), [lessonId]);

	if (isCourseMetadataError) {
		throw new Error("error fetching course metadata");
	}

	if (isChapterError) {
		throw new Error("error fetching chapter");
	}

	if (isLessonError) {
		throw new Error("error fetching lesson");
	}

	if (isLessonMetadataError) {
		throw new Error("error fetching lesson metadata");
	}

	if (
		isCourseMetadataLoading ||
		isChapterLoading ||
		isLessonMetadataLoading ||
		isLessonLoading
	) {
		return <Loader isPage />;
	}

	if (!isActive(lessonMetadata)) {
		const welcomePageMainTitle = `${chapter.name}/${lessonMetadata.name}`;
		const subSubtitle = `${translate(creatorPrefix)} ${
			courseMetadata.creator.name
		}`;
		const lessonIndex = findIndexById(chapter.lessonsMetadata, lessonId);

		return (
			<>
				<Seo
					defaultTitle={translate(lessonPageDefaultTitle)}
					titleTemplate={`%s | ${translate(pageTemplateTitle)}`}
					title={`${lessonMetadata.name} | ${courseMetadata.name}`}
					key={lessonMetadata.id}
				/>
				<WelcomePage
					buttonText={lessonButtonText}
					mainTitle={welcomePageMainTitle}
					subTitle={lessonMetadata.description}
					subSubtitle={subSubtitle}
					layoutType={lessonWelcomePageLayoutType}
					bannerDisplayNumber={lessonIndex + 1}
					onClick={activateLesson}
					background={lessonBackground}
				/>
			</>
		);
	}

	return (
		<LessonContext.Provider value={lessonContext}>
			<Outlet />
		</LessonContext.Provider>
	);
}
