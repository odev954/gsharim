import { PyodideInterface } from "pyodide";
import { FunctionCallResponseMessage } from "../types";

type ApiMessage = {
	endpoint: string;
	args: unknown;
};
async function MessageAwaitResponse(apiMessage: ApiMessage): Promise<unknown> {
	const returnValuePromise = new Promise<FunctionCallResponseMessage>((res) => {
		const channel = new MessageChannel();
		channel.port1.onmessage = (message) => {
			channel.port1.close();
			res(message.data);
		};
		postMessage(apiMessage, [channel.port2]);
	});
	return (await returnValuePromise).response;
}

function toJs(pyodideInstance: PyodideInterface, object: unknown): unknown {
	// this implementation is a bit wired, but this conversion is a must, if object contains any proxies, it will be converted, if it doesn't, it will not convert.
	const pyObject = pyodideInstance.toPy(object);
	let returnValue = object;
	if (pyObject.toJs) {
		returnValue = pyodideInstance.toPy(object).toJs();
	}
	return returnValue;
}

export async function jsPythonFunction(
	pyodideInstance: PyodideInterface | undefined,
	functionName: string,
	args: unknown
): Promise<unknown> {
	if (!pyodideInstance) throw new Error("pyodide is not available");
	const apiMessage = {
		endpoint: functionName,
		args: toJs(pyodideInstance, args),
	};
	const returnValue = await MessageAwaitResponse(apiMessage);
	return returnValue;
}

export async function waitDelay(delay: number): Promise<void> {
	await new Promise((res) => {
		setTimeout(res, delay);
	});
}

export function stderr(error: Error): void {
	const { message } = error;
	const errorLines = message.split("\n");
	const errorObject = errorLines[errorLines.length - 2];
	const indexOfFirstWord = errorObject.indexOf(" ");
	const splicedErrorObject = errorObject.substring(indexOfFirstWord + 1);
	postMessage({ output: splicedErrorObject, isError: true });
}
