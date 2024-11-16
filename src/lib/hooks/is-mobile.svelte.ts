import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export class IsMobile {
	store = writable(false);

	constructor() {
		if (browser) {
			const checkMobile = () => {
				this.store.set(window.innerWidth < 768);
			};

			checkMobile();
			window.addEventListener('resize', checkMobile);
		}
	}

	get current() {
		let value = false;
		this.store.subscribe((v) => (value = v))();
		return value;
	}
}
