import { Modal } from "@mui/material";
import { errorContainer, modal } from "./styles";
import ErrorComponent from "../errorComponent";
import { errorText, close } from "./strings";

interface ErrorPopupProps {
	open: boolean;
	errorMessage?: string;
	buttonText?: string;
	handleClose: VoidFunction;
}

export default function ErrorPopup({
	open,
	errorMessage = errorText,
	buttonText = close,
	handleClose,
}: ErrorPopupProps): JSX.Element {
	return (
		<Modal sx={modal} open={open}>
			<ErrorComponent
				paperSx={errorContainer}
				errorMessage={errorMessage}
				buttonText={buttonText}
				retry={handleClose}
			/>
		</Modal>
	);
}
