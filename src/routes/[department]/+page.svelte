<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import { pageTitle } from '$lib/stores/page';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';
	import * as icons from 'lucide-svelte';
	import { FileQuestion } from 'lucide-svelte';

	export let data;

	$pageTitle = data?.department?.title || '';

	const agent = {
		name: data?.department?.title === 'Marketing' ? 'Corey' : 'Taylor',
		seed: data?.department?.title === 'Marketing' ? 'corey-------------------' : 'Sophia',
		description: `Your AI-powered ${data?.department?.title?.toLowerCase() || ''} assistant.`
	};

	$: cards = (data?.department?.cards || []).map((card) => ({
		title: card.title || '',
		description: card.description || '',
		url: `/${data?.department?.url || ''}/${card.url || ''}`,
		icon: (card.icon && icons[card.icon]) || FileQuestion,
		messageTemplate: card.messageTemplate || ''
	}));
</script>

<Chat {agent}>
	<div class="flex h-full w-full items-center justify-center">
		<FeatureCardGrid {cards} />
	</div>
</Chat>
