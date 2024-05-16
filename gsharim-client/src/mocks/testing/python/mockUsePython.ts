import { vi } from "vitest";

type hookReturnType = [
	runPython: () => void,
	restartPythonInterpreter: () => void,
	isRunning: boolean
];

export function mockUsePython(): hookReturnType {
	const isRunning = false;
	return [vi.fn(), vi.fn(), isRunning];
}
