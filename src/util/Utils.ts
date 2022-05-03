export function delay(ms: number) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(undefined);
		}, ms);
	});
}

export function runAtLeastFor<T>(ms: number, f: () => Promise<T>): Promise<T> {
	const out = f();
	return delay(ms).then(() => out);
}

export function generateId(): string {
	const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let out = '';
	for (let i = 0; i < 32; i++) {
		out += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
	}
	return out;
}
