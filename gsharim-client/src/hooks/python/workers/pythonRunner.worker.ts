import { loadPyodide, PyodideInterface } from "pyodide";
import {
	CodePostString,
	handleInputPythonCode,
	SetLineNumber,
	pyodideUrl,
} from "./consts";
import runUserCode from "./pythonCode/run_user_code.py?raw";
import {
	PythonWorkerSetupMessage,
	PythonWorkerApiDescription,
	PythonWorkerMessage,
} from "../types";
import { isRunCodeMessage, isSetupMessage } from "./typeGuards";
import { ApiModule } from "./types";
import { jsPythonFunction, stderr, waitDelay } from "./utils";

class PythonWorker {
	autoAwait: boolean;

	verboseDelay: number | undefined;

	pyodide: PyodideInterface | undefined;

	ready: boolean;

	codePrefix: string;

	codeSuffix: string;

	constructor() {
		this.autoAwait = false;
		this.ready = false;
		this.codePrefix = "";
		this.codeSuffix = "";
	}

	public async setup(message: PythonWorkerSetupMessage): Promise<void> {
		const { api, autoAwait, verboseDelay } = message;
		this.autoAwait = autoAwait;
		this.verboseDelay = verboseDelay;
		if (api === undefined) {
			throw new Error(
				"the first messgae expected to be a setup message, must include api"
			);
		}
		await this.loadPyodideInterpreter();
		const apiModule = this.moduleFromApi(api);
		if (!this.pyodide) throw new Error("pyodide is not available");
		this.pyodide.registerJsModule("tmp", apiModule);
		this.setPrefixAndSuffixStrings(apiModule);
		this.ready = true;
		postMessage({
			isReady: true,
		});
	}

	public async loadPyodideInterpreter(): Promise<void> {
		this.pyodide = await loadPyodide({
			// this has to be an arrow function, otherwise the type of the function is wrong because it's a class function.
			stdout: (msg: string) => {
				this.stdout(msg);
			},
			indexURL: pyodideUrl,
		});
	}

	stdout(output: string): void {
		if (this.ready) {
			postMessage({ output, isError: false });
		}
	}

	moduleFromApi(api: PythonWorkerApiDescription): ApiModule {
		if (!this.pyodide) throw new Error("pyodide is not available");
		const apiModule: ApiModule = {};
		Object.keys(api).forEach((apiFunctionName: string) => {
			if (!this.pyodide) throw new Error("pyodide is not available");
			const apiFunction = async (...args: unknown[]): Promise<unknown> =>
				jsPythonFunction(this.pyodide, apiFunctionName, args);
			apiModule[apiFunctionName] = this.pyodide?.toPy(apiFunction);
		});

		// i have to use this notation becuase this module will have the same entries in python
		// eslint-disable-next-line no-underscore-dangle
		apiModule.__UsePythonSetLineNumber__ = this.pyodide.toPy(
			async (lineno: number) => {
				jsPythonFunction(this.pyodide, SetLineNumber, lineno);
			}
		);
		// eslint-disable-next-line no-underscore-dangle
		apiModule.__waitDelay__ = this.pyodide.toPy(waitDelay);
		return apiModule;
	}

	setPrefixAndSuffixStrings(apiModule: ApiModule): void {
		const prefixLines: string[] = [];
		Object.keys(apiModule).forEach((key: string) => {
			if (key !== "input") {
				prefixLines.push(`from tmp import ${key}\n`);
			} else {
				prefixLines.push(handleInputPythonCode);
			}
		});
		this.codePrefix = prefixLines.join("");
		this.codeSuffix = CodePostString;
	}

	async runCode(
		code: string,
		pythonPrefix?: string,
		pythonSuffix?: string
	): Promise<void> {
		if (!this.pyodide) throw new Error("pyodide is not available");
		this.pyodide.runPython(this.codePrefix);
		try {
			this.pyodide.globals.set("code_to_run", code);
			this.pyodide.globals.set("verbose_delay", this.verboseDelay);
			this.pyodide.globals.set("auto_await", this.autoAwait);
			this.pyodide.globals.set("user_prefix", pythonPrefix);
			this.pyodide.globals.set("user_suffix", pythonSuffix);
			await this.pyodide?.runPythonAsync(runUserCode);
		} catch (error) {
			// this conversion is a must, because in js and ts we can throw anything, we cannot assume that the error is of type Error.
			// but i know that the error will originate from a error in pyodide (None + 1 in the code for example), and so i need it to be passed to
			// stderr as Error
			stderr(error as Error);
		}
		this.pyodide.runPython(this.codeSuffix);
		postMessage({ isRunning: false });
	}

	async handlePyodideMessage(message: PythonWorkerMessage): Promise<void> {
		if (isRunCodeMessage(message)) {
			return this.runCode(message.codeToRun);
		}
		return Promise.resolve();
	}
}

const pythonWorker: PythonWorker = new PythonWorker();
onmessage = async (message: MessageEvent<PythonWorkerMessage>) => {
	const { data } = message;
	if (isSetupMessage(data)) {
		await pythonWorker.setup(data);
	} else if (isRunCodeMessage(data)) {
		await pythonWorker.runCode(
			data.codeToRun,
			data.pythonPrefix,
			data.pythonSuffix
		);
	}
};
