<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	export let cards: {
		title: string;
		description: string;
		url: string;
		icon: any;
	}[];
</script>

<div class="grid w-2/3 grid-cols-2 gap-4">
	{#each cards as card}
		<a href={card.url}>
			<Card.Root class="p-4 {card.url === '#' ? 'text-gray-300' : ''} relative">
				{#if card.url === '#'}
					<div class="absolute inset-0 z-10 flex items-center justify-center">
						<span class="rounded-md px-2 py-1 text-lg font-semibold text-neutral-400/50"
							>In Development</span
						>
					</div>
				{/if}
				<Card.Title class="flex items-center gap-2 {card.url === '#' ? 'blur-[3px]' : ''}">
					<card.icon />
					{card.title}
				</Card.Title>
				<Card.Content class={card.url === '#' ? 'blur-[3px]' : ''}>
					{card.description}
				</Card.Content>
			</Card.Root>
		</a>
	{/each}
</div>
