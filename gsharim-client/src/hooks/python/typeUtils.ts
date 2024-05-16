import { SetLineNumber } from "./workers/consts";
import {
	SetLineNumberMessage,
	FunctionCallMessage,
	IsRunningMessage,
	IsReadyMessage,
	OutputMessage,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSetLineNumberMessage(obj: any): obj is SetLineNumberMessage {
	const correctEndpoint = obj.endpoint === SetLineNumber;
	const correctArgs =
		obj.args !== undefined &&
		(typeof obj.args === "number" || obj.args === null);
	return correctArgs && correctEndpoint;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunctionCallMessage(obj: any): obj is FunctionCallMessage {
	const correctEndpoint = typeof obj.endpoint === "string";
	const correctArgs = typeof obj.args === "object";
	return correctEndpoint && correctArgs;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIsRunningMessage(obj: any): obj is IsRunningMessage {
	return typeof obj.isRunning === "boolean";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isIsReadyMessage(obj: any): obj is IsReadyMessage {
	return typeof obj.isReady === "boolean";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isOutputMessage(obj: any): obj is OutputMessage {
	return typeof obj.output === "string" && typeof obj.isError === "boolean";
}
