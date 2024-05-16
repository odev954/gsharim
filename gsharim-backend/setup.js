const { exec, cd, ls, echo } = require("shelljs");

const colors = {
	green: "\x1b[0;32m",
	cyan: "\x1b[0;36m",
	white: "\x1b[1;37m",
};

const output = (message) => {
	echo("-e", `\n${colors.green}${message}${colors.white}`);
};

const outputWithVariable = (message, variable) => {
	echo(
		"-e",
		`\n${colors.green}${message} ${colors.cyan}${variable}${colors.white}`
	);
};

function main() {
	if (process.platform === "darwin") {
		output("installing Docker...");
		exec("brew install docker");
		output("installing AWS CLI...");
		exec("brew install awscli");
		outputWithVariable("installed applications for", "Mac OS");
	} else if (process.platform === "win32") {
		output("installing WSL...");
		exec("wsl --install -d ubuntu");
		output("installing Docker...");
		exec("winget install -e --id Docker.DockerDesktop --accept-source-agreements");
		output("installing AWS CLI...");
		exec("winget install -e --id Amazon.AWSCLI");
		outputWithVariable("installed applications for", "Windows");
	}

	output("pulling docker images...");
	exec("docker pull amazon/dynamodb-local");

	output("installing global dependencies...");
	exec("npm i -g ts-node json-server typescript");

	output("installing project dependencies...");
	cd("debugging/scripts");
	exec("npm i");

	cd("..");
	cd("..");

	output("installing lambda dependencies...");
	cd("lib/lambdas");
	const lambdas = ls("-d", "*/");

	lambdas.forEach((lambda) => {
		outputWithVariable("installing dependencies for", lambda);
		cd(lambda);
		exec("npm i");
		cd("..");
	});
	cd("..");
	cd("..");

	output("opening VSCode...");
	exec("code -n -r .");
	exec("code README.md");
}

main();
