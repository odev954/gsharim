import { Box, useMediaQuery, useTheme } from "@mui/material";
import Seo from "components/helmetSeo";
import Footer from "components/footer";
import WelcomePageMap from "components/welcomePageMap";
import { WelcomePageAuthoritiesList } from "components/welcomePageAuthoritiesList";
import WelcomePageParagraphs from "components/welcomePageParagraphs";
import { WelcomePageCourseList } from "components/welcomePageCourseList";
import { useTranslation } from "react-i18next";
import WelcomePageTop from "./components/welcomePageTop";
import Statistics from "./components/statistics";
import * as styles from "./styles";
import { pageTitle } from "./strings";

export default function Welcome(): JSX.Element {
	const theme = useTheme();
	const { t: translate } = useTranslation();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box sx={styles.container}>
			<Seo title={translate(pageTitle)} />
			<WelcomePageTop />
			<Box
				sx={
					isMobile
						? styles.mobileCourseListContainer
						: styles.courseListContainer
				}
			>
				<WelcomePageCourseList />
			</Box>
			<Box
				sx={
					isMobile
						? styles.mobileAuthoritiesListContainer
						: styles.authoritiesListContainer
				}
			>
				<WelcomePageAuthoritiesList />
			</Box>
			<WelcomePageParagraphs />
			<Statistics />
			<WelcomePageMap />
			<Footer />
		</Box>
	);
}
