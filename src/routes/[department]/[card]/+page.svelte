<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import { pageTitle } from '$lib/stores/page';
	import AiForm from '$lib/components/ai-form.svelte';

	export let data;

	$pageTitle = data.card.title;

	const agent = {
		name: data.card.department.title === 'Marketing' ? 'Corey' : 'Taylor',
		seed: data.card.department.title === 'Marketing' ? 'corey-------------------' : 'Sophia',
		description: `Your AI-powered assistant for ${data.card.title.toLowerCase()}.`
	};
</script>

<Chat {agent}>
	<div class="flex h-full w-full items-center justify-center">
		<AiForm
			title={data.card.title}
			description={data.card.description}
			fields={data.card.fields}
			messageTemplate={(values) => `Please help with ${data.card.title}: ${JSON.stringify(values)}`}
		/>
	</div>
</Chat>
