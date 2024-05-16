import { createContext } from "react";
import Auth from "types/users/auth";

export const AuthContext = createContext<Auth>({} as Auth);
