import { useCallback, useMemo } from "react";
import {
	Box,
	SxProps,
	Theme,
	Toolbar,
	AppBar,
	useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "assets/header/logo.svg";
import { useLogger } from "hooks/logger";
import { useTranslation } from "react-i18next";
import LanguageMenu from "components/languageMenu";
import { UserSettingsMenu } from "../userSettingsMenu";
import * as styles from "./styles";
import {
	generateHeaderBackground,
	headerContainerStyle,
	headerStyle,
	mobileHeaderContainerStyle,
} from "./utils";
import { HeaderProps } from "./types";
import { logoLink } from "./consts";
import { systemName } from "./strings";
import EnvStatus from "./envStatus";

export function Header({
	backgroundType,
	fixed,
	scrollDirection,
}: HeaderProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const logger = useLogger();
	const { t: translate } = useTranslation();

	const backgroundWaveImage: string = useMemo(
		() => generateHeaderBackground(theme.palette.background.paper),
		[theme]
	);

	const headerStyles: SxProps<Theme> = useMemo(
		() => headerStyle(scrollDirection),
		[scrollDirection]
	);

	const headerContainerStyles: SxProps<Theme> = useMemo(
		() =>
			headerContainerStyle(
				backgroundType,
				scrollDirection,
				backgroundWaveImage
			),
		[backgroundType, scrollDirection, backgroundWaveImage]
	);

	const mobileHeaderContainerStyles: SxProps<Theme> = useMemo(
		() =>
			mobileHeaderContainerStyle(
				backgroundType,
				scrollDirection,
				backgroundWaveImage
			),
		[backgroundType, scrollDirection, backgroundWaveImage]
	);

	const log = useCallback(() => {
		logger.info("logo-clicked", "user clicked on the logo");
	}, [logger]);

	return (
		<AppBar
			sx={isMobile ? mobileHeaderContainerStyles : headerContainerStyles}
			position={fixed ? "fixed" : "static"}
		>
			<Toolbar sx={headerStyles}>
				<Box
					sx={
						isMobile
							? styles.mobileLogoAndEnvStatusContainer
							: styles.logoAndEnvStatusContainer
					}
				>
					<Link to={logoLink}>
						<Logo
							title={translate(systemName)}
							style={isMobile ? styles.mobileLogoBox : styles.logoBox}
							fill={theme.palette.text.lightBlue}
							onClick={log}
						/>
					</Link>
					<EnvStatus scrollDirection={scrollDirection} />
				</Box>
				<Box
					sx={isMobile ? styles.mobileLeftSideContent : styles.leftSideContent}
				>
					<LanguageMenu />
					<UserSettingsMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
}
