import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { updateAvatar } from "api/users/updateAvatar";
import { UpdateAvatar } from "@eco8200/data-models";

export function useUpdateAvatar(): UseMutationResult<
	void,
	Error | null,
	UpdateAvatar,
	unknown
> {
	const mutation = useMutation<void, Error | null, UpdateAvatar, unknown>({
		mutationFn: updateAvatar,
	});

	return mutation;
}
