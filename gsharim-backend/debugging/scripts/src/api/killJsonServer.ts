import { execSync as exec } from "child_process";
import commands from "./commands";
import { kill } from "process";
import utils from "../utils";

export default function killJsonServer(port: number) {
	const command = utils.replacePort(commands.jsonServerPidCheck, port);
	const output = exec(command).toString();

	const searchResult = output.match(/(?<=LISTENING)\s+\d\d+/g);

	if (searchResult) {
		const pidStr = searchResult[0].replace(/\s/g, "");
		kill(parseInt(pidStr));
	}
}
