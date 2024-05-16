import { Box } from "@mui/material";
import TabsGallery from "components/tabsGallery";
import { useMemo } from "react";
import Text from "components/text";
import { textStyles } from "./styles";
import * as strings from "./strings";
import { CoursesMapping, CoursesComponentMapping } from "./interfaces";
import { CoursesMappingToComponentConvertion } from "./utils";

interface CourseCatalogComponentProps {
	myCoursesByCategory: CoursesMapping;
	allCoursesByCategory: CoursesMapping;
}

export function CourseCatalogComponent({
	myCoursesByCategory,
	allCoursesByCategory,
}: CourseCatalogComponentProps): JSX.Element {
	const myCoursesComponentsByCategory: CoursesComponentMapping = useMemo(() => {
		return CoursesMappingToComponentConvertion(myCoursesByCategory);
	}, [myCoursesByCategory]);
	const allCoursesComponentsByCategory: CoursesComponentMapping =
		useMemo(() => {
			return CoursesMappingToComponentConvertion(allCoursesByCategory);
		}, [allCoursesByCategory]);

	return (
		<>
			<Box sx={textStyles}>
				<Text textToTranslate={strings.firstTitle} />
			</Box>
			<TabsGallery
				noItemsMessage={strings.myCoursesNoItemsMessage}
				itemsMappingByTabs={myCoursesComponentsByCategory}
			/>

			<Box sx={textStyles}>
				<Text textToTranslate={strings.secondTitle} />
			</Box>
			<TabsGallery
				noItemsMessage={strings.allCoursesNoItemsMessage}
				itemsMappingByTabs={allCoursesComponentsByCategory}
			/>
		</>
	);
}
