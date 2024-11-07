<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Title } from '$lib/components/ui/sheet';
	import { pageTitle } from '$lib/stores/page';

	import { House, Inbox, Calendar, Signature } from 'lucide-svelte';
	import AiAvatar from '$lib/components/ai-avatar.svelte';
	import AiAssistantHeader from '$lib/components/ai-assistant-header.svelte';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';

	$pageTitle = 'Sales';

	const agent = {
		name: 'Taylor',
		seed: 'Sophia',
		description:
			"Your AI-powered sales companion. I can help you create contracts, manage client relationships, and optimize your sales pipeline. Let's work together to grow your business and close more deals."
	};

	const cards = [
		{
			title: 'Create a Contract',
			description:
				'Get help drafting and reviewing sales contracts to ensure compliance and protect your business.',
			url: '/sales/new-contract',
			icon: Signature
		},
		{
			title: 'New Client',
			description:
				'Get help reaching out to new clients to introduce your services and establish relationships.',
			url: '#',
			icon: House
		},
		{
			title: 'Client Retention',
			description:
				'Get help reaching out to existing clients to maintain relationships and ensure continued business.',
			url: '#',
			icon: Inbox
		},
		{
			title: 'Sales Pipeline',
			description:
				'Get help managing your sales pipeline to identify and prioritize opportunities.',
			url: '#',
			icon: Calendar
		}
	];
</script>

<Chat {agent}>
	<div class="w-full place-items-center">
		<AiAssistantHeader {...agent} />
		<FeatureCardGrid {cards} />
	</div>
</Chat>
