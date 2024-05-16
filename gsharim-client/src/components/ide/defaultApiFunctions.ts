export async function wait(ms: number): Promise<void> {
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve(null);
		}, ms);
	});
	await promise;
}
