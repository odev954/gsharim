import { execSync as exec } from "child_process";
import commands from "./commands";

export default function awsLogin() {
	try {
		exec(commands.awsCheckIsLoggedIn);
	} catch (e) {
		const error = e as Error;
		if (error.message.match("Error loading SSO Token")?.length !== 0) {
			exec(commands.awsLogin);
		}
	}
}
