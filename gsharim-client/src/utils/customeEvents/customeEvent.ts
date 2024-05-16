// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (data: any) => void;

function on(eventType: string, listener: Listener): void {
	document.addEventListener(eventType, listener);
}

function off(eventType: string, listener: Listener): void {
	document.removeEventListener(eventType, listener);
}

function once(eventType: string, listener: Listener): void {
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	on(eventType, handleEventOnce);

	function handleEventOnce(event: CustomEvent): void {
		listener(event);
		off(eventType, handleEventOnce);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function trigger(eventType: string, data: any): void {
	const event = new CustomEvent(eventType, { detail: data });
	document.dispatchEvent(event);
}

export { on, once, off, trigger };
