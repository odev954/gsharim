import Header from "components/header";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import CourseBody from "./courseBody";
import { coursePageDefaultTitle } from "./strings";

function Course(): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<>
			<Seo defaultTitle={translate(coursePageDefaultTitle)} />
			<Header fixed backgroundType="solid" />
			<CourseBody />
		</>
	);
}

export default Course;
