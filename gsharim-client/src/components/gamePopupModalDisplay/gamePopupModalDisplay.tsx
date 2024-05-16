import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as styles from "./styles";
import { Message } from "./popupComponents";

type GamePopupModalDisplayProps = {
	onSubmit: VoidFunction;
	submitButtonText: string;
	children: JSX.Element;
	popupAsset: string;
};

export default function GamePopupModalDisplay({
	onSubmit,
	submitButtonText,
	children,
	popupAsset,
}: GamePopupModalDisplayProps): JSX.Element {
	const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
	useEffect(() => {
		if (containerRef) {
			containerRef.setAttribute("tabindex", "0"); // this is important to allow focus and to block unity from capturing events
			containerRef.focus();
		}
	}, [containerRef]);

	return (
		<Box sx={styles.container} ref={setContainerRef}>
			<Box sx={styles.popup}>
				<Box component="img" src={popupAsset} />
				<Message submitButtonText={submitButtonText} onSubmit={onSubmit}>
					{children}
				</Message>
			</Box>
		</Box>
	);
}
