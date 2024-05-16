import { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useKeyPress } from "@react-typed-hooks/use-key-press";
import Text from "components/text";
import * as styles from "./styles";
import { SubmitKeyboardKey } from "./consts";

type MessageProps = {
	submitButtonText: string;
	children: JSX.Element;
	onSubmit: () => void;
};

export default function Message({
	submitButtonText,
	children,
	onSubmit,
}: MessageProps): JSX.Element {
	const isEnterPressed = useKeyPress({ targetKey: SubmitKeyboardKey });
	useEffect(() => {
		if (isEnterPressed) {
			onSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEnterPressed]);
	return (
		<Box sx={styles.container}>
			<Box sx={styles.message}>{children}</Box>
			<Button
				sx={styles.button}
				variant="contained"
				color="secondary"
				onClick={onSubmit}
			>
				<Text textToTranslate={submitButtonText} />
			</Button>
		</Box>
	);
}
