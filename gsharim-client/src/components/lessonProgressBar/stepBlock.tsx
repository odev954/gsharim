import { Box, StepIconProps, useTheme } from "@mui/material";
import { TaskType } from "@eco8200/data-models";
import { Vi } from "assets/lessonStepper";
import * as styles from "./styles";
import { taskTypeToIconSrc } from "./consts";
import { activeContainer, notActiveContainer, stepContainer } from "./styles";

interface StepBlockProps extends StepIconProps {
	icon: TaskType;
}

export function StepBlock({
	active,
	completed,
	icon,
}: StepBlockProps): JSX.Element {
	const theme = useTheme();
	const IconComponent = completed ? Vi : taskTypeToIconSrc[icon];
	const activeContainerStyle = active ? activeContainer : notActiveContainer;
	const iconColor =
		active || completed
			? theme.palette.secondary.main
			: theme.palette.monochromatic.main;

	return (
		<Box sx={[stepContainer, activeContainerStyle]}>
			<Box sx={styles.step}>
				<IconComponent color={iconColor} fill={theme.palette.white.main} />
			</Box>
		</Box>
	);
}
