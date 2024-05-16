import { useContext, useMemo } from "react";
import { Box, Theme, useMediaQuery, useTheme } from "@mui/material";
import LoginForm from "components/loginForm";
import Header from "components/header";
import { AuthContext } from "contexts/auth";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { ScrollDirection } from "components/header/types";
import { useTranslation } from "react-i18next";
import Text from "components/text";
import {
	computer,
	mobilePageTopBackground,
	mobilePageTopBackgroundMirrored,
	pageTopBackground,
	pageTopBackgroundMirrored,
} from "assets/welcomePageImages";
import { SxProps, SystemStyleObject } from "@mui/system";
import { mirrorX } from "styles/styles";
import * as styles from "./styles";
import {
	computerImageAltText,
	readyLearningText,
	welcomeText,
} from "./strings";
import { windowScrollAnimationHeight } from "./consts";

export default function WelcomePageTop(): JSX.Element {
	const theme = useTheme();
	const { t: translate, i18n } = useTranslation();
	const isRtl = i18n.dir(i18n.language) === "rtl";
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const { isAuthenticated, user } = useContext(AuthContext);
	const headerAnimationPoint = window.innerHeight * windowScrollAnimationHeight;

	const headerScrollTrigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: headerAnimationPoint,
		target: window,
	});

	const scrollDirection: ScrollDirection = useMemo(() => {
		return headerScrollTrigger ? "Down" : "Up";
	}, [headerScrollTrigger]);

	const topWrapperStyles: SystemStyleObject = useMemo(() => {
		return {
			...styles.pageTopWrapper,
			backgroundImage: `url(${
				isRtl ? pageTopBackground : pageTopBackgroundMirrored
			})`,
		};
	}, [isRtl]);

	const mobileTopWrapperStyles: SystemStyleObject = useMemo(() => {
		return {
			...styles.mobilePageTopWrapper,
			backgroundImage: `url(${
				isRtl ? mobilePageTopBackground : mobilePageTopBackgroundMirrored
			})`,
		};
	}, [isRtl]);

	const computerImageStyles: SxProps<Theme> = useMemo(() => {
		return [
			isMobile ? styles.mobileComputerImage : styles.computerImage,
			!isRtl && !isMobile && mirrorX,
		];
	}, [isRtl, isMobile]);

	return (
		<Box sx={isMobile ? mobileTopWrapperStyles : topWrapperStyles}>
			<Header
				scrollDirection={scrollDirection}
				fixed
				backgroundType="transparent"
			/>
			<Box
				sx={
					isMobile
						? styles.mobileEntranceTextContainer
						: styles.entranceTextContainer
				}
			>
				{isAuthenticated ? (
					<Box sx={isMobile ? styles.mobileEntranceText : styles.entranceText}>
						<Box>{`${translate(welcomeText)} ${user?.details.name}`}</Box>
						<Box>
							<Text textToTranslate={readyLearningText} />
						</Box>
					</Box>
				) : (
					<LoginForm />
				)}
				<Box
					component="img"
					alt={translate(computerImageAltText)}
					src={computer}
					sx={computerImageStyles}
				/>
			</Box>
		</Box>
	);
}
