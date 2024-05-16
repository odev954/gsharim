import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ApiDescription } from "components/ide";
import { PythonP5Context } from "@eco8200/data-models";
import { PythonHookQueue } from "./utils";
import { PythonHookQueueObject } from "./types";

export type usePythonP5ContextReturnType = {
	context: PythonP5Context;
	pythonApi: ApiDescription;
};

export default function usePythonP5Context(): usePythonP5ContextReturnType {
	const [pythonApi, setPythonApi] = useState<ApiDescription>({});
	const pythonHooksQueue = useRef<PythonHookQueue>(new PythonHookQueue());

	const addPythonApiFunction = useCallback(
		(func: Function, docString?: string) => {
			setPythonApi((current) => {
				const newApi = { ...current };
				newApi[func.name] = {
					endpoint: func,
					docString,
				};
				return newApi;
			});
		},
		[]
	);

	const awaitPythonFunctionResult = useCallback(
		async (functionName: string, args: unknown[] = []): Promise<unknown> => {
			function nullFunction(): null {
				return null;
			}
			const pythonHookQueueObject: PythonHookQueueObject = {
				functionName,
				args,
				resolvePromiseFunction: nullFunction,
				rejectPromiseFunction: nullFunction,
			};
			const returnValuePromise = new Promise((res, rej) => {
				pythonHookQueueObject.resolvePromiseFunction = res;
				pythonHookQueueObject.rejectPromiseFunction = rej;
			}).catch(); // handle the case the promise will be cancelled
			pythonHooksQueue.current.push(pythonHookQueueObject);
			const functionReturnValue = await returnValuePromise;
			return functionReturnValue;
		},
		[]
	);

	// the reason there are 2 functions, and getPythonFunctionCall not returning the resolve function.
	// is that we cannot send a function object to the webworker.
	const getPythonFunctionCall = useCallback(async () => {
		// this function returns to python the function to be used.
		const { functionName, args } = await pythonHooksQueue.current.top();
		return { functionName, args };
	}, [pythonHooksQueue]);

	const pythonResolveCurrent = useCallback(async (obj: unknown) => {
		const { resolvePromiseFunction } = await pythonHooksQueue.current.pop();
		resolvePromiseFunction(obj);
	}, []);

	const resetFunctionCallQueue = useCallback(() => {
		pythonHooksQueue.current.reset();
	}, []);

	useEffect(() => {
		setPythonApi((current) => {
			return {
				...current,
				__get_awaiting_function_call__: {
					endpoint: getPythonFunctionCall,
				},
				__resolve_current_function_call__: {
					endpoint: pythonResolveCurrent,
				},
			};
		});
	}, [getPythonFunctionCall, pythonResolveCurrent]);

	const context = useMemo(
		() => ({
			addPythonApiFunction,
			awaitPythonFunctionResult,
			resetFunctionCallQueue,
		}),
		[addPythonApiFunction, awaitPythonFunctionResult, resetFunctionCallQueue]
	);

	const returnValue = useMemo(
		() => ({ context, pythonApi }),
		[pythonApi, context]
	);

	return returnValue;
}
