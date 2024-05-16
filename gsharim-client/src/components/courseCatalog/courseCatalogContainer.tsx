import { useMemo } from "react";
import { useCourseMetadataList } from "hooks/course/useCourseMetadataList";
import { CourseCatalogComponent } from "./courseCatalogComponent";
import { CoursesMapping } from "./interfaces";
import { orderAllCoursesByCategory, orderMyCoursesByCategory } from "./utils";

export function CourseCatalogContainer(): JSX.Element {
	const { data: coursesList, isSuccess } = useCourseMetadataList();

	const myCoursesByCategory = useMemo<CoursesMapping>(() => {
		return isSuccess ? orderMyCoursesByCategory(coursesList) : {};
	}, [coursesList, isSuccess]);

	const allCoursesByCategory = useMemo<CoursesMapping>(() => {
		return isSuccess ? orderAllCoursesByCategory(coursesList) : {};
	}, [coursesList, isSuccess]);

	return (
		<CourseCatalogComponent
			allCoursesByCategory={allCoursesByCategory}
			myCoursesByCategory={myCoursesByCategory}
		/>
	);
}
