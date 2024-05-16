import { useEffect, useState, useMemo, useCallback } from "react";
import { cloneDeep } from "lodash-es";
import { useCanvas, useCanvasManager } from "..";
import { waitAnimationFrame } from "./utils";
import { Position, gameRects, gameRect } from "./types";

type CanvasGameEngineProps = {
	rows: number;
	cols: number;
	AnimationDt?: number;
	initialGameState: gameRects;
	onGameStateChange?: (currentGameState: gameRects) => void;
};

type useCanvasGameEnginePropsReturnType = {
	move: (index: number, target: Position) => void;
	onMount: (node: HTMLCanvasElement) => void;
	reset: () => void;
};

export default function useCanvasGameEngine({
	rows,
	cols,
	AnimationDt = 0.3,
	initialGameState,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onGameStateChange = () => {},
}: CanvasGameEngineProps): useCanvasGameEnginePropsReturnType {
	const { canvas, context, onMount } = useCanvas();
	const { glowRect, clear } = useCanvasManager(canvas, context);
	const [gameObjects, setGameObjects] = useState<gameRects>(
		cloneDeep(initialGameState)
	);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const dx = useMemo(() => width / cols, [width, cols]);
	const dy = useMemo(() => height / rows, [height, rows]);

	const drawRectPosition = useCallback(
		(rect: gameRect) => {
			const rectStartX = Math.ceil(rect.x * dx);
			const rectStartY = Math.ceil(rect.y * dy);
			const rectWidth = Math.ceil(rect.xSize * dx);
			const rectHeight = Math.ceil(rect.ySize * dy);
			glowRect(rectStartX, rectStartY, rectWidth, rectHeight, rect.color);
		},
		[dx, dy, glowRect]
	);

	useEffect(() => {
		if (canvas) {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			setWidth(canvas.width);
			setHeight(canvas.height);
		}
	}, [canvas]);

	const draw = useCallback(() => {
		clear();
		gameObjects.forEach(drawRectPosition);
	}, [clear, gameObjects, drawRectPosition]);

	useEffect(() => {
		draw();
	}, [draw]);

	const setRectPosition = useCallback((index: number, x: number, y: number) => {
		setGameObjects((current) => {
			const newState = [...current];
			newState[index].x = x;
			newState[index].y = y;
			return newState;
		});
	}, []);

	const move = useCallback(
		async (index: number, target: Position) => {
			const position: Position = [gameObjects[index].x, gameObjects[index].y];
			const xSign = Math.sign(target[0] - position[0]);
			const ySign = Math.sign(target[1] - position[1]);

			const moveVector = [target[0] - position[0], target[1] - position[1]];
			const moveVectorNorm = Math.sqrt(moveVector[0] ** 2 + moveVector[1] ** 2);

			const animationDx = (AnimationDt * moveVector[0]) / moveVectorNorm;
			const animationDy = (AnimationDt * moveVector[1]) / moveVectorNorm;

			while (
				position[0] * xSign < target[0] * xSign ||
				position[1] * ySign < target[1] * ySign
			) {
				position[0] += animationDx;
				position[1] += animationDy;
				setRectPosition(index, position[0], position[1]);
				// eslint-disable-next-line no-await-in-loop
				await waitAnimationFrame();
			}
			setRectPosition(index, target[0], target[1]);
			await waitAnimationFrame();
		},
		[gameObjects, setRectPosition, AnimationDt]
	);

	const reset = useCallback(() => {
		setGameObjects(cloneDeep(initialGameState));
	}, [initialGameState]);

	useEffect(() => {
		onGameStateChange(gameObjects);
	}, [gameObjects, onGameStateChange]);

	return { move, onMount, reset };
}
