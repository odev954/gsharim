import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, TextField, Button } from "@mui/material";
import submitButton from "assets/ide/submitButton.svg";
import { useTranslation } from "react-i18next";
import * as styles from "./styles";
import { submitButtonAlt } from "./strings";

type InputComponentProps = {
	onInputSubmit: (value: string) => void;
	isAcceptingInput: boolean;
};

export default function InputComponent({
	onInputSubmit,
	isAcceptingInput,
}: InputComponentProps): JSX.Element {
	const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
	const { t: translate } = useTranslation();

	const submit = useCallback(() => {
		if (inputRef) {
			onInputSubmit(inputRef.value);
			inputRef.value = "";
		}
	}, [inputRef, onInputSubmit]);

	useEffect(() => {
		inputRef?.select();
	}, [inputRef, isAcceptingInput]);

	const onKeyPress = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Enter") {
				submit();
				event.preventDefault();
			}
		},
		[submit]
	);

	const containerStyle = useMemo(() => {
		return { display: isAcceptingInput ? "flex" : "none", ...styles.container };
	}, [isAcceptingInput]);
	return (
		<Box sx={containerStyle}>
			<Button onClick={submit}>
				<Box
					component="img"
					src={submitButton}
					alt={translate(submitButtonAlt)}
				/>
			</Button>
			<TextField
				sx={styles.input}
				inputRef={setInputRef}
				onKeyPress={onKeyPress}
			/>
		</Box>
	);
}
