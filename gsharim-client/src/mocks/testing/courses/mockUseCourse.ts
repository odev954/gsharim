import { UseQueryResult } from "@tanstack/react-query";
import { Course } from "@eco8200/data-models";
import { mockUseQueryResult } from "../query/mockUseQueryResult";
import { courseMock } from "./courseMock";

export function mockUseCourse(): UseQueryResult<Course> {
	return mockUseQueryResult({ data: courseMock });
}
