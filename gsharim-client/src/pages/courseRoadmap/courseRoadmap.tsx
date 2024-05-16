import Header from "components/header";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import CourseRoadmapBody from "./courseRoadmapBody";
import { roadmapPageDefaultTitle } from "./strings";

export default function CourseRoadmap(): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<>
			<Seo defaultTitle={translate(roadmapPageDefaultTitle)} />
			<Header fixed backgroundType="solid" />
			<CourseRoadmapBody />
		</>
	);
}
