import { Box, useMediaQuery, useTheme } from "@mui/material";
import CountUp from "react-countup";
import Text from "components/text";
import * as styles from "./styles";
import { numberAnimationTime } from "./utils";

interface StatisticBlockProps {
	name: string;
	value: number;
}

export default function StatisticBlock({
	name,
	value,
}: StatisticBlockProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const animationTime = numberAnimationTime(value);
	return (
		<Box sx={styles.dataBlock}>
			<Box sx={isMobile ? styles.mobileDataValue : styles.dataValue}>
				<CountUp
					enableScrollSpy
					scrollSpyOnce
					separator=","
					end={value}
					duration={animationTime}
				/>
			</Box>
			<Box sx={isMobile ? styles.mobileDataTitle : styles.dataTitle}>
				<Text textToTranslate={name} />
			</Box>
		</Box>
	);
}
