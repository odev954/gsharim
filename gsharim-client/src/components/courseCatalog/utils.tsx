import CourseListItem from "components/courseListItem";
import { CourseMetadata, RibbonType } from "@eco8200/data-models";
import { groupBy, mapValues } from "lodash-es";
import { isActive } from "utils/course";
import { Active } from "utils/course/types";
import { CoursesComponentMapping, CoursesMapping } from "./interfaces";
import * as strings from "./strings";

const convertCourseToComponent = (
	courseMetadata: CourseMetadata
): JSX.Element => {
	return (
		<CourseListItem key={courseMetadata.id} courseMetadata={courseMetadata} />
	);
};

export const CoursesMappingToComponentConvertion = (
	mapping: CoursesMapping
): CoursesComponentMapping => {
	const newMapping: CoursesComponentMapping = mapValues(
		mapping,
		(courseArray: CourseMetadata[]) => {
			return courseArray.map(convertCourseToComponent);
		}
	);

	return newMapping;
};

const addEmptyCategories = (
	categories: string[],
	coursesByCategory: CoursesMapping
): CoursesMapping => {
	const updatedCoursesByCategory = Object.assign(coursesByCategory);
	categories.forEach((key) => {
		if (!updatedCoursesByCategory[key]) {
			updatedCoursesByCategory[key] = [];
		}
	});
	return updatedCoursesByCategory;
};

const getCategoryOfCourse = (course: CourseMetadata): string => {
	let category = strings.allCourses;
	if (course.ribbon === RibbonType.New) {
		category = strings.newCourses;
	}
	if (course.ribbon === RibbonType.Recommended) {
		category = strings.recommendedCourses;
	}
	if (course.registrations > 1000) {
		category = strings.popularCourses;
	}
	return category;
};

export const orderAllCoursesByCategory = (
	coursesList: CourseMetadata[]
): CoursesMapping => {
	const allCoursesByCategory: CoursesMapping = {
		[strings.allCourses]: coursesList,
		...groupBy(coursesList, getCategoryOfCourse),
	};
	return addEmptyCategories(
		[
			strings.newCourses,
			strings.popularCourses,
			strings.recommendedCourses,
			strings.allCourses,
		],
		allCoursesByCategory
	);
};

const getCategoryOfActiveCourse = (course: Active<CourseMetadata>): string => {
	if (course.progress < 100) {
		return strings.inProgress;
	}
	return strings.completed;
};

export const orderMyCoursesByCategory = (
	coursesList: CourseMetadata[]
): CoursesMapping => {
	const activeCourses = coursesList.filter<Active<CourseMetadata>>(isActive);
	const myCoursesByCategory = groupBy(activeCourses, getCategoryOfActiveCourse);
	return addEmptyCategories(
		[strings.inProgress, strings.completed],
		myCoursesByCategory
	);
};
