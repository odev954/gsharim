import { Box, Typography } from "@mui/material";
import instructionsPopupAsset from "assets/baskets/instructionsPopupAsset.svg";
import LeftArrowAsset from "assets/baskets/leftArrow.svg";
import RightArrowAsset from "assets/baskets/rightArrow.svg";
import GamePopupModalDisplay from "components/gamePopupModalDisplay";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import {
	buttonText,
	firstLineText,
	leftArrowText,
	rightArrowImageAlt,
	rightArrowText,
	secondLineBoldText,
	secondLineText,
	thirdLineText,
	titleText,
} from "./strings";

type WelcomeMessageProps = {
	instructionsOnSubmit: VoidFunction;
};
export default function WelcomeMessage({
	instructionsOnSubmit,
}: WelcomeMessageProps): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<GamePopupModalDisplay
			onSubmit={instructionsOnSubmit}
			popupAsset={instructionsPopupAsset}
			submitButtonText={buttonText}
		>
			<Box sx={styles.container}>
				<Typography sx={styles.title}>
					<Text textToTranslate={titleText} />
				</Typography>
				<Typography sx={styles.firstLine}>
					<Text textToTranslate={firstLineText} />
				</Typography>
				<Box sx={styles.secondLine}>
					<Typography sx={styles.secondLineBold}>
						<Text textToTranslate={secondLineBoldText} />
					</Typography>
					<Typography sx={styles.secondLineNotBold}>
						<Text textToTranslate={secondLineText} />
					</Typography>
				</Box>
				<Typography sx={styles.thirdLine}>
					<Text textToTranslate={thirdLineText} />
				</Typography>
				<Box sx={styles.forthLine}>
					<Typography sx={styles.arrowText}>
						<Text textToTranslate={rightArrowText} />
					</Typography>
					<Box
						sx={styles.RightArrowImage}
						component="img"
						src={RightArrowAsset}
						alt={translate(rightArrowImageAlt)}
					/>
					<Box
						sx={styles.LeftArrowImage}
						component="img"
						src={LeftArrowAsset}
						alt={LeftArrowAsset}
					/>
					<Typography sx={styles.arrowText}>
						<Text textToTranslate={leftArrowText} />
					</Typography>
				</Box>
			</Box>
		</GamePopupModalDisplay>
	);
}
