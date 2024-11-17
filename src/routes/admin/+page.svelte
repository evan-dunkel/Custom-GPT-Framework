<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { pageTitle } from '$lib/stores/page';
	import * as icons from 'lucide-svelte';
	import { useChat } from '@ai-sdk/svelte';
	import { toast } from 'svelte-sonner';
	import { Loader2 } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	$pageTitle = 'Admin';

	export let data;

	let selectedIcon = '';
	let titleInput = '';
	let descriptionInput = '';
	let isSubmitting = false;
	let suggestedDescription = '';
	let isGeneratingDescription = false;
	let titleInputElement: HTMLInputElement;
	let descriptionInputElement: HTMLInputElement;
	let iconSearch = '';

	const {
		input: iconPrompt,
		handleSubmit: handleIconSubmit,
		messages: iconMessages
	} = useChat({
		api: '/api/chat',
		onFinish: (message) => {
			const suggestion = message.content.trim();
			console.log('AI Icon Response:', suggestion);

			// Always set the raw suggestion in the search box
			iconSearch = suggestion;

			// Try exact match first
			if (icons[suggestion]) {
				selectedIcon = suggestion;
				toast.success('Icon suggestion applied');
			} else {
				// Try partial match
				const normalizedSuggestion = suggestion.toLowerCase().replace(/[-\s]/g, '');
				const matchingIcon = Object.keys(icons).find(
					(iconName) =>
						iconName.toLowerCase().includes(normalizedSuggestion) ||
						normalizedSuggestion.includes(iconName.toLowerCase())
				);

				if (matchingIcon) {
					selectedIcon = matchingIcon;
					toast.success('Similar icon found and applied');
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

	async function suggestDescription() {
		if (!titleInput) return;
		console.log('Suggesting description for:', titleInput);

		isGeneratingDescription = true;
		if (descriptionInputElement) {
			descriptionInputElement.placeholder = 'Generating suggestion...';
		}

		descPrompt.set(
			`Generate an extremely concise, one-line description for a company department titled "${titleInput}" in the context of a digital tool dashboard. Do not repeat the title or word departmentin the description. Only return the description text, nothing else.`
		);
		await handleDescSubmit();
	}

	function handleTitleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			event.preventDefault();
			descriptionInputElement?.focus();
		}
	}

	function handleTitleChange() {
		console.log('Title changed:', titleInput);

		if (titleInput) {
			suggestDescription();
		}
	}

	function handleDescriptionFocus() {
		if (!descriptionInput && suggestedDescription) {
			console.log('Description focused:', suggestedDescription);

			descriptionInputElement.placeholder = suggestedDescription;
		}
	}

	function handleDescriptionKeyDown(event: KeyboardEvent) {
		if (event.key === 'Tab') {
			if (!descriptionInput && suggestedDescription) {
				event.preventDefault();
				descriptionInput = suggestedDescription;
			}
			// After handling the suggestion, trigger icon suggestion
			if (titleInput && descriptionInput) {
				suggestIcon();
			}
		}
	}

	async function suggestIcon() {
		if (!titleInput || !descriptionInput) {
			toast.error('Please fill in both title and description first');
			return;
		}

		isSubmitting = true;
		const prompt = `Given this department - Title: "${titleInput}", Description: "${descriptionInput}"
		Suggest a single appropriate icon name from the Lucide icon set. Only return the exact icon name, nothing else. Icon names must be formatted in UpperCamelCase, without hyphens.`;

		console.log('Prompt:', prompt);
		iconPrompt.set(prompt);

		await handleIconSubmit();
	}

	function handleIconSearchChange() {
		// Try exact match first
		if (icons[iconSearch]) {
			selectedIcon = iconSearch;
		} else {
			// Try to find first matching icon that starts with the search term
			const matchingIcon = Object.keys(icons).find((iconName) =>
				iconName.toLowerCase().startsWith(iconSearch.toLowerCase())
			);
			if (matchingIcon) {
				selectedIcon = matchingIcon;
			}
		}
	}
</script>

<div class="p-4">
	<div class="mb-8">
		<h2 class="mb-4 text-2xl font-bold">Add Department</h2>
		<form method="POST" action="?/createDepartment" use:enhance class="max-w-md space-y-4">
			<div>
				<Input
					name="title"
					placeholder="Department Title"
					required
					bind:value={titleInput}
					bind:this={titleInputElement}
					on:change={handleTitleChange}
				/>
			</div>
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
					<div class="w-full space-y-2">
						<Input
							name="iconSearch"
							bind:value={iconSearch}
							on:input={handleIconSearchChange}
							placeholder="Search icons..."
						/>
						<select
							name="icon"
							class="h-6 w-full rounded-md border p-4 shadow-sm"
							required
							bind:value={selectedIcon}
						>
							{#each Object.keys(icons).filter((iconName) => iconName
									.toLowerCase()
									.startsWith(iconSearch.toLowerCase())) as iconName}
								<option value={iconName}>{iconName}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
			<Button type="submit">Add Department</Button>
		</form>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.departments as dept}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<svelte:component this={icons[dept.icon]} />
						{dept.title}
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>{dept.description}</p>
					<p class="text-sm text-muted-foreground">URL: {dept.url}</p>
				</Card.Content>
				<Card.Footer class="flex justify-end gap-2">
					<form method="POST" action="?/deleteDepartment" use:enhance>
						<input type="hidden" name="id" value={dept.id} />
						<Button variant="destructive" type="submit">Delete</Button>
					</form>
					<a href="/admin/department/{dept.id}">
						<Button>Manage Cards</Button>
					</a>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
