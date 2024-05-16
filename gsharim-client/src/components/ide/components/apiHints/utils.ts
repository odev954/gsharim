import { IdeApiHints } from "@eco8200/data-models";

type functionDescription = {
	functionName: string;
	functionDescription: string;
};

export function createFunctionDescriptions(
	api: IdeApiHints
): functionDescription[] {
	const docstringKeys: string[] = Object.keys(api).filter(
		(key) => api[key].docString
	);
	return docstringKeys.map((key) => {
		const { docString, signature } = api[key];
		const keySiganture = signature || `${key}()`;
		return {
			functionName: keySiganture,
			functionDescription: ` - ${docString || ""}`,
		};
	});
}
