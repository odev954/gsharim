import { CustomePythonApi } from "hooks/python";
import { ApiDescription } from "components/ide";
import { IdeApiHints } from "@eco8200/data-models";
import { memoize, pickBy, has, pick, mapValues, uniqueId } from "lodash-es";
import { wait } from "./defaultApiFunctions";
import {
	ApiHint,
	ApiHintsMap,
	FunctionDescription,
	DocumentedEndpoint,
	DocumentedEndpointsMap,
	Endpoint,
	EndpointsMap,
	OutputLineType,
	OutputLine,
} from "./types";
import { PythonProcessTestPrefix } from "./consts";

export function generateOutputLine(
	outputLineMsg: string,
	outputLineType: OutputLineType
): OutputLine {
	return { text: outputLineMsg, lineType: outputLineType, id: uniqueId() };
}

export function getEndpointsOnly(
	api: ApiDescription
): EndpointsMap | DocumentedEndpointsMap {
	return pickBy<FunctionDescription, Endpoint | DocumentedEndpoint>(
		api,
		(value): value is Endpoint | DocumentedEndpoint => has(value, "endpoint")
	);
}

export function getHintsOnly(api: ApiDescription): ApiHintsMap {
	return pickBy<FunctionDescription, ApiHint>(api, (value): value is ApiHint =>
		has(value, "docString")
	);
}

export function addApiHints(
	endpoints: EndpointsMap | DocumentedEndpointsMap,
	hints: IdeApiHints
): ApiDescription {
	return mapValues(endpoints, (value, key) => {
		return {
			endpoint: value.endpoint,
			...pick<ApiHint>(hints[key], ["docString", "signature"]),
		};
	});
}

export function createEffectiveApi(
	api: ApiDescription,
	input: () => Promise<string>,
	setTestPassed: (testId: string) => void
): CustomePythonApi {
	const defaultApi = {
		wait,
		input,
		__test_passed__: setTestPassed,
	};
	const endpointApi = getEndpointsOnly(api);
	const listedFunctions = mapValues(endpointApi, (value) => value.endpoint);

	const mergedApi = { ...defaultApi, ...listedFunctions };
	return mergedApi;
}

// this is memoized to save the splitting of the same strings if the same section is run multiple times.
const indent = memoize((code: string): string => {
	const splitLines = code.split("\n");
	const newLines = splitLines.map((line) => `	${line}`);
	return newLines.join("\n");
});

function generatePythonTestSuffix(testId: string): string {
	return `except:
    test_passed = False
if test_passed:
    __test_passed__("${testId}")
`;
}

export function wrapPythonTestCode(
	pythonTestCode: string,
	testId: string
): string {
	const strings = [
		PythonProcessTestPrefix,
		indent(pythonTestCode),
		generatePythonTestSuffix(testId),
	];
	return strings.join("\n");
}

export function createEffectiveSuffix(
	pythonSuffix: string | undefined,
	pythonTest: string,
	newTestId: string,
	testBeforeSuffix: boolean
): string {
	const suffixList = [pythonSuffix, wrapPythonTestCode(pythonTest, newTestId)];
	if (testBeforeSuffix) {
		suffixList.reverse();
	}
	const effectiveSuffix = suffixList.join("\n");
	return effectiveSuffix;
}
