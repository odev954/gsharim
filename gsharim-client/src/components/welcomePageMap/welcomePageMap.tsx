import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useRef, useState, useEffect, useCallback } from "react";
import { useIntersectionObserver, useElementSize } from "usehooks-ts";
import { mapImage } from "assets/welcomePageMap";
import { uniqBy } from "lodash-es";
import useAuthorities from "hooks/authorities/useAuthorities";
import Text from "components/text";
import { useTranslation } from "react-i18next";
import * as strings from "./strings";
import { distanceFromStart } from "./consts";
import * as styles from "./styles";
import TextBlock from "./textBlock";
import { MapLandmark } from "./landmark/mapLandmark";

export function WelcomePageMap(): JSX.Element {
	const theme = useTheme();
	const { t: translate } = useTranslation();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const authorities = useAuthorities();
	const mapContainerRef = useRef(null);
	const [setMapRef, mapSize] = useElementSize();
	const [isDisplayedOnce, setIsDisplayedOnce] = useState(false);
	const [shouldRenderLandmarks, setShouldRenderLandmarks] = useState(false);
	const mapObserver = useIntersectionObserver(mapContainerRef, {
		rootMargin: distanceFromStart,
	});

	const isOnScreen = !!mapObserver?.isIntersecting;
	useEffect(() => {
		if (isOnScreen) {
			setIsDisplayedOnce(true);
		}
	}, [isOnScreen]);

	const changeShouldRenderLandmarks = useCallback(() => {
		setShouldRenderLandmarks(true);
	}, []);

	return (
		<Box ref={mapContainerRef} sx={isMobile ? styles.mobileMapContainer : null}>
			<Box sx={isMobile ? styles.mobileTitle : styles.title}>
				<Text textToTranslate={strings.title} />
			</Box>

			<Box sx={styles.contentWrapper}>
				<Box sx={isMobile ? styles.mobileTextWrapper : styles.mapTitleWrapper}>
					<TextBlock firstLine={strings.line1} secondLine={strings.line2} />
					<Box sx={isMobile ? styles.mobileLineWrapper : styles.lineWrapper}>
						<TextBlock firstLine={strings.line3} secondLine={strings.line4} />
					</Box>
				</Box>
				<Box sx={styles.mapContainer}>
					<Box
						ref={setMapRef}
						component="img"
						onLoad={changeShouldRenderLandmarks}
						alt={translate(strings.mapAlt)}
						src={mapImage}
						sx={styles.image}
					/>
					{shouldRenderLandmarks &&
						uniqBy(authorities, "name").map((authority) => {
							const { top, right, name } = authority;
							return (
								<MapLandmark
									key={authority.name}
									mapSize={mapSize}
									landmark={{ top, right, name }}
									show={isOnScreen || isDisplayedOnce}
								/>
							);
						})}
				</Box>
			</Box>
		</Box>
	);
}
