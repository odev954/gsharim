import { useMemo } from "react";
import { visabilityFromParameter } from "./utils";
import { Visabilty } from "./types";

export function useVisability(param?: string | number): Visabilty {
	const visabilty = useMemo(() => visabilityFromParameter(param), [param]);
	return visabilty;
}
