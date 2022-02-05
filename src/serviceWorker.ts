export function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('').then(() => {
				console.log('Service worker registered');
			}).catch(console.error);
		});
	} else {
		console.log('Service worker not supported in this environment');
	}
}
