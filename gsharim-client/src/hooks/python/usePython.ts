import { useState, useEffect, useCallback } from "react";
import {
	CustomePythonApi,
	PythonMessage,
	PythonWorkerApiDescription,
	PythonWorkerSetupMessage,
} from "./types";
import PythonWorker from "./workers/pythonRunner.worker?worker";

import {
	isSetLineNumberMessage,
	isFunctionCallMessage,
	isIsRunningMessage,
	isIsReadyMessage,
	isOutputMessage,
} from "./typeUtils";

type pythonOutputItem = [output: string, isError: boolean];
type onPythonMessageType = (...message: pythonOutputItem) => void;
type runPythonType = (
	code: string,
	pythonPrefix?: string,
	pythonSuffix?: string
) => void;
type restartPythonInterpreterType = () => void;
type hookReturnType = {
	runPython: runPythonType;
	restartPythonInterpreter: restartPythonInterpreterType;
	isRunning: boolean;
	isReady: boolean;
	currentLine: number | null;
	pythonPrefix?: string;
	pythonSuffix?: string;
};

type usePythonProps = {
	handlePythonOutput: onPythonMessageType;
	api: CustomePythonApi;
	autoAwait: boolean;
	verboseDelay?: number;
};

export default function usePython({
	handlePythonOutput,
	api,
	autoAwait,
	verboseDelay,
}: usePythonProps): hookReturnType {
	const [pythonWorker, setPythonWorker] = useState<Worker>();
	const [isRunning, setIsRunning] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const [currentLine, setCurrentLine] = useState<number | null>(null);

	const onPythonWorkerMessage = useCallback(
		async (messgae: MessageEvent<PythonMessage>) => {
			const result = messgae.data;

			if (isSetLineNumberMessage(result)) {
				setCurrentLine(result.args);
				messgae.ports[0].postMessage({ response: "" });
			}
			if (isFunctionCallMessage(result)) {
				const response = await api[result.endpoint](...result.args);
				messgae.ports[0].postMessage({ response });
			}

			if (isIsRunningMessage(result)) {
				setIsRunning(result.isRunning);
				if (!result.isRunning) {
					setCurrentLine(null);
				}
			}

			if (isIsReadyMessage(result)) {
				setIsReady(result.isReady);
			}

			if (isOutputMessage(result)) {
				handlePythonOutput(result.output, result.isError);
			}
		},
		[handlePythonOutput, api]
	);

	const runPython = useCallback(
		(code: string, pythonPrefix?: string, pythonSuffix?: string) => {
			setCurrentLine(null);
			setIsRunning(true);
			pythonWorker?.postMessage({
				codeToRun: code,
				pythonPrefix,
				pythonSuffix,
			});
		},
		[pythonWorker]
	);

	useEffect(() => {
		if (pythonWorker) {
			pythonWorker.addEventListener("message", onPythonWorkerMessage);
		}
		return () => {
			if (pythonWorker) {
				pythonWorker.removeEventListener("message", onPythonWorkerMessage);
			}
		};
	}, [onPythonWorkerMessage, pythonWorker]);

	const createPythonWebWorker = useCallback(() => {
		const worker = new PythonWorker();
		const apiDescription: PythonWorkerApiDescription = Object();
		Object.keys(api).forEach((key) => {
			apiDescription[key] = { endpoint: key };
		});
		const setupMessage: PythonWorkerSetupMessage = {
			api: apiDescription,
			autoAwait,
			verboseDelay,
		};
		worker.postMessage(setupMessage);
		return worker;
	}, [api, autoAwait, verboseDelay]);
	const destroyPythonWorker = useCallback(
		(newWorker?: Worker) => {
			setPythonWorker((current) => {
				current?.removeEventListener("message", onPythonWorkerMessage);
				current?.terminate();
				return newWorker;
			});
			setIsRunning(false);
			setIsReady(false);
			setCurrentLine(null);
		},
		[onPythonWorkerMessage]
	);

	const restartPythonInterpreter = useCallback(() => {
		destroyPythonWorker(createPythonWebWorker());
	}, [destroyPythonWorker, createPythonWebWorker]);

	useEffect(() => {
		restartPythonInterpreter();
		return destroyPythonWorker;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api]);

	return {
		runPython,
		restartPythonInterpreter,
		isRunning,
		isReady,
		currentLine,
	};
}
