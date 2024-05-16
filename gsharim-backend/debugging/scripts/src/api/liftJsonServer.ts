import { spawn } from "child_process";
import { join, resolve } from "path";
import commands from "./commands";
import utils from "../utils";

export default function liftJsonServer(port: number) {
	const path = resolve(join(__dirname, "../../../resources"));
	const command = utils.replacePort(commands.runJsonServer, port);

	const process = spawn(command, {
		detached: true,
		cwd: path,
		stdio: "ignore",
		shell: true,
	});

	process.unref();
}
