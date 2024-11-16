<script lang="ts">
	import type { PageData } from './$types';
	import Chat from '$lib/components/chat.svelte';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';
	import * as icons from 'lucide-svelte';
	import { pageTitle } from '$lib/stores/page';

	export let data: PageData;

	console.log('Page data:', data);

	// Map string icon names to actual Lucide components
	$: cards = data.department.cards.map((card) => ({
		...card,
		icon: icons[card.icon as keyof typeof icons]
	}));

	console.log('Mapped cards with icons:', cards);

	$: $pageTitle = data.department.name;

	const agent = {
		name: data.department.name,
		seed: data.department.name.toLowerCase(),
		description: data.department.description
	};
</script>

<Chat {agent}>
	<div class="flex h-full w-full items-center justify-center">
		<FeatureCardGrid {cards} />
	</div>
</Chat>
