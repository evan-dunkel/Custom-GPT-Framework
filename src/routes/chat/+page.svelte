<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { createChat } from '$lib/stores/chats';

	onMount(() => {
		const newChatId = createChat();
		goto(`/chat/${newChatId}`);
	});
</script>

<div class="flex h-full items-center justify-center">
	<p>Creating new chat...</p>
</div>
