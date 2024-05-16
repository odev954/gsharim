import { courseBackground } from "assets/courseWelcomePage";
import Loader from "components/loading";
import WelcomePage from "components/welcomePage";
import { useParams } from "react-router";
import { calcProgress, isActive } from "utils/course";
import { Box } from "@mui/material";
import { useAuth } from "hooks/users/useAuth";
import { useTranslation } from "react-i18next";
import { useCourseMetadata } from "hooks/course/useCourseMetadata";
import { Outlet } from "react-router-dom";
import { useCourse } from "hooks/course";
import { createContext, useCallback, useMemo } from "react";
import Seo from "components/helmetSeo";
import { layoutType } from "./consts";
import {
	courseButtonText,
	coursePageDefaultTitle,
	creatorPrefix,
	pageTemplateTitle,
} from "./strings";
import { welcomePageContainer } from "./styles";

type CourseContextType = {
	courseId: string;
};

export const CourseContext = createContext<CourseContextType>({ courseId: "" });

export function CourseProvider(): JSX.Element {
	const { courseId } = useParams<CourseContextType>();

	if (!courseId) {
		throw new Error("undefined course id");
	}

	const { t: translate } = useTranslation();
	const {
		data: courseMetadata,
		isError: isCourseMetadataError,
		isLoading: isCourseMetadataLoading,
		setData: setCourseMetadata,
	} = useCourseMetadata({ courseId });

	const { isAuthenticated, loginWithRedirect } = useAuth();

	const {
		data: course,
		isError: isCourseError,
		isLoading: isCourseLoading,
	} = useCourse({ courseId });

	const activateCourse = useCallback(() => {
		if (!course) throw new Error("course is not available");
		if (!courseMetadata) throw new Error("courseMetadata is not available");
		if (courseMetadata.currentChapterId === undefined) {
			setCourseMetadata((currentCourseMetadata) => {
				return {
					...currentCourseMetadata,
					progress: calcProgress(course.chapters),
					currentChapterId: course.chapters[0].id,
				};
			});
		}
	}, [course, courseMetadata, setCourseMetadata]);

	const courseContext = useMemo(
		() => ({
			courseId,
		}),
		[courseId]
	);

	if (isCourseMetadataError) {
		throw new Error("error fetching course metadata");
	}

	if (isCourseError) {
		throw new Error("error fetching course");
	}

	if (isCourseMetadataLoading || isCourseLoading) {
		return <Loader isPage />;
	}

	if (!courseMetadata.public && !isAuthenticated) {
		const currentPath = window.location.href;
		loginWithRedirect({ appState: { returnTo: currentPath } });
		return <Loader isPage />;
	}

	if (!isActive(courseMetadata)) {
		const subSubtitle = `${translate(creatorPrefix)} ${
			courseMetadata.creator.name
		}`;
		return (
			<>
				<Seo
					defaultTitle={translate(coursePageDefaultTitle)}
					titleTemplate={`%s | ${translate(pageTemplateTitle)}`}
					title={courseMetadata.name}
					key={courseMetadata.id}
				/>
				<Box sx={welcomePageContainer}>
					<WelcomePage
						buttonText={courseButtonText}
						mainTitle={courseMetadata.name}
						subTitle={courseMetadata.description}
						subSubtitle={subSubtitle}
						background={courseBackground}
						layoutType={layoutType}
						onClick={activateCourse}
					/>
				</Box>
			</>
		);
	}

	return (
		<CourseContext.Provider value={courseContext}>
			<Outlet />
		</CourseContext.Provider>
	);
}
