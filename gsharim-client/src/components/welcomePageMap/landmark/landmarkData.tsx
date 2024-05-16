import { Box } from "@mui/material";
import Text from "components/text";
import { landmarkData } from "./styles";

interface LandmarkDataProps {
	text: string;
}

export function LandmarkData({ text }: LandmarkDataProps): JSX.Element {
	return (
		<Box sx={landmarkData}>
			<Text textToTranslate={text} />
		</Box>
	);
}
