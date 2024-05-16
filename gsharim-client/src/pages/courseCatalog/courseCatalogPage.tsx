import { Box } from "@mui/material";
import Footer from "components/footer";
import Seo from "components/helmetSeo";
import CourseCatalog from "components/courseCatalog";
import Header from "components/header";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import * as strings from "./strings";

export function CourseCatalogPage(): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<Box sx={styles.container}>
			<Seo title={translate(strings.pageDefaultTitle)} />
			<Header fixed={false} backgroundType="wave" />
			<CourseCatalog />
			<Footer />
		</Box>
	);
}
