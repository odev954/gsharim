import { Box } from "@mui/material";
import Text from "components/text";
import * as styles from "./styles";

type NoItemsDisplayProps = {
	text: string;
};
export default function NoItemsDisplay({
	text,
}: NoItemsDisplayProps): JSX.Element {
	return (
		<Box sx={styles.noItemsDisplayed}>
			<Box sx={styles.textWrapper}>
				<Text textToTranslate={text} />
			</Box>
		</Box>
	);
}
