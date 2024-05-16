import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
	CourseRoadmap,
	CourseCatalog,
	Task,
	Lesson,
	Chapter,
	Course,
	Welcome,
} from "pages";
import Loader from "components/loading";
import { AuthContext } from "contexts/auth";
import "./prefetchs"; // importing this causes the prefetchs to run
import { useTranslation } from "react-i18next";
import {
	ChapterProvider,
	CourseProvider,
	LessonProvider,
	TaskProvider,
} from "contexts";
import { baseCourseRoadmapUrl, coursesCatalogUrl } from "utils/course";

function App(): JSX.Element {
	const { isLoading } = useContext(AuthContext);
	const { i18n } = useTranslation();

	useEffect(() => {
		document.documentElement.setAttribute("lang", i18n.language);
		document.documentElement.setAttribute("dir", i18n.dir(i18n.language));
	}, [i18n, i18n.language]);

	if (isLoading) return <Loader isPage />;

	return (
		<BrowserRouter>
			<Routes>
				<Route path={coursesCatalogUrl} element={<CourseCatalog />} />
				<Route element={<CourseProvider />}>
					<Route
						path={`${baseCourseRoadmapUrl}/:courseId`}
						element={<CourseRoadmap />}
					/>
					<Route path="/course/:courseId/" element={<Course />} />
					<Route element={<ChapterProvider />}>
						<Route
							path="/course/:courseId/chapter/:chapterId"
							element={<Chapter />}
						/>
						<Route element={<LessonProvider />}>
							<Route
								path="/course/:courseId/chapter/:chapterId/lesson/:lessonId"
								element={<Lesson />}
							/>
							<Route element={<TaskProvider />}>
								<Route
									path="/course/:courseId/chapter/:chapterId/lesson/:lessonId/task/:taskId"
									element={<Task />}
								/>
							</Route>
						</Route>
					</Route>
				</Route>
				<Route path="/*" element={<Welcome />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
