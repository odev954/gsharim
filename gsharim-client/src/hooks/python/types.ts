export type CustomePythonApi = {
	[key: string]: Function;
};

export type SetLineNumberMessage = {
	endpoint: "SetLineNumber";
	args: number | null;
};

export type FunctionCallMessage = {
	endpoint: string;
	args: unknown[];
};

export type IsRunningMessage = {
	isRunning: boolean;
};

export type IsReadyMessage = {
	isReady: boolean;
};

export type OutputMessage = {
	output: string;
	isError: boolean;
};

export type PythonMessage =
	| SetLineNumberMessage
	| FunctionCallMessage
	| IsRunningMessage
	| IsReadyMessage
	| OutputMessage;

export type FunctionCallResponseMessage = {
	response: unknown;
};

export type PythonWorkerApiDescription = {
	[key: string]: {
		endpoint: string;
	};
};

export type PythonWorkerSetupMessage = {
	api: PythonWorkerApiDescription;
	autoAwait: boolean;
	verboseDelay: number | undefined;
};

export type PythonWorkerRunCodeMessage = {
	codeToRun: string;
	pythonPrefix?: string;
	pythonSuffix?: string;
};

export type PythonWorkerMessage =
	| PythonWorkerSetupMessage
	| PythonWorkerRunCodeMessage;
