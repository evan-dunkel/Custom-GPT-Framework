<script lang="ts">
	// We can add state management and handlers here later
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowUp } from 'lucide-svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	import { useChat } from '@ai-sdk/svelte';
	const { input, handleSubmit, messages } = useChat();

	let position = 'bottom';

	const models = [
		{ value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
		{ value: 'claude-3-opus', label: 'Claude 3 Opus' },
		{ value: 'gpt-4', label: 'GPT-4' },
		{ value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
		{ value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
	];

	let value = '';

	$: triggerContent = models.find((f) => f.value === value)?.label ?? 'Select a model';

	// Add these props
	export let onSubmit: ((message: string) => void) | undefined = undefined;
	export let initialMessage = '';

	// Set initial message if provided
	$input = initialMessage;

	// Create a custom submit handler
	const handleFormSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (onSubmit) {
			onSubmit($input);
		} else {
			await handleSubmit(e);
		}
	};
</script>

<div class="flex flex-1 flex-col gap-4 overflow-auto p-4">
	<slot />
	{#each $messages as message}
		<div class="w-full">
			<Card.Root
				class="{message.role === 'assistant' ? 'justify-self-start' : 'justify-self-end'} w-3/5"
			>
				<Card.Content>
					<p class="text-sm font-medium text-muted-foreground">{message.role}</p>
					<p class="text-md font-normal">{message.content}</p>
				</Card.Content>
			</Card.Root>
		</div>
	{/each}
	<!-- testing -->
	<!-- <div class="w-full">
            <Card.Root class="{'assistant' === 'assistant' ? 'justify-self-start' : 'justify-self-end'} w-3/5">
                <Card.Content>
                    <p class="text-sm font-medium text-muted-foreground">assistant</p>
                    <p class="text-md font-normal ">Hello! How can I help you today?</p>
                </Card.Content>
            </Card.Root>
        </div>
        <div class="w-full">
        <Card.Root class="{'user' === 'assistant' ? 'justify-self-start' : 'justify-self-end'} w-3/5">
            <Card.Content>
                <p class="text-sm font-medium text-muted-foreground">user</p>
                <p class="text-md font-normal ">Hey, I just need help with...</p>
            </Card.Content>
        </Card.Root>
        </div> -->
</div>

<div class="flex flex-col gap-2 border-t border-border px-4 py-4">
	<form class="flex items-center gap-2" on:submit={handleSubmit}>
		<Input bind:value={$input} />
		<Button variant="default" size="icon" type="submit">
			<ArrowUp />
		</Button>
	</form>

	<div class="">
		<Select.Root type="single" name="favoriteFruit" bind:value>
			<Select.Trigger class="w-[180px]">
				{triggerContent}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Models</Select.GroupHeading>
					{#each models as model}
						<Select.Item value={model.value} label={model.label}>{model.label}</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</div>
