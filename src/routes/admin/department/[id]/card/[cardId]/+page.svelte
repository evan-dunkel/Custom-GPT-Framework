<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { extractVariables } from '$lib/utils';
	import * as icons from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data;

	let messageTemplate = data.card.messageTemplate || '';
	let editingPlaceholder: string | null = null;

	// Initialize fieldStates with database values
	let fieldStates = new Map(
		data.card.fields.map((field) => [
			field.label,
			{
				id: field.id,
				label: field.label,
				placeholder: field.placeholder,
				type: field.type,
				required: field.required,
				suggestions: field.suggestions,
				cardId: field.cardId
			}
		])
	);

	// Initialize templateVariables
	let templateVariables: string[] = [];

	// Update templateVariables whenever messageTemplate changes
	$: {
		const newVariables = extractVariables(messageTemplate);

		// Remove fields that are no longer in template variables
		for (const [label] of fieldStates) {
			if (!newVariables.includes(label)) {
				fieldStates.delete(label);
			}
		}

		templateVariables = newVariables;
		fieldStates = fieldStates; // Trigger reactivity
	}

	function handleCheckboxChange(checked: boolean, varName: string) {
		if (!checked) {
			fieldStates.delete(varName);
		} else {
			const existingField = data.card.fields.find((f) => f.label === varName);
			fieldStates.set(
				varName,
				existingField || {
					id: crypto.randomUUID(),
					label: varName,
					placeholder: `Enter ${varName.toLowerCase().replace(/_/g, ' ')}`,
					type: 'text',
					required: false,
					suggestions: [],
					cardId: data.card.id
				}
			);
		}
		fieldStates = fieldStates; // Trigger reactivity
	}

	function updateFieldProperty(varName: string, property: string, value: any) {
		if (fieldStates.has(varName)) {
			const field = fieldStates.get(varName);
			fieldStates.set(varName, { ...field, [property]: value });
			fieldStates = fieldStates; // Trigger reactivity
		}
	}

	function autoResize(e: Event) {
		const textarea = e.target as HTMLTextAreaElement;
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	// Get the department ID from the current URL
	$: departmentId = data.card.department.id;
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Manage Card: {data.card.title}</h1>
	<p class="mb-4 text-muted-foreground">Department: {data.card.department.title}</p>

	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Card Details Section -->
		<Card.Root class="flex flex-col">
			<Card.Header>
				<Card.Title>Card Details</Card.Title>
				<Card.Description>Update card information</Card.Description>
			</Card.Header>
			<Card.Content class="flex-grow">
				<form
					method="POST"
					action="?/updateCard"
					use:enhance={({ formData }) => {
						// Set all form values
						formData.set('title', data.card.title);
						formData.set('description', data.card.description);
						formData.set('icon', data.card.icon);
						formData.set('messageTemplate', messageTemplate);

						// Convert fieldStates to array and set fields
						const fields = Array.from(fieldStates.values());
						formData.set('fields', JSON.stringify(fields));

						return async ({ result }) => {
							if (result.type === 'success') {
								goto(`/admin/department/${departmentId}`);
							}
						};
					}}
					class="space-y-4"
				>
					<div>
						<Label for="title">Title</Label>
						<Input id="title" name="title" bind:value={data.card.title} required />
					</div>
					<div>
						<Label for="description">Description</Label>
						<Input
							id="description"
							name="description"
							bind:value={data.card.description}
							required
						/>
					</div>
					<div>
						<Label for="icon">Icon</Label>
						<select
							id="icon"
							name="icon"
							placeholder="Select an icon"
							class="w-full rounded border p-2"
							bind:value={data.card.icon}
							required
						>
							{#each Object.keys(icons) as iconName}
								<option value={iconName}>{iconName}</option>
							{/each}
						</select>
					</div>
					<div>
						<Label for="messageTemplate">Message Template</Label>
						<textarea
							id="messageTemplate"
							name="messageTemplate"
							class="min-h-[200px] w-full rounded border p-2"
							rows="8"
							bind:value={messageTemplate}
							on:input={autoResize}
							required
						></textarea>
					</div>
					<Button type="submit">Update Card Fields</Button>
				</form>
			</Card.Content>
		</Card.Root>

		<!-- Fields Management Section -->
		<Card.Root>
			<Card.Header>
				<Card.Title>Field Management</Card.Title>
				<Card.Description>Configure input fields for your template variables</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					{#each templateVariables as varName (varName)}
						{@const field = fieldStates.get(varName)}
						{@const isEnabled = !!field}

						<Card.Root class="group/card">
							<Card.Header class="space-y-2">
								<div class="flex items-center gap-2">
									<Checkbox
										checked={isEnabled}
										onCheckedChange={(checked) => handleCheckboxChange(checked, varName)}
									/>
									<div>
										<Card.Title>{varName}</Card.Title>
										<Card.Description>
											{#if isEnabled}
												Text field
											{:else}
												Not configured
											{/if}
										</Card.Description>
									</div>
								</div>
							</Card.Header>
							<Card.Content>
								{#if isEnabled}
									<div class="space-y-4">
										{#if editingPlaceholder === varName}
											<div class="flex items-center gap-2">
												<Label for="placeholder-{varName}">Placeholder</Label>
												<Input
													id="placeholder-{varName}"
													value={field.placeholder}
													on:input={(e) =>
														updateFieldProperty(varName, 'placeholder', e.currentTarget.value)}
													on:blur={() => (editingPlaceholder = null)}
													autofocus
												/>
											</div>
										{:else}
											<div>
												<Label for="placeholder-{varName}">Placeholder</Label>
												<Button
													type="button"
													variant="ghost"
													class="cursor-pointer rounded p-2 hover:bg-muted"
													on:click={() => (editingPlaceholder = varName)}
												>
													{field.placeholder}
												</Button>
											</div>
										{/if}
										<div class="flex items-center gap-2">
											<Checkbox
												id="required-{varName}"
												checked={field.required}
												onCheckedChange={(checked) =>
													updateFieldProperty(varName, 'required', checked)}
											/>
											<Label for="required-{varName}">Required Field</Label>
										</div>
									</div>
								{:else}
									<p class="text-sm text-muted-foreground">
										Enable this field to configure its properties
									</p>
								{/if}
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
