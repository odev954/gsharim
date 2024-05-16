import { useCallback } from "react";
import { fetchQuestion } from "api/question/fetchQuestion";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IQuestion } from "@eco8200/data-models";
import { questionQueryKey } from "./consts";

export function useQuestion(questionId: string): UseQueryResult<IQuestion> {
	const questionFetcher = useCallback(
		() => fetchQuestion(questionId),
		[questionId]
	);

	return useQuery({
		queryKey: [questionQueryKey, questionId],
		queryFn: questionFetcher,
	});
}
