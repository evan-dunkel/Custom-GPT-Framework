<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import { chats } from '$lib/stores/chats';
	import { page } from '$app/stores';
	import { pageTitle } from '$lib/stores/page';

	const chatId = $page.params.id;
	$: currentChat = $chats.find((chat) => chat.id === chatId);
	$: if (currentChat) {
		$pageTitle = currentChat.title;
	}

	function handleSubmit(message: string) {
		chats.update((currentChats) => {
			return currentChats.map((chat) => {
				if (chat.id === chatId) {
					return {
						...chat,
						messages: [...chat.messages, { role: 'user', content: message }]
					};
				}
				return chat;
			});
		});
	}
</script>

<Chat onSubmit={handleSubmit} />
