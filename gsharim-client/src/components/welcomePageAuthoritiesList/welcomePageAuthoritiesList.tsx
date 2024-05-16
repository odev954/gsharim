import { Box, useMediaQuery, useTheme } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import { uniqBy } from "lodash-es";
import useAuthorities from "hooks/authorities/useAuthorities";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import { Authority } from "./authority";
import { title } from "./strings";
import "react-alice-carousel/lib/alice-carousel.css";
import * as styles from "./styles";
import {
	animationDuration,
	autoPlayInterval,
	carouselResponsiveSettings,
} from "./consts";

export function WelcomePageAuthoritiesList(): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const authorities = useAuthorities();
	const { i18n } = useTranslation();
	const dir = i18n.dir(i18n.language);

	return (
		<Box sx={styles.welcomePageAuthoritiesListContainer}>
			<Box
				sx={isMobile ? styles.mobileContentContainer : styles.contentContainer}
			>
				<Box sx={styles.text}>
					<Text textToTranslate={title} />
				</Box>
				<Box sx={styles.galleryWrapper}>
					<AliceCarousel
						autoPlay
						autoWidth
						autoPlayDirection={dir}
						autoPlayInterval={autoPlayInterval}
						animationDuration={animationDuration}
						animationType="slide"
						mouseTracking
						infinite
						touchTracking
						disableDotsControls
						disableButtonsControls
						responsive={carouselResponsiveSettings}
						items={uniqBy(authorities, "name").map((authority) => {
							return (
								<Authority
									authorityImage={authority.logoSrc}
									key={authority.name}
								/>
							);
						})}
					/>
				</Box>
			</Box>
		</Box>
	);
}
