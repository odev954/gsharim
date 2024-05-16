import { fetchAvailableIcons } from "api/assets/fetchProfileIcons";
import { AvailableAvatars } from "@eco8200/data-models";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { profileIconsQueryKey } from "./consts";

export const useProfileIcons = (): UseQueryResult<AvailableAvatars> => {
	return useQuery({
		queryKey: [profileIconsQueryKey],
		queryFn: fetchAvailableIcons,
	});
};
