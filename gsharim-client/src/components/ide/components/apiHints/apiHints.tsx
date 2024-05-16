import React, { useState, useCallback, useMemo } from "react";
import { Box, Typography, Zoom } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ApiHintsButtonSvg from "assets/ide/apiHintsButton.svg";
import { ApiHintsMap } from "components/ide/types";
import Text from "components/text";
import * as styles from "./styles";
import { createFunctionDescriptions } from "./utils";
import { ApiHintsHeader } from "./strings";
import { zoomDuration } from "./consts";

type apiHintsProps = {
	api: ApiHintsMap;
};

export default function ApiHints({ api }: apiHintsProps): JSX.Element {
	const [showApiHints, setShowApiHints] = useState(false);
	const [showButton, setShowButton] = useState(true);

	const apiDescriptions = useMemo(() => createFunctionDescriptions(api), [api]);
	const display = useMemo(
		() => (apiDescriptions.length > 0 ? "flex" : "none"),
		[apiDescriptions]
	);

	const toggleApiHints = useCallback(() => {
		setShowApiHints((current) => !current);
	}, [setShowApiHints]);

	const toggleShowButton = useCallback(() => {
		setShowButton((current) => !current);
	}, [setShowButton]);

	return (
		<Box sx={{ ...styles.container, display }}>
			<Zoom
				in={showButton}
				onExited={toggleApiHints}
				unmountOnExit
				timeout={zoomDuration}
			>
				<Box sx={styles.questionMark} onClick={toggleShowButton}>
					<Box component="img" src={ApiHintsButtonSvg} />
				</Box>
			</Zoom>
			<Zoom
				in={showApiHints}
				onExited={toggleShowButton}
				timeout={zoomDuration}
				unmountOnExit
			>
				<Box sx={styles.text}>
					<ClearIcon
						sx={styles.exitButton}
						fontSize="small"
						onClick={toggleApiHints}
					/>
					<Box sx={styles.header}>
						<Text textToTranslate={ApiHintsHeader} />
					</Box>
					{apiDescriptions.map(({ functionName, functionDescription }) => {
						return (
							<Box sx={styles.typography} key={functionName}>
								<Box sx={styles.line}>
									<Typography sx={styles.funcitonName}>
										{functionName}
									</Typography>
									<Typography sx={styles.functionDescription}>
										{functionDescription}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Zoom>
		</Box>
	);
}
