import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
	studentImage,
	kidImage,
	spaceshipImage,
	rect,
} from "assets/welcomePageImages";
import Paragraph from "components/paragraph";
import { useTranslation } from "react-i18next";
import { mirrorX } from "styles/styles";
import * as strings from "./strings";
import * as styles from "./styles";

export function WelcomePageParagraphs(): JSX.Element {
	const theme = useTheme();
	const { t: translate, i18n } = useTranslation();
	const isLtr = i18n.dir(i18n.language) === "ltr";
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box>
			<Box
				component="img"
				src={rect}
				alt={translate(strings.rectImageAlt)}
				sx={[
					isMobile ? styles.mobileRectImage : styles.rectImage,
					isLtr ? mirrorX : null,
				]}
			/>
			<Box sx={styles.paragraphWrapper}>
				<Box sx={styles.paragraphsContainer}>
					<Paragraph
						text={strings.firstText}
						title={strings.firstTitle}
						image={{
							src: kidImage,
							imageAlt: strings.firstImageAlt,
							imageSx: isMobile ? styles.mobileImage : styles.firstImage,
						}}
						isTextBeforeImage
					/>
					<Paragraph
						text={strings.secondText}
						title={strings.secondTitle}
						image={{
							src: studentImage,
							imageAlt: strings.secondImageAlt,
							imageSx: isMobile ? styles.mobileImage : styles.secondImage,
						}}
						isTextBeforeImage={isMobile}
					/>
					<Paragraph
						text={strings.thirdText}
						title={strings.thirdTitle}
						image={{
							src: spaceshipImage,
							imageAlt: strings.thirdImageAlt,
							imageSx: isMobile ? styles.mobileImage : styles.thirdImage,
						}}
						isTextBeforeImage
					/>
				</Box>
			</Box>
		</Box>
	);
}
