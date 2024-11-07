<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Title } from '$lib/components/ui/sheet';
	import { pageTitle } from '$lib/stores/page';
	import AiAssistantHeader from '$lib/components/ai-assistant-header.svelte';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';

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
		<AiAssistantHeader
			name="Corey"
			seed="corey-------------------"
			description="Your AI-powered marketing assistant. I can help you create engaging LinkedIn posts, plan your content strategy, and design effective email campaigns. Let's work together to grow your brand and engage your audience."
		/>
		<FeatureCardGrid {cards} />
	</div>
</Chat>
