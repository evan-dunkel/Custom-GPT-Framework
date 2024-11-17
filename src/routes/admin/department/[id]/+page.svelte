<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as icons from 'lucide-svelte';
	import { useChat } from '@ai-sdk/svelte';
	import { toast } from 'svelte-sonner';
	import { Loader2 } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data;

	let titleInput = '';
	let descriptionInput = '';
	let selectedIcon = '';
	let messageTemplateInput = '';
	let isSubmitting = false;
	let suggestedDescription = '';
	let isGeneratingDescription = false;
	let titleInputElement: HTMLInputElement;
	let descriptionInputElement: HTMLInputElement;

	// Add useChat hooks for description and icon
	const {
		input: descPrompt,
		handleSubmit: handleDescSubmit,
		messages: descMessages
	} = useChat({
		api: '/api/chat',
		onFinish: (message) => {
			suggestedDescription = message.content.trim();
			isGeneratingDescription = false;
			if (descriptionInputElement) {
				descriptionInputElement.placeholder = suggestedDescription;
			}
		},
		onError: () => {
			isGeneratingDescription = false;
			toast.error('Failed to get description suggestion');
		}
	});

	const {
		input: iconPrompt,
		handleSubmit: handleIconSubmit,
		messages: iconMessages
	} = useChat({
		api: '/api/chat',
		onFinish: (message) => {
			const suggestion = message.content.trim();
			console.log('AI Icon Response:', suggestion);

			// Try exact match first
			if (icons[suggestion]) {
				selectedIcon = suggestion;
				toast.success('Icon suggestion applied');
			} else {
				// Extract first word (between first and second capital letter)
				const firstWord = suggestion.match(/[A-Z][a-z]+/)?.[0];

				if (firstWord && icons[firstWord]) {
					selectedIcon = firstWord;
					toast.success('Found icon using simplified name');
				} else {
					toast.error('Could not find a matching icon');
				}
			}
			isSubmitting = false;
		},
		onError: () => {
			toast.error('Failed to get icon suggestion');
			isSubmitting = false;
		}
	});

	// Add handler functions
	async function suggestDescription() {
		if (!titleInput) return;
		isGeneratingDescription = true;
		if (descriptionInputElement) {
			descriptionInputElement.placeholder = 'Generating suggestion...';
		}

		descPrompt.set(
			`Generate an extremely concise, one-line description for a tool or feature titled "${titleInput}" in the context of ${data.department.title} department. Do not repeat the title in the description. Only return the description text, nothing else.`
		);
		await handleDescSubmit();
	}

	async function suggestIcon() {
		if (!titleInput || !descriptionInput) {
			toast.error('Please fill in both title and description first');
			return;
		}

		isSubmitting = true;
		const prompt = `Given this tool - Title: "${titleInput}", Description: "${descriptionInput}" for the ${data.department.title} department.
		Suggest a single appropriate icon name from the Lucide icon set. Only return the exact icon name, nothing else. Icon names must be formatted in UpperCamelCase, without hyphens.`;

		iconPrompt.set(prompt);
		await handleIconSubmit();
	}

	function handleTitleChange() {
		if (titleInput) {
			suggestDescription();
		}
	}

	function handleDescriptionFocus() {
		if (!descriptionInput && suggestedDescription) {
			descriptionInputElement.placeholder = suggestedDescription;
		}
	}

	function handleDescriptionKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			if (!descriptionInput && suggestedDescription) {
				event.preventDefault();
				descriptionInput = suggestedDescription;
			}
			if (titleInput && descriptionInput) {
				suggestIcon();
			}
		}
	}
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Manage Cards for {data.department.title}</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-xl font-bold">Add Card</h2>
		<form method="POST" action="?/createCard" use:enhance class="max-w-md space-y-4">
			<Input
				name="title"
				placeholder="Card Title"
				required
				bind:value={titleInput}
				bind:this={titleInputElement}
				on:change={handleTitleChange}
			/>
			<div class="relative">
				<Textarea
					name="description"
					class="w-full rounded-md border p-2 text-sm shadow-sm"
					placeholder={suggestedDescription || 'Description'}
					required
					bind:value={descriptionInput}
					bind:this={descriptionInputElement}
					on:focus={handleDescriptionFocus}
					on:keydown={handleDescriptionKeyDown}
					rows="3"
				/>
				{#if isGeneratingDescription}
					<div class="absolute right-2 top-2">
						<Loader2 class="h-4 w-4 animate-spin" />
					</div>
				{/if}
			</div>
			<div class="flex gap-2">
				<div class="flex w-full items-center gap-2">
					{#if selectedIcon && icons[selectedIcon]}
						<svelte:component this={icons[selectedIcon]} class="h-6 w-6" />
					{/if}
					<div class="w-full">
						<select
							name="icon"
							class="h-6 w-full rounded-md border p-4 shadow-sm"
							required
							bind:value={selectedIcon}
							placeholder="Select an icon"
						>
							<option value="">Select an icon</option>
							{#each Object.keys(icons) as iconName}
								<option value={iconName}>{iconName}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
			<textarea
				name="messageTemplate"
				class="w-full rounded border p-2"
				placeholder="Enter message template with {'{'}variable{'}'} placeholders"
				rows="4"
				required
				bind:value={messageTemplateInput}
			></textarea>
			<Button type="submit">Add Card</Button>
		</form>
	</div>

	{#if data.department.cards.length > 0}
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.department.cards as card}
				<Card.Root>
					<Card.Header>
						<Card.Title>{card.title}</Card.Title>
						<Card.Description>{card.description}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">Template: {card.messageTemplate}</p>
					</Card.Content>
					<Card.Footer class="flex justify-between">
						<Button variant="outline" href="/admin/department/{data.department.id}/card/{card.id}">
							Manage Fields
						</Button>
						<form method="POST" action="?/deleteCard" use:enhance>
							<input type="hidden" name="id" value={card.id} />
							<Button variant="destructive" type="submit">Delete</Button>
						</form>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{:else}
		<p class="text-muted-foreground">No cards yet. Add one above!</p>
	{/if}
</div>
