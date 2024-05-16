import { Box, Button, Typography } from "@mui/material";
import LessonBanner from "components/lessonBanner";
import { useMemo } from "react";
import Header from "components/header";
import Text from "components/text";
import * as styles from "./styles";
import { WelcomePageProps } from "./types";
import { contentContainerByLayoutType } from "./utils";

function WelcomePage({
	buttonText,
	layoutType,
	mainTitle,
	subTitle,
	subSubtitle,
	bannerDisplayNumber,
	onClick,
	background,
}: WelcomePageProps): JSX.Element {
	const isSecondary = layoutType === "secondaryLayout";
	const isPrimary = layoutType === "primaryLayout";

	const displayWrapperStyles = useMemo(() => {
		return {
			background: `url(${background})`,
			...styles.displayWrapper,
		};
	}, [background]);

	const contentContainerStyles = contentContainerByLayoutType[layoutType];

	return (
		<Box sx={styles.container}>
			<Header fixed backgroundType="solid" />
			<Box sx={displayWrapperStyles}>
				<Box sx={styles.contentWrapper}>
					<Box sx={contentContainerStyles}>
						<Typography sx={styles.mainTitle}>{mainTitle}</Typography>
						<Typography sx={styles.subTitle}>{subTitle}</Typography>
						{isPrimary && (
							<Typography sx={styles.subSubtitle}>{subSubtitle}</Typography>
						)}
						<Button disableRipple sx={styles.startButton} onClick={onClick}>
							<Text textToTranslate={buttonText} />
						</Button>
						{isSecondary && <Box sx={styles.bar} />}
					</Box>
					{isSecondary && <LessonBanner displayNumber={bannerDisplayNumber} />}
				</Box>
			</Box>
		</Box>
	);
}

export default WelcomePage;
