import { LogTypes } from "./logTypes";

export default interface ReportLog {
	message: string;
	user: string;
	variant: LogTypes;
	level: string;
	stacktrace: string;
	timestamp: Date;
}
