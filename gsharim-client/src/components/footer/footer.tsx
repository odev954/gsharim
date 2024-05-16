import { MouseEventHandler, useCallback, useMemo } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import partnersIcons from "assets/footer";
import { uniqBy } from "lodash-es";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import { coursesCatalogUrl } from "utils/course";
import { LinkInformation } from "./components/linkList/types";
import * as styles from "./styles";
import {
	rightsReserved,
	phoneNumber,
	emailAddress,
	contact,
	info,
	commonQuestions,
	courseCatalog,
} from "./strings";
import LinkList from "./components/linkList";
import {
	CommonQuestionsLinkHref,
	InfoLinkHref,
	ContactLinkHref,
	mobileIconHeight,
	desktopLandmarkHeight,
} from "./consts";
import { generateWavesBackground } from "./utils";

export default function Footer(): JSX.Element {
	const theme = useTheme();
	const { t: translate } = useTranslation();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const linksInfo = useMemo((): LinkInformation[] => {
		return [
			{
				linkName: courseCatalog,
				linkUrl: coursesCatalogUrl,
			},
			{
				linkName: commonQuestions,
				linkUrl: CommonQuestionsLinkHref,
			},
			{
				linkName: info,
				linkUrl: InfoLinkHref,
			},
			{
				linkName: contact,
				linkUrl: ContactLinkHref,
			},
		];
	}, []);

	const backgroundWaveImage: string = useMemo(
		() =>
			generateWavesBackground(
				theme.palette.background.default,
				theme.palette.white.dark
			),
		[theme]
	);

	const sendEmail = useCallback<MouseEventHandler<HTMLAnchorElement>>(
		(clickEvent) => {
			window.location.href = `mailto:${translate(emailAddress)}`;
			clickEvent.preventDefault();
		},
		[translate]
	);

	const waveStyles = isMobile ? styles.mobileWaveImage : styles.waveImage;

	return (
		<Box sx={styles.container}>
			<Box
				sx={{
					...waveStyles,
					backgroundImage: backgroundWaveImage,
				}}
			/>
			<Box sx={isMobile ? styles.mobileLogosContainer : styles.logosContainer}>
				{uniqBy(partnersIcons, "src").map((icon) => {
					return (
						<Box
							ml="13px"
							height={isMobile ? mobileIconHeight : desktopLandmarkHeight}
							width="auto"
							component="img"
							alt={icon.alt}
							src={icon.src}
							key={icon.src}
						/>
					);
				})}
			</Box>
			<Box sx={isMobile ? styles.mobileBarContainer : styles.barContainer}>
				{!isMobile && (
					<Box sx={styles.rightsReserved}>
						<Text textToTranslate={rightsReserved} />
					</Box>
				)}
				<Box sx={isMobile ? styles.mobileLinkList : styles.linkList}>
					<LinkList LinksInfo={linksInfo} />
				</Box>
				<Box sx={isMobile ? styles.mobileLeftContainer : styles.leftContainer}>
					<Box sx={styles.phoneNumber}>
						<Text textToTranslate={phoneNumber} />
					</Box>
					<Box
						sx={styles.emailAddress}
						onClick={sendEmail}
						component={Link}
						to="/#"
					>
						<Text textToTranslate={emailAddress} />
					</Box>
				</Box>
				{isMobile && (
					<Box sx={styles.mobileRightsReserved}>
						<Text textToTranslate={rightsReserved} />
					</Box>
				)}
			</Box>
		</Box>
	);
}
