import { Box } from "@mui/material";
import Iframe from "react-iframe";
import { GeniallySectionData } from "@eco8200/data-models";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { useEffect } from "react";
import * as styles from "./styles";

interface GenialSectionComponentProps {
	data: GeniallySectionData;
}
export function GenialSectionComponent({
	data,
}: GenialSectionComponentProps): JSX.Element {
	const { approveSection } = useSetSectionBlocking(data.id);
	useEffect(() => {
		approveSection();
	}, [approveSection]);
	return (
		<Box sx={styles.generalStyles.container}>
			<Iframe
				frameBorder={styles.iframeStyles.frameBorder}
				width={styles.iframeStyles.width}
				height={styles.iframeStyles.height}
				styles={styles.iframeStyles.genialIframeStyle}
				url={`${import.meta.env.VITE_GENIAL_URL}${data.geniallyId}`}
				allowFullScreen={styles.iframeStyles.allowfullscreen}
				scrolling={
					styles.iframeStyles.scrolling as "auto" | "yes" | "no" | undefined
				}
				allow="networking, scriptaccess"
			/>
		</Box>
	);
}
