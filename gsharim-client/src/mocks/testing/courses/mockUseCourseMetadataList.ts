import { UseQueryResult } from "@tanstack/react-query";
import { CourseMetadata } from "@eco8200/data-models";
import { mockUseQueryResult } from "../query/mockUseQueryResult";
import { coursesMetadataMock } from "./coursesMetadataMock";

export function mockUseCourseMetadataList(): UseQueryResult<CourseMetadata[]> {
	return mockUseQueryResult({ data: coursesMetadataMock });
}
