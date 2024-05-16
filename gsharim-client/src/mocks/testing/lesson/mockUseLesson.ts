import { UseQueryResult } from "@tanstack/react-query";
import { Lesson } from "@eco8200/data-models";
import { mockUseQueryResult } from "../query/mockUseQueryResult";
import { lessonMock } from "./lesson";

export function mockUseLesson(): UseQueryResult<Lesson> {
	return mockUseQueryResult({ data: lessonMock });
}
