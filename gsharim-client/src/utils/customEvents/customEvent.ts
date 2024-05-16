type CustomEventListener = (event: CustomEvent) => void;

function on(eventType: string, listener: CustomEventListener): void {
	document.addEventListener(eventType, listener as EventListener);
}

function off(eventType: string, listener: CustomEventListener): void {
	document.removeEventListener(eventType, listener as EventListener);
}

function once(eventType: string, listener: CustomEventListener): void {
	function handleEventOnce(event: CustomEvent): void {
		listener(event);
		off(eventType, handleEventOnce);
	}
	on(eventType, handleEventOnce);
}

function trigger<T>(eventType: string, data: T): void {
	const event = new CustomEvent(eventType, { detail: data });
	document.dispatchEvent(event);
}

export { on, once, off, trigger };
