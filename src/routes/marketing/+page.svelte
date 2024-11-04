<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Title } from '$lib/components/ui/sheet';
	import { pageTitle } from '$lib/stores/page';

	import { House, Inbox, Calendar, PencilLine } from 'lucide-svelte';

	$pageTitle = 'Marketing';

	const cards = [
		{
			title: 'LinkedIn Post Generator',
			description:
				'Create engaging LinkedIn posts to showcase your expertise and grow your professional network.',
			url: '/marketing/linkedin-post',
			icon: PencilLine
		},
		{
			title: 'Content Calendar',
			description:
				'Plan and organize your social media content strategy across multiple platforms.',
			url: '#',
			icon: Calendar
		},
		{
			title: 'Email Campaign',
			description:
				'Design effective email marketing campaigns to nurture leads and engage customers.',
			url: '#',
			icon: Inbox
		},
		{
			title: 'Brand Strategy',
			description:
				'Develop a cohesive brand identity and messaging strategy to strengthen market presence.',
			url: '#',
			icon: House
		}
	];
</script>

<Chat>
	<div class="w-full place-items-center">
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
	</div></Chat
>
