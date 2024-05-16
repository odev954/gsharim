import { Box, Button, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import { CourseMetadata } from "@eco8200/data-models";
import { uniq } from "lodash-es";
import { buildDurationDisplayString, isActive } from "utils/course";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Text from "components/text";
import { courseDescription, skills, time } from "./strings";
import {
	boldTitle,
	container,
	globalContainer,
	header,
	property,
	skillsContainer,
	smallTitle,
	tagsContainer,
	text,
	tagChip,
} from "./styles";
import { learningButton } from "../styles";
import {
	continueLearning,
	difficulty,
	hoursPostfix,
	minutesPostfix,
	minutesPrefix,
	startLearning,
} from "../strings";

type CourseDetailsProps = {
	courseMetadata: CourseMetadata;
	courseUrl: string;
	courseRoadmapUrl: string;
};

export default function CourseDetails({
	courseMetadata,
	courseUrl,
	courseRoadmapUrl,
}: CourseDetailsProps): JSX.Element {
	const { t: translate } = useTranslation();

	const duration = useMemo(
		() =>
			buildDurationDisplayString(
				translate(hoursPostfix),
				translate(minutesPrefix),
				translate(minutesPostfix),
				courseMetadata.duration
			),
		[courseMetadata.duration, translate]
	);
	return (
		<Box sx={globalContainer}>
			<Box sx={container}>
				<Box sx={[property, header]}>{courseMetadata.name}</Box>
				<Box sx={property}>
					<Box sx={smallTitle}>
						<Text textToTranslate={difficulty} />
						{courseMetadata.difficulty}
					</Box>
				</Box>

				<Box sx={[property, tagsContainer]}>
					{courseMetadata.tags.map((tag) => {
						return <Chip label={tag.label} key={tag.id} sx={tagChip} />;
					})}
				</Box>

				<Box sx={property}>
					<Box sx={smallTitle}>
						<Text textToTranslate={time} />: {duration}
					</Box>
				</Box>
				<Box sx={property}>
					<Box sx={boldTitle}>
						<Text textToTranslate={courseDescription} />
						<Box sx={text}>{courseMetadata.description}</Box>
					</Box>
				</Box>
				<Box sx={property}>
					<Box sx={boldTitle}>
						<Text textToTranslate={skills} />
						<Box sx={[skillsContainer, text]}>
							{uniq(courseMetadata.skillSet).map((skill, index) => {
								return (
									<Box key={skill} sx={text}>
										{index + 1}. {skill}
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
			</Box>
			{isActive(courseMetadata) ? (
				<Button
					component={Link}
					to={courseUrl}
					color="azure"
					variant="contained"
					sx={learningButton}
				>
					<Text textToTranslate={continueLearning} />
				</Button>
			) : (
				<Button
					component={Link}
					to={courseRoadmapUrl}
					color="primary"
					variant="outlined"
					sx={learningButton}
				>
					<Text textToTranslate={startLearning} />
				</Button>
			)}
		</Box>
	);
}
