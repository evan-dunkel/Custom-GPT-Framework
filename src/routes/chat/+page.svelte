<script lang="ts">
import Chat from '$lib/components/chat.svelte';
import { pageTitle } from '$lib/stores/page';

$pageTitle = 'Chat';
</script>

<Chat />