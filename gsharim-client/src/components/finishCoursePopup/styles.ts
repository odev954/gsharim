import { SxProps } from "@mui/material";
import { Styles } from "react-modal";
import { CSSProperties } from "react";

export const modal: Styles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "20px",
		width: "420px",
		display: "flex",
		flexDirection: "column",
	},
};

export const animation: CSSProperties = {
	alignSelf: "center",
	height: "150px",
};

export const exitButton: SxProps = {
	alignSelf: "end",
	height: "15px",
	minHeight: "15px",
	width: "17px",
	minWidth: "17px",
	padding: "0",
};

export const bodyContainer: SxProps = {
	fontFamily: "Rubik",
	alignSelf: "center",
	textAlign: "center",
	whiteSpace: "pre-wrap",
	color: "text.primary",
};

export const title: SxProps = {
	fontWeight: 600,
	fontSize: "28px",
	marginBottom: "17px",
	lineHeight: "33px",
};

export const text: SxProps = {
	fontSize: "18px",
	marginBottom: "27px",
	lineHeight: "24px",
};
