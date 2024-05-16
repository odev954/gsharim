import { SystemStyleObject } from "@mui/system";

export const envStatusTextStyle: SystemStyleObject = {
	fontSize: "12px",
	textAlign: "left",
	position: "relative",
	bottom: "8px",
};

export const envStatusTextStyleUp: SystemStyleObject = {
	animation: "envStatusTextStyleUp linear 0.3s",
	color: "text.white",
	"@keyframes envStatusTextStyleUp": {
		"0%": {
			opacity: 0,
		},
	},
};

export const envStatusTextStyleDown: SystemStyleObject = {
	animation: "envStatusTextStyleDown linear 0.3s",
	color: "secondary.dark",
	"@keyframes envStatusTextStyleDown": {
		"0%": {
			opacity: 0,
		},
	},
};

export const envTooltipContainerStyle: SystemStyleObject = {
	maxWidth: "240px",
	boxShadow: "0px 0px 3px rgba(35, 93, 85, 0.2)",
	color: "secondary.main",
	backgroundColor: "background.paper",
	padding: "8px 16px",
	borderRadius: "4px",
};

export const envTooltipTextStyle: SystemStyleObject = {
	color: "secondary.dark",
	lineHeight: "18px",
	fontSize: "14px",
};

export const tooltipBackground: SystemStyleObject = {
	background: "transparent",
};
