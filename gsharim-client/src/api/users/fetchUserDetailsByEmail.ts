import { UserDetails, UserDetailsSchema } from "@eco8200/data-models";
import { userDetailsMock } from "mocks/demo/users/userDetailsMock";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchUserDetailsByEmail(email: string): Promise<UserDetails> {
	return UserDetailsSchema.parse(userDetailsMock());
}

export { fetchUserDetailsByEmail };
