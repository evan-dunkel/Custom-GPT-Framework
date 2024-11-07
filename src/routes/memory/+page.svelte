<script lang="ts">
	import { pageTitle } from '$lib/stores/page';
	import FeatureCardGrid from '$lib/components/feature-card-grid.svelte';
	import { UsersRound } from 'lucide-svelte';
	import AiAssistantHeader from '$lib/components/ai-assistant-header.svelte';
	$pageTitle = 'Memory';

	const agent = {
		name: 'Memory',
		seed: '',
		description:
			'Your AI-powered memory assistant. I can help you add clients to your organization memory.'
	};

	const cards = [
		{
			title: 'Add Client',
			description: 'Add a client to your organization memory.',
			url: '/memory/add-client',
			icon: UsersRound
		}
	];
</script>

<div class="flex w-full flex-col place-items-center">
	<AiAssistantHeader {...agent} />
	<FeatureCardGrid {cards} />
</div>
