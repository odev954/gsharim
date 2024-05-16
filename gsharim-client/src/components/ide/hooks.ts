import { useCallback, useRef } from "react";
import { v4 } from "uuid";
import { createEffectiveSuffix } from "./utils";
import { OnTestRunType } from "./types";

type RunPythonCode = (suffix?: string) => void;

type usePythonTestReturnType = {
	setTestPassedApiFunction: (id: string) => void;
	runCodeRunWithPythonTest: (runPythonCode: RunPythonCode) => void;
};

export function usePythonTest(
	testBeforeSuffix: boolean,
	onTestRun?: OnTestRunType,
	pythonSuffix?: string,
	pythonTest?: string
): usePythonTestReturnType {
	const restIdReference = useRef(null);
	const setTestPassedApiFunction = useCallback(
		async (id: string) => {
			if (id === restIdReference.current && restIdReference.current) {
				onTestRun?.(true);
			}
		},
		[onTestRun]
	);
	const runCodeRunWithPythonTest = useCallback(
		(runPythonCode: (suffix?: string) => void) => {
			let effectiveSuffix = pythonSuffix;
			if (pythonTest) {
				const newTestId = v4();
				restIdReference.current = newTestId;
				effectiveSuffix = createEffectiveSuffix(
					pythonSuffix,
					pythonTest,
					newTestId,
					testBeforeSuffix
				);
				onTestRun?.(false);
			}
			runPythonCode(effectiveSuffix);
		},
		[onTestRun, pythonSuffix, pythonTest, testBeforeSuffix]
	);

	return {
		setTestPassedApiFunction,
		runCodeRunWithPythonTest,
	};
}
