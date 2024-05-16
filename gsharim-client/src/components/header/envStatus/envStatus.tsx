import { Tooltip, Typography } from "@mui/material";
import { useMemo } from "react";
import Text from "components/text";
import {
	generateEnvStatusTextStyle,
	getEnvStatusText,
	getEnvTooltipText,
} from "./utils";
import * as styles from "./styles";
import { ScrollDirection } from "../types";

interface EnvStatusProps {
	scrollDirection: ScrollDirection | undefined;
}

function EnvStatus({ scrollDirection }: EnvStatusProps): JSX.Element {
	const envStatusTextStyle = useMemo(
		() => generateEnvStatusTextStyle(scrollDirection),
		[scrollDirection]
	);

	const envStatusText = getEnvStatusText();
	const envStatusTooltipText = getEnvTooltipText();

	return (
		<Tooltip
			title={
				<Typography sx={styles.envTooltipContainerStyle}>
					<Text textToTranslate={envStatusTooltipText} />
				</Typography>
			}
			placement="bottom"
			slotProps={{
				tooltip: { sx: styles.tooltipBackground },
			}}
		>
			<Typography sx={envStatusTextStyle}>
				<Text textToTranslate={envStatusText} />
			</Typography>
		</Tooltip>
	);
}

export default EnvStatus;
