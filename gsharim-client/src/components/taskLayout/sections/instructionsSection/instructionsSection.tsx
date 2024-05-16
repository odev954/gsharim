import { Typography, Box } from "@mui/material";
import { InstructionsSectionData } from "@eco8200/data-models";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { useEffect, useState } from "react";
import { useTimeout } from "usehooks-ts";
import * as styles from "./styles";

export function InstructionsSection(
	data: InstructionsSectionData
): JSX.Element {
	const { approveSection } = useSetSectionBlocking(data.id);
	const [hasAwaitPeriodEnded, setHasAwaitPeriodEnded] = useState(false);
	const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

	useTimeout(() => {
		setHasAwaitPeriodEnded(true);
	}, data.mandatoryTime);

	useEffect(() => {
		if (data.isScrollComplete) {
			setHasScrolledToBottom(true);
		}
	}, [data.isScrollComplete]);

	useEffect(() => {
		if (hasAwaitPeriodEnded && hasScrolledToBottom) {
			approveSection();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data.id, hasAwaitPeriodEnded, hasScrolledToBottom]);

	return (
		<Box sx={styles.instructionsContent}>
			<Typography sx={styles.missionTitle}>{data.title}</Typography>
			<Typography sx={styles.missionDescription}>{data.description}</Typography>
		</Box>
	);
}
