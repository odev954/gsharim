import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Gallery from "components/galleryDisplay";
import { CourseMetadata } from "@eco8200/data-models";
import CourseListItem from "components/courseListItem";
import { coursesCatalogUrl } from "utils/course";
import { useLogger } from "hooks/logger";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import { noItemsMessage, title } from "./strings";
import * as styles from "./styles";

type CourseListComponentProps = {
	courses: CourseMetadata[];
};

export default function WelcomePageCourseListComponent({
	courses,
}: CourseListComponentProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const logger = useLogger();
	const { i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);
	const allCoursesComponents = useMemo(() => {
		return courses.map((courseMetadata) => {
			return (
				<CourseListItem
					key={courseMetadata.id}
					courseMetadata={courseMetadata}
				/>
			);
		});
	}, [courses]);
	const log = useCallback(() => {
		logger.info("course-catalog-clicked", "user clicked on course catalog");
	}, [logger]);

	return (
		<Box sx={isMobile ? styles.mobileContainer : styles.container}>
			<Box sx={styles.headlineWrapper}>
				<Box
					sx={styles.text}
					component={Link}
					to={coursesCatalogUrl}
					onClick={log}
				>
					<Text textToTranslate={title} />
				</Box>
			</Box>
			<Box sx={styles.courseList}>
				<Gallery noItemsMessage={noItemsMessage} direction={dir}>
					{allCoursesComponents}
				</Gallery>
			</Box>
		</Box>
	);
}
