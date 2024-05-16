import { Box, Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { CourseMetadata } from "@eco8200/data-models";
import { useCallback } from "react";
import { ReactComponent as Clock } from "assets/courseListItem/clock.svg";
import { useLogger } from "hooks/logger";
import { useTranslation } from "react-i18next";
import Text from "components/text";
import { isActive } from "utils/course";
import * as styles from "./styles";
import {
	startLearning,
	continueLearning,
	difficulty,
	imageAlt,
	createdByPrefix,
	includesCertificate,
	studentsNumber,
} from "./strings";
import ProgressBar from "../progressBar/progressBar";
import CourseDetails from "./courseDetails";
import { difficultyLevelSvgDictionary } from "./consts";
import Ribbon from "./ribbon";

interface CourseListItemComponentProps {
	courseMetadata: CourseMetadata;
	itemRef?: React.Ref<Element>;
	courseRoadmapUrl: string;
	courseUrl: string;
	durationDisplay: string;
}

export default function CourseListItemComponent({
	courseMetadata,
	itemRef,
	courseRoadmapUrl,
	courseUrl,
	durationDisplay,
}: CourseListItemComponentProps): JSX.Element {
	const { t: translate, i18n } = useTranslation();
	const isRtl = i18n.dir(i18n.language) === "rtl";
	const logger = useLogger();

	const CourseDifficultySvg =
		difficultyLevelSvgDictionary[courseMetadata.difficulty];

	const logCourseClick = useCallback(() => {
		logger.info("course-clicked", `${courseMetadata.name} course clicked`, {
			courseName: courseMetadata.name,
		});
	}, [logger, courseMetadata.name]);

	return (
		<Tooltip
			title={
				<CourseDetails
					courseUrl={courseUrl}
					courseRoadmapUrl={courseRoadmapUrl}
					courseMetadata={courseMetadata}
				/>
			}
			placement={isRtl ? "right" : "left"}
			slotProps={{
				tooltip: { sx: styles.tooltipBackground },
			}}
		>
			<Box sx={styles.container} ref={itemRef} onClick={logCourseClick}>
				<Box sx={styles.imageContainer} component={Link} to={courseRoadmapUrl}>
					{courseMetadata.ribbon && <Ribbon type={courseMetadata.ribbon} />}
					<Box
						component="img"
						alt={translate(imageAlt)}
						src={courseMetadata.thumbnailUrl}
						sx={styles.image}
					/>
					<Box sx={styles.tagsContainer}>
						<Box sx={styles.tag}>
							<Text textToTranslate={studentsNumber} />
							{courseMetadata.registrations.toString()}
						</Box>
						{courseMetadata.hasCertificate && (
							<Box sx={styles.tag}>
								<Text textToTranslate={includesCertificate} />
							</Box>
						)}
					</Box>
				</Box>
				<Box component={Link} to={courseRoadmapUrl} sx={styles.courseName}>
					{courseMetadata.name}
				</Box>
				<Box sx={styles.createdBy}>
					<Text textToTranslate={createdByPrefix} />
					{courseMetadata.creator.name}
				</Box>

				{isActive(courseMetadata) ? (
					<>
						<ProgressBar percentage={courseMetadata.progress} />
						<Button
							component={Link}
							to={courseUrl}
							color="azure"
							variant="contained"
							sx={styles.learningButton}
						>
							<Text textToTranslate={continueLearning} />
						</Button>
					</>
				) : (
					<>
						<Button
							component={Link}
							to={courseRoadmapUrl}
							color="primary"
							variant="outlined"
							sx={styles.learningButton}
						>
							<Text textToTranslate={startLearning} />
						</Button>
						<Box sx={styles.generalData}>
							<Clock />
							<Box sx={styles.data}>{durationDisplay}</Box>
							<CourseDifficultySvg />
							<Box sx={styles.data}>
								<Text textToTranslate={difficulty} />
								{courseMetadata.difficulty}
							</Box>
						</Box>
					</>
				)}
			</Box>
		</Tooltip>
	);
}
