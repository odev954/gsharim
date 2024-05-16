import { useCallback } from "react";
import { CallUnityFunction } from "./types";

type UseParameterlessFunctionWithNoReturnValueReturnType = () => Promise<void>;
export default function useParameterlessFunctionWithNoReturnValue(
	callUnityFunction: CallUnityFunction,
	functionName: string
): UseParameterlessFunctionWithNoReturnValueReturnType {
	return useCallback(async () => {
		await callUnityFunction(functionName, []);
	}, [callUnityFunction, functionName]);
}
