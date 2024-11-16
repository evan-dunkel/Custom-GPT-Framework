<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Title } from '$lib/components/ui/sheet';
	import { pageTitle } from '$lib/stores/page';
	import AiAssistantHeader from '$lib/components/ai-assistant-header.svelte';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';

	import { House, Inbox, Target, PencilLine } from 'lucide-svelte';

	$pageTitle = 'Marketing';

	const agent = {
		name: 'Corey',
		seed: 'corey-------------------',
		description:
			"Your AI-powered marketing assistant. I can help you create engaging LinkedIn posts, plan your content strategy, and design effective email campaigns. Let's work together to grow your brand and engage your audience."
	};

	const cards = [
		{
			title: 'LinkedIn Post Generator',
			description: 'Create engaging LinkedIn posts to grow your professional network.',
			url: '/marketing/linkedin-post',
			icon: PencilLine
		},
		{
			title: 'Email Subject Lines',
			description:
				'Craft compelling email subject lines that boost open rates and drive engagement.',
			url: '/marketing/email-subject',
			icon: Inbox
		},
		{
			title: 'Generate SEO Plan',
			description:
				'Optimize your website content with targeted keywords to boost visibility and attract more organic traffic.',
			url: '/marketing/seo',
			icon: Target
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

<Chat {agent}>
	<div class="flex h-full w-full items-center justify-center">
		<FeatureCardGrid {cards} />
	</div>
</Chat>
