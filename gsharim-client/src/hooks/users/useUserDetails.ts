import { fetchUserDetailsByEmail } from "api/users/fetchUserDetailsByEmail";
import { UserDetails } from "@eco8200/data-models";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { userDetailsQueryKey } from "./consts";

function useUserDetails(email: string): UseQueryResult<UserDetails> {
	return useQuery({
		queryKey: [userDetailsQueryKey, email],
		queryFn: () => fetchUserDetailsByEmail(email),
	});
}

export { useUserDetails };
