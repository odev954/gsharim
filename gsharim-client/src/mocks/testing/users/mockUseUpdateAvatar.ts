import { UseMutationResult } from "@tanstack/react-query";
import { vi, Mock } from "vitest";
import { mockUseMutationResult } from "../query/mockUseMutationResult";

export function mockUseUpdateAvatar(): UseMutationResult<
	Mock,
	null,
	void,
	void
> {
	return mockUseMutationResult({
		data: vi.fn(),
	}) as UseMutationResult<Mock, null, void, void>;
}
