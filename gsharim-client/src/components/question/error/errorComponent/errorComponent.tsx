import { Box, Button, Paper, SxProps, Typography } from "@mui/material";
import spaceShip from "assets/question/ErrorSpaceShip.svg";
import Text from "components/text";
import { errorText, retry as retryText } from "./strings";
import { errorContainer } from "../styles";
import { spaceShipAlignment, text } from "./styles";

interface ErrorComponentProps {
	paperSx?: SxProps;
	errorMessage?: string;
	buttonText?: string;
	retry: VoidFunction;
}

export default function ErrorComponent({
	paperSx,
	errorMessage = errorText,
	buttonText = retryText,
	retry,
}: ErrorComponentProps): JSX.Element {
	return (
		<Paper
			sx={[
				...errorContainer,
				...(Array.isArray(paperSx) ? paperSx : [paperSx]),
			]}
		>
			<Box sx={spaceShipAlignment} component="img" src={spaceShip} />
			<Typography sx={text}>
				<Text textToTranslate={errorMessage} />
			</Typography>
			<Button color="secondary" variant="contained" onClick={retry}>
				<Text textToTranslate={buttonText} />
			</Button>
		</Paper>
	);
}
