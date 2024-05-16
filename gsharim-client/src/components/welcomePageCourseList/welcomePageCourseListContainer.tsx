import ErrorIcon from "@mui/icons-material/Error";
import { useCourseMetadataList } from "hooks/course/useCourseMetadataList";
import Loader from "components/loading";
import WelcomePageCourseListComponent from "./welcomePageCourseListComponent";

export function WelcomePageCourseListContainer(): JSX.Element {
	const { data: coursesList, isError, isLoading } = useCourseMetadataList();

	if (isLoading) {
		return <Loader />;
	}
	if (isError) {
		return <ErrorIcon />;
	}
	return <WelcomePageCourseListComponent courses={coursesList} />;
}
