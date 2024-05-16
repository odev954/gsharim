const replacePort = (command: string, port: number) =>
	command.replace(/\{PORT\}/g, port.toString());

const replaceName = (command: string, name: string) =>
	command.replace(/\{NAME\}/g, name);

export default {
	replaceName,
	replacePort,
};
