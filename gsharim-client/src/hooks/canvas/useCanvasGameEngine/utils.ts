export async function waitAnimationFrame(): Promise<void> {
	await new Promise((resolve) => requestAnimationFrame(resolve));
}
