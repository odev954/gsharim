import { UseQueryResult } from "@tanstack/react-query";
import { AvailableAvatars } from "@eco8200/data-models";
import { mockUseQueryResult } from "../query/mockUseQueryResult";
import { mockAvailableIcons } from "./profileIconsMock";

export function mockUseProfileIcons(): UseQueryResult<AvailableAvatars> {
	const availableIcons = mockAvailableIcons();
	return mockUseQueryResult({ data: availableIcons });
}
