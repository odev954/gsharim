export type UnityEvent = {
	eventName: string;
	data: string;
};
export type CallUnityFunction = (
	funcName: string,
	args?: string[]
) => Promise<string | null>;
