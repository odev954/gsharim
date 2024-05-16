const runJsonServer =
	"json-server --watch jsonServerMocks.json --routes jsonServerRoutes.json --port {PORT}";
const jsonServerPidCheck = "netstat -ano | findStr {PORT}";

export default {
	runJsonServer,
	jsonServerPidCheck,
};
