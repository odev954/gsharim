import Header from "components/header";
import { Box } from "@mui/material";
import Seo from "components/helmetSeo";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { taskPageDefaultTitle } from "./strings";
import TaskBody from "./taskBody";

function Task(): JSX.Element {
	const { t: translate } = useTranslation();

	return (
		<Box sx={styles.taskContainer}>
			<Header fixed={false} backgroundType="solid" />
			<Seo
				defaultTitle={translate(taskPageDefaultTitle)}
				key={translate(taskPageDefaultTitle)}
			/>
			<TaskBody />
		</Box>
	);
}

export default Task;
