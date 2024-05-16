import { User as Auth0User } from "@auth0/auth0-react";
import { UserDetails } from "@eco8200/data-models";

export type User = Auth0User & {
	details: UserDetails;
};
