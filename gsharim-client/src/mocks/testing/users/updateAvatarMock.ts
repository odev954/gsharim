import { MutationStatus } from "@tanstack/query-core";
import { UseMutateFunction } from "@tanstack/react-query";
import { UpdateAvatar } from "@eco8200/data-models";
import { vi } from "vitest";

const updateAvatarMockData = (): {
	updateAvatar: UseMutateFunction<void, Error, UpdateAvatar, unknown>;
	status: MutationStatus;
	isSuccess: boolean;
} => {
	const mutation = {
		updateAvatar: vi.fn(),
		status: "success" as MutationStatus,
		isSuccess: true,
	};

	return mutation;
};

export default updateAvatarMockData;
