import { User as Auth0User } from "@auth0/auth0-react";
import { User } from "types/users/user";

export function isUser(user: Auth0User | undefined): user is User {
	return !!user?.details;
}
