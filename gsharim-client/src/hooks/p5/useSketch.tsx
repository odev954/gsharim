import { PythonP5Context } from "@eco8200/data-models";
import { fetchContextSketch } from "api/p5/fetchSketch";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Sketch } from "@p5-wrapper/react";
import { applyContext } from "./utils";
import { sketchQueryKey } from "./consts";

export const useSketch = (
	url: string,
	context: PythonP5Context
): UseQueryResult<Sketch> =>
	useQuery({
		queryKey: [sketchQueryKey, url, context],
		queryFn: () => applyContext(fetchContextSketch(url), context),
		useErrorBoundary: true,
	});
