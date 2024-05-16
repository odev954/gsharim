import { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { debounce } from "lodash-es";
import { container } from "./styles";
import { OutputLine } from "../../types";
import { getLineStyle } from "./utils";

type OutputDisplayProps = {
	outputText: OutputLine[];
	smooth?: boolean;
	isAcceptingInput: boolean;
};
export default function OutputDisplay({
	outputText,
	smooth = false,
	isAcceptingInput,
}: OutputDisplayProps): JSX.Element {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);
	const [text, setText] = useState<OutputLine[]>([]);
	const behavior = smooth ? "smooth" : "auto";
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateText = useCallback(
		debounce((newText: OutputLine[]) => {
			setText(newText);
		}),
		[]
	);
	useEffect(() => {
		updateText(outputText);
	}, [outputText, updateText]);

	useEffect(() => {
		ref?.scrollIntoView({ behavior });
	}, [ref, behavior, text, isAcceptingInput]);
	return (
		<Box sx={container}>
			{text.map((line) => {
				const sx = getLineStyle(line.lineType);
				return (
					<Typography sx={sx} key={line.id}>
						{line.text}
					</Typography>
				);
			})}
			<Box ref={setRef} />
		</Box>
	);
}
