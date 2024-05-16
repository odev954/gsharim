import { Box, Button, Typography } from "@mui/material";
import { TaskState } from "@eco8200/data-models";
import { CourseNavigationSuccess } from "hooks/navigation/useNavigateInCourse";
import FinishCoursePopup from "components/finishCoursePopup";
import { useCallback, useState } from "react";
import Text from "components/text";
import { ReactComponent as Arrow } from "assets/lesson/rightArrow.svg";
import { useLogger } from "hooks/logger";
import { useTranslation } from "react-i18next";
import useTask from "hooks/tasks/useTask";
import * as styles from "./styles";
import {
	getButtonText,
	getNextButtonColor,
	getPreviousButtonColor,
} from "./utils";

interface TaskFooterProps {
	courseNavigation: CourseNavigationSuccess;
}

function TaskFooter({ courseNavigation }: TaskFooterProps): JSX.Element {
	const { data: task } = useTask();
	const logger = useLogger();
	const [isFinishCourseModalOpen, setIsFinishCourseModalOpen] = useState(false);
	const { i18n } = useTranslation();
	const isRtl = i18n.dir(i18n.language) === "rtl";
	const {
		goNext,
		goPrevious,
		finishCourse,
		goBackFromCourse,
		previousType,
		nextType,
	} = courseNavigation;

	const nextButtonText = getButtonText(nextType, false);
	const previousButtonText = getButtonText(previousType, true);

	const openModal = useCallback(() => setIsFinishCourseModalOpen(true), []);
	const closeModal = useCallback(() => setIsFinishCourseModalOpen(false), []);

	const goNextWrapped = (): void => {
		logger.info(
			"lesson-button-clicked",
			`${nextButtonText} button was clicked`
		);

		goNext();
	};

	const goPreviousWrapped = (): void => {
		logger.info(
			"lesson-button-clicked",
			`${previousButtonText} button was clicked`
		);

		goPrevious();
	};

	const previousButtonColor = getPreviousButtonColor(previousType);
	const previousButtonVariant = previousType ? "outlined" : "text";
	const previousButtonOnClick = previousType
		? goPreviousWrapped
		: goBackFromCourse;

	const nextButtonColor = getNextButtonColor(nextType);
	const nextButtonVariant = nextType ? "contained" : "shiny";
	const nextButtonOnClick = nextType ? goNextWrapped : openModal;
	const isTaskDone = task?.metadata.status.state === TaskState.Completed;

	return (
		<Box sx={styles.footerContainer}>
			<Button
				onClick={previousButtonOnClick}
				color={previousButtonColor}
				variant={previousButtonVariant}
				startIcon={
					previousType && (
						<Arrow
							style={
								isRtl
									? styles.rtlPreviousArrowContainer
									: styles.ltrPreviousArrowContainer
							}
						/>
					)
				}
			>
				<Typography>
					<Text textToTranslate={previousButtonText} />
				</Typography>
			</Button>
			<Button
				onClick={nextButtonOnClick}
				color={nextButtonColor}
				variant={nextButtonVariant}
				endIcon={
					nextType && (
						<Arrow
							style={
								isRtl
									? styles.rtlNextArrowContainer
									: styles.ltrNextArrowContainer
							}
						/>
					)
				}
				disabled={!isTaskDone}
			>
				<Typography>
					<Text textToTranslate={nextButtonText} />
				</Typography>
			</Button>
			<FinishCoursePopup
				isModalOpen={isFinishCourseModalOpen}
				closeModal={closeModal}
				finishCourse={finishCourse}
			/>
		</Box>
	);
}

export default TaskFooter;
