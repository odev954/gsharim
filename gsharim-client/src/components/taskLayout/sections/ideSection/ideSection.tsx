import Ide from "components/ide";
import { IdeSectionData } from "@eco8200/data-models";
import { useSetSectionBlocking } from "hooks/navigation/useSetSectionBlocking";
import { useCallback } from "react";
import { DefaultTestBeforeSuffix } from "./consts";

export default function IdeSection({
	api,
	autoAwait,
	defaultCode,
	editable,
	maxOutputSize,
	verboseDelay,
	pythonPrefix,
	pythonSuffix,
	autoRun,
	pythonTest,
	id,
}: IdeSectionData): JSX.Element {
	const { approveSection } = useSetSectionBlocking(id);
	const approveSectionIsDone = useCallback(
		(isDone: boolean) => {
			if (isDone) {
				approveSection();
			}
		},
		[approveSection]
	);
	return (
		<Ide
			api={api}
			defaultCode={defaultCode}
			autoAwait={autoAwait}
			editable={editable}
			maxOutputSize={maxOutputSize}
			verboseDelay={verboseDelay}
			pythonPrefix={pythonPrefix}
			pythonSuffix={pythonSuffix}
			autoRun={autoRun}
			pythonTest={pythonTest}
			testBeforeSuffix={DefaultTestBeforeSuffix}
			onTestRun={approveSectionIsDone}
		/>
	);
}
