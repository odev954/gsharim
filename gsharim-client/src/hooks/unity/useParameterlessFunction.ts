import { useCallback } from "react";
import { CallUnityFunction } from ".";

type UseParameterlessFunctionReturnType<T> = () => Promise<T>;

export default function useParameterlessFunction<T>(
	callUnityFunction: CallUnityFunction,
	functionName: string,
	parser: (functionOutput: string | null) => T
): UseParameterlessFunctionReturnType<T> {
	return useCallback(async () => {
		const functionReturnValue = await callUnityFunction(functionName, []);
		return parser(functionReturnValue);
	}, [callUnityFunction, functionName, parser]);
}
