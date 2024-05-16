import { useState, useMemo, useCallback } from "react";

type UseCanvas = {
	canvas?: HTMLCanvasElement;
	context?: CanvasRenderingContext2D;
	onMount: (node: HTMLCanvasElement) => void;
};

export default function useCanvas(): UseCanvas {
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();

	const onMount = useCallback((node: HTMLCanvasElement) => {
		setCanvas(node);
	}, []);

	const context = useMemo<CanvasRenderingContext2D | undefined>(() => {
		const ctx = canvas?.getContext("2d") ?? undefined;
		return ctx;
	}, [canvas]);

	return { canvas, context, onMount };
}
