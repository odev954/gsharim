export type Endpoint = {
	endpoint: Function;
};
export type ApiHint = {
	docString: string;
	signature?: string;
};
export type DocumentedEndpoint = Endpoint & ApiHint;

export type FunctionDescription = Endpoint | ApiHint | DocumentedEndpoint;

export type EndpointsMap = {
	[k: string]: Endpoint;
};

export type ApiHintsMap = {
	[k: string]: ApiHint;
};

export type DocumentedEndpointsMap = {
	[k: string]: DocumentedEndpoint;
};

export type ApiDescription = {
	[k: string]: FunctionDescription;
};

export type PythonError = {
	lineno: number;
	end_lineno: number;
	offset: number;
	end_offset: number;
	msg: string;
};

export type OutputLineType = "input" | "output" | "error";

export type OutputLine = {
	text: string;
	lineType: OutputLineType;
	id: string;
};

export type OnTestRunType = (testPassed: boolean) => void | undefined;
export type IdeProps = {
	api?: ApiDescription;
	autoAwait?: boolean;
	defaultCode?: string;
	editable?: boolean;
	maxOutputSize?: number;
	verboseDelay?: number;
	pythonPrefix?: string;
	pythonSuffix?: string;
	autoRun?: boolean;
	hideRunningButtons?: boolean;
	pythonTest?: string;
	testBeforeSuffix?: boolean;
	onTestRun?: OnTestRunType;
};
