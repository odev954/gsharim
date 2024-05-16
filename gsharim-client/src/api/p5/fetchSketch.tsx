import { Sketch } from "@p5-wrapper/react";

export async function fetchContextSketch(sketchUrl: string): Promise<Sketch> {
	const sketch = (await import(/* @vite-ignore */ sketchUrl)).default;
	return sketch;
}
