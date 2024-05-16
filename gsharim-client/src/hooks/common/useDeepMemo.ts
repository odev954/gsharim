import { isEqual } from "lodash-es";
import { DependencyList, useEffect, useState } from "react";

export default function useDeepMemo<T>(
	action: () => T,
	deps?: DependencyList
): T {
	const [currentValue, setCurrentValue] = useState(action());
	useEffect(() => {
		const newValue = action();
		if (!isEqual(currentValue, newValue)) {
			setCurrentValue(newValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action, currentValue, ...(deps || [])]);
	return currentValue;
}
