// eslint-disable-next-line max-classes-per-file
import { PythonP5Context, ContextSketch } from "@eco8200/data-models";
import { Sketch, P5CanvasInstance } from "@p5-wrapper/react";
import { PythonHookQueueObject } from "./types";

type ReadFunctionType<T> = {
	res: (obj: T) => void;
	rej: VoidFunction;
	pop: boolean;
};
export class AsyncQueue<T> {
	itemsInQueue: T[];

	awaitingReads: ReadFunctionType<T>[];

	constructor() {
		this.itemsInQueue = [];
		this.awaitingReads = [];
	}

	reset(): void {
		this.awaitingReads.forEach((awaitingRead) => {
			awaitingRead.rej();
		});
		this.itemsInQueue = [];
		this.awaitingReads = [];
	}

	push(obj: T): void {
		// if there is a waiting read, send him the item, if not, add item to queue
		const awaitingRead = this.awaitingReads.pop();
		if (awaitingRead !== undefined) {
			awaitingRead.res(obj);
			if (!awaitingRead.pop) {
				this.push(obj);
			}
		} else {
			this.itemsInQueue.unshift(obj);
		}
	}

	pop(): Promise<T> {
		// if there is an item in the queue, return it, if not, add add waiting read
		const returnPromise = new Promise<T>((res, rej) => {
			const queueItem = this.itemsInQueue.pop();
			if (queueItem !== undefined) {
				res(queueItem);
			} else {
				this.awaitingReads.push({ res, rej, pop: true });
			}
		}).catch(); // catch in case it was cancelled, do nothing
		return returnPromise;
	}

	top(): Promise<T> {
		// get an element in the queue, but don't remove it from the queue
		const returnPromise = new Promise<T>((res, rej) => {
			const queueItem = this.itemsInQueue[this.itemsInQueue.length - 1];
			if (queueItem !== undefined) {
				res(queueItem);
			} else {
				this.awaitingReads.push({ res, rej, pop: false });
			}
		}).catch(); // catch in case it was cancelled, do nothing
		return returnPromise;
	}
}

export class PythonHookQueue extends AsyncQueue<PythonHookQueueObject> {
	reset(): void {
		this.itemsInQueue.forEach((pythonHookQueueObject) => {
			pythonHookQueueObject.rejectPromiseFunction();
		});
		super.reset();
	}
}

export async function applyContext(
	contextSketchPromise: Promise<ContextSketch>,
	context: PythonP5Context
): Promise<Sketch> {
	const contextSketch = await contextSketchPromise;
	return (p5: P5CanvasInstance): void => contextSketch(p5, context);
}
