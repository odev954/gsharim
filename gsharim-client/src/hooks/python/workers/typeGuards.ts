import { PythonWorkerRunCodeMessage, PythonWorkerSetupMessage } from "../types";

export function isRunCodeMessage(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	message: any
): message is PythonWorkerRunCodeMessage {
	return message !== undefined && typeof message.codeToRun === "string";
}

export function isSetupMessage(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	message: any
): message is PythonWorkerSetupMessage {
	return (
		message !== undefined &&
		message.api !== undefined &&
		typeof message.autoAwait === "boolean"
	);
}
