import { execSync as exec } from "child_process";
import commands from "./commands";
import utils from "../utils";

export default function liftDynamoContainer(port: number, name: string) {
	const command = utils.replacePort(
		utils.replaceName(commands.dynamoRunCommand, name),
		port
	);
	exec(command);
}
