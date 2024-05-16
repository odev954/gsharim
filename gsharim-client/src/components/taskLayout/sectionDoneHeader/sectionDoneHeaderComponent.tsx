import React from "react";
import { Box, Typography, Fade } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Text from "components/text";
import { container, textContainer, text, Vi } from "./styles";
import { successText } from "./strings";
import { fadeInDuration } from "./consts";

type SectionDoneHeaderComponentProps = {
	sectionDone: boolean;
};
export default function SectionDoneHeaderComponent({
	sectionDone,
}: SectionDoneHeaderComponentProps): JSX.Element {
	return (
		<Fade in={sectionDone} timeout={fadeInDuration}>
			<Box sx={container}>
				<Box sx={textContainer}>
					<DoneIcon sx={Vi} />
					<Typography sx={text}>
						<Text textToTranslate={successText} />
					</Typography>
				</Box>
			</Box>
		</Fade>
	);
}
