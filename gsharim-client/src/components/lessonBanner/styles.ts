import { Theme } from "@mui/material";
import { SxProps, SystemStyleObject } from "@mui/system";

export const container: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	width: "150px",
	alignSelf: "flex-end",
};

export const bannerContainer: SystemStyleObject = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
};

export const bannerBase: SystemStyleObject = {
	height: "3px",
	borderRadius: "5px",
	width: "100%",
	backgroundColor: "primary.main",
};

export const bannerLine: SystemStyleObject = {
	height: "220px",
	width: "3px",
	backgroundColor: "primary.main",
};

export const bannerBlock: SxProps<Theme> = {
	background: (theme: Theme) => theme.palette.azureGradient.main,
	height: "150px",
	width: "150px",
	fontFamily: "Rubik",
	color: "white.main",
	fontWeight: 500,
	fontSize: "90px",
	textAlign: "center",
	lineHeight: "150px",
	borderRadius: "8px",
};
