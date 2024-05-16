import moment from "moment";
import { Visabilty } from "./types";

export function formatSeconds(overallSeconds: number): string {
	return moment.utc(overallSeconds * 1000).format("mm:ss");
}

export function visabilityFromParameter(param?: string | number): Visabilty {
	const shouldRender = param !== undefined;
	return shouldRender ? "visible" : "hidden";
}
