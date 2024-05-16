import { useCallback } from "react";
import { DefaultColor, DefaultShadowBlur } from "./consts";

type useCanvasManagerReturnType = {
	rect: (
		x: number,
		y: number,
		width: number,
		height: number,
		color?: string
	) => void;
	clear: () => void;
	glowRect: (
		x: number,
		y: number,
		width: number,
		height: number,
		color?: string,
		shadowBlur?: number
	) => void;
};

export default function useCanvasManager(
	canvas: HTMLCanvasElement | undefined,
	context: CanvasRenderingContext2D | undefined
): useCanvasManagerReturnType {
	const glowRect = useCallback(
		(
			x: number,
			y: number,
			width: number,
			height: number,
			color = DefaultColor,
			shadowBlur = DefaultShadowBlur
		) => {
			if (context) {
				context.fillStyle = color;
				context.shadowBlur = shadowBlur;
				context.shadowColor = color;
				context.fillRect(x, y, width, height);
			}
		},
		[context]
	);

	const rect = useCallback(
		(
			x: number,
			y: number,
			width: number,
			height: number,
			color = DefaultColor
		) => {
			if (context) {
				context.fillStyle = color;
				context.fillRect(x, y, width, height);
			}
		},
		[context]
	);

	const clear = useCallback(() => {
		if (context && canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
	}, [canvas, context]);

	return { rect, clear, glowRect };
}
