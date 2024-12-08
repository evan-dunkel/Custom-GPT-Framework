<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { useChat } from '@ai-sdk/svelte';
	import { toast } from 'svelte-sonner';
	import InputField from './input-field.svelte';
	import AIResponseCard from './ai-response-card.svelte';
	import AiFormLayout from './ai-form-layout.svelte';

	export let title: string;
	export let description: string;
	export let fields: Array<{
		label: string;
		placeholder: string;
		suggestions?: Array<string | { label: string; value: string }>;
	}>;
	export let messageTemplate: (values: Record<string, string>) => string;

	let values: Record<string, string> = {};
	let isSubmitting = false;

	const { input, handleSubmit, messages, stop } = useChat({
		api: '/api/chat',
		onFinish: () => {
			isSubmitting = false;
		},
		onError: () => {
			isSubmitting = false;
			toast.error('Failed to generate response');
		}
	});

	async function handleFormSubmit() {
		const emptyFields = fields.filter((field) => !values[field.label]);
		if (emptyFields.length > 0) {
			toast.error(`Please fill in: ${emptyFields.map((f) => f.label).join(', ')}`);
			return;
		}

		isSubmitting = true;
		try {
			$input = messageTemplate(values);
			await handleSubmit();
		} catch (error) {
			console.error('Form submission error:', error);
			toast.error('Failed to submit form');
			isSubmitting = false;
		}
	}

	function handleCancel() {
		stop();
		isSubmitting = false;
		toast.success('Generation cancelled');
	}
</script>

<AiFormLayout {title} {description}>
	<form on:submit|preventDefault={handleFormSubmit} class="flex w-full flex-col gap-2">
		<fieldset class="w-full min-w-0 space-y-2">
			{#each fields as field}
				<InputField
					label={field.label}
					bind:value={values[field.label]}
					placeholder={field.placeholder}
					suggestions={field.suggestions ?? []}
				/>
			{/each}
		</fieldset>
		<div class="flex w-full gap-2">
			{#if isSubmitting}
				<Button type="button" on:click={handleCancel}>Cancel Generation</Button>
				<Button type="submit" disabled>Generating...</Button>
			{:else}
				<Button type="submit" class="w-full">Generate</Button>
			{/if}
		</div>
	</form>

	<svelte:fragment slot="response">
		<AIResponseCard messages={$messages} />
	</svelte:fragment>
</AiFormLayout>
