import { error } from '@sveltejs/kit';

export function load({ params }) {
	if (!params.id) {
		throw error(404, 'Chat not found');
	}
	return {
		chatId: params.id
	};
}
