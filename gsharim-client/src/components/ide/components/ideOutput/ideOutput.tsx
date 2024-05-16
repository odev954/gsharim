import { Box } from "@mui/material";
import { OutputLine } from "../../types";
import * as styles from "./styles";
import OutputDisplay from "../outputDisplay";
import { InputComponent } from "../inputComponent";

type OutputSectionProps = {
	text: OutputLine[];
	isAcceptingInput: boolean;
	onInputSubmit: (value: string) => void;
};

export default function IdeOutput({
	text,
	isAcceptingInput,
	onInputSubmit,
}: OutputSectionProps): JSX.Element {
	return (
		<Box sx={styles.background}>
			<Box sx={styles.container}>
				<OutputDisplay
					outputText={text}
					smooth
					isAcceptingInput={isAcceptingInput}
				/>
				<InputComponent
					onInputSubmit={onInputSubmit}
					isAcceptingInput={isAcceptingInput}
				/>
			</Box>
		</Box>
	);
}
