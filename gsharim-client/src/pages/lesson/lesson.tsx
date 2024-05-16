import Header from "components/header";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import LessonBody from "./lessonBody";
import { lessonPageDefaultTitle } from "./strings";

function Lesson(): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<>
			<Seo defaultTitle={translate(lessonPageDefaultTitle)} />
			<Header fixed backgroundType="solid" />
			<LessonBody />
		</>
	);
}

export default Lesson;
