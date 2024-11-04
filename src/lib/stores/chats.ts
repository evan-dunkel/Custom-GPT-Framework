import { writable } from 'svelte/store';

export interface Chat {
	id: string;
	title: string;
	createdAt: Date;
	messages: Array<{ role: 'user' | 'assistant'; content: string }>;
}

// Load chats from localStorage on initialization
const storedChats =
	typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('chats') || '[]') : [];

export const chats = writable<Chat[]>(storedChats);

// Subscribe to changes and save to localStorage
if (typeof localStorage !== 'undefined') {
	chats.subscribe((value) => {
		localStorage.setItem('chats', JSON.stringify(value));
	});
}

export function createChat() {
	const newChat: Chat = {
		id: crypto.randomUUID(),
		title: 'New Chat',
		createdAt: new Date(),
		messages: []
	};

	chats.update((currentChats) => [newChat, ...currentChats]);
	return newChat.id;
}

export function deleteChat(id: string) {
	chats.update((currentChats) => currentChats.filter((chat) => chat.id !== id));
}
