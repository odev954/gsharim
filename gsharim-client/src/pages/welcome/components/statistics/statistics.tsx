import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Text from "components/text";
import * as styles from "./styles";
import * as strings from "./strings";
import StatisticBlock from "./statisticBlock";
import { values } from "./consts";

export default function Statistics(): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box sx={isMobile ? styles.mobileContainer : styles.container}>
			<Typography sx={styles.title}>
				<Text textToTranslate={strings.title} />
			</Typography>
			<Box sx={styles.dataRowContainer}>
				<Box sx={isMobile ? styles.mobileDataRow : styles.dataRow}>
					<StatisticBlock
						name={strings.authorities}
						value={values.authorities}
					/>
					<StatisticBlock name={strings.cities} value={values.cities} />
					<StatisticBlock name={strings.schools} value={values.schools} />
				</Box>
				<Box sx={isMobile ? styles.mobileDataRow : styles.dataRow}>
					<StatisticBlock name={strings.teachers} value={values.teachers} />
					<StatisticBlock name={strings.students} value={values.students} />
					<StatisticBlock name={strings.groups} value={values.groups} />
				</Box>
			</Box>
		</Box>
	);
}
