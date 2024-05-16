import { useMemo } from "react";
import { P5ComponentData } from "@eco8200/data-models";
import usePythonP5Context from "hooks/p5/usePythonP5Context";
import { useSketch } from "hooks/p5/useSketch";
import P5Component from "./p5Component";
import pythonHooksSuffix from "./pythonHooksSuffix.py?raw";

export default function P5Container({
	url,
	containIde,
	api,
	autoAwait,
	defaultCode,
	editable,
	maxOutputSize,
	verboseDelay,
	pythonPrefix,
	pythonSuffix,
	autoRun,
}: P5ComponentData): JSX.Element {
	const { context, pythonApi } = usePythonP5Context();
	const fetchSketchResult = useSketch(url, context);
	const effectiveApi = useMemo(
		() => ({ ...api, ...pythonApi }),
		[api, pythonApi]
	);
	const effectiveSuffix = [pythonSuffix, pythonHooksSuffix].join("\n");

	return (
		<P5Component
			fetchSketchResult={fetchSketchResult}
			containIde={containIde}
			api={effectiveApi}
			pythonSuffix={effectiveSuffix}
			autoAwait={autoAwait}
			defaultCode={defaultCode}
			editable={editable}
			maxOutputSize={maxOutputSize}
			verboseDelay={verboseDelay}
			userPrefix={pythonPrefix}
			autoRun={autoRun}
		/>
	);
}
