import { Box, Button, Typography, useTheme } from "@mui/material";
import Modal from "react-modal";
import Lottie from "lottie-react";
import { ReactComponent as ExitModal } from "assets/modal/XIcon.svg";
import wellDonePopupCertificate from "assets/lottie/wellDonePopupCertificate.json";
import { useMemo } from "react";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import * as strings from "./strings";
import * as styles from "./styles";
import * as consts from "./consts";

type FinishCoursePopupProps = {
	isModalOpen: boolean;
	closeModal: VoidFunction;
	finishCourse: VoidFunction;
};

function FinishCoursePopup({
	isModalOpen,
	closeModal,
	finishCourse,
}: FinishCoursePopupProps): JSX.Element {
	const theme = useTheme();

	const appElement = useMemo(
		() => document.getElementById("root") || undefined,
		[]
	);

	const { t: translate } = useTranslation();
	const modalStyles = useMemo(() => {
		return {
			overlay: { zIndex: theme.zIndex.modal },
			...styles.modal,
		};
	}, [theme]);

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={closeModal}
			contentLabel={translate(strings.modalLabel)}
			style={modalStyles}
			appElement={appElement}
		>
			<Button onClick={closeModal} sx={styles.exitButton}>
				<ExitModal />
			</Button>
			<Lottie
				animationData={wellDonePopupCertificate}
				style={styles.animation}
				initialSegment={[consts.startFrame, consts.lastFrame]}
				loop={false}
			/>
			<Box sx={styles.bodyContainer}>
				<Typography sx={styles.title}>
					<Text textToTranslate={strings.wellDone} />
				</Typography>
				<Typography sx={styles.text}>
					<Text textToTranslate={strings.text} />
				</Typography>
				<Button onClick={finishCourse} color="secondary" variant="contained">
					<Text textToTranslate={strings.backToCourseCatalog} />
				</Button>
			</Box>
		</Modal>
	);
}

export default FinishCoursePopup;
