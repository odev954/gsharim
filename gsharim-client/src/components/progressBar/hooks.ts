import { SystemStyleObject } from "@mui/system";

export const useProgressBarCalculatedStyles = (
	percent: number
): SystemStyleObject => {
	return {
		width: `${percent}%`,
		backgroundColor: "azure.main",
	};
};
