import Header from "components/header";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import ChapterBody from "./chapterBody";
import { chapterPageDefaultTitle } from "./strings";

function Chapter(): JSX.Element {
	const { t: translate } = useTranslation();
	return (
		<>
			<Seo defaultTitle={translate(chapterPageDefaultTitle)} />
			<Header fixed backgroundType="solid" />
			<ChapterBody />
		</>
	);
}

export default Chapter;
