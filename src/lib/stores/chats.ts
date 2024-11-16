import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

type Chat = {
	id: string;
	title: string;
};

function createChatsStore() {
	const { subscribe, set, update } = writable<Chat[]>([]);

	return {
		subscribe,
		createChat: () => {
			const id = nanoid();
			update((chats) => [...chats, { id, title: 'New Chat' }]);
			return id;
		},
		deleteChat: (id: string) => {
			update((chats) => chats.filter((chat) => chat.id !== id));
		},
		reset: () => set([])
	};
}

export const chats = createChatsStore();
export const { createChat, deleteChat } = chats;
