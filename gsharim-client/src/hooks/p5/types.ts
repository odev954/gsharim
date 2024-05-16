export type PythonHookQueueObject = {
	functionName: string;
	args: unknown[];
	resolvePromiseFunction: (obj: unknown) => void;
	rejectPromiseFunction: VoidFunction;
};
