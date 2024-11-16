<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { extractVariables } from '$lib/utils';

	export let data;

	const fieldTypes = ['text', 'textarea', 'number', 'email', 'tel', 'date', 'checkbox', 'select'];

	$: templateVariables = extractVariables(data.card?.messageTemplate || '');
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Manage Fields for {data.card.title}</h1>
	<p class="mb-4 text-muted-foreground">Department: {data.card.department.title}</p>

	<div class="mb-8">
		<h2 class="mb-4 text-xl font-bold">Template Variables</h2>
		<div class="grid gap-4">
			{#each templateVariables as varName}
				<form method="POST" action="?/createField" use:enhance class="max-w-md space-y-4">
					<input type="hidden" name="name" value={varName} />
					<div>
						<Label for="placeholder-{varName}">Placeholder for {varName}</Label>
						<Input
							id="placeholder-{varName}"
							name="placeholder"
							placeholder="Enter placeholder text"
							required
						/>
					</div>
					<div>
						<Label for="type-{varName}">Field Type</Label>
						<select id="type-{varName}" name="type" class="w-full rounded border p-2" required>
							{#each fieldTypes as type}
								<option value={type}>{type}</option>
							{/each}
						</select>
					</div>
					<div class="flex items-center gap-2">
						<Checkbox id="required-{varName}" name="required" value="true" />
						<Label for="required-{varName}">Required Field</Label>
					</div>
					<Button type="submit">Add Field for {varName}</Button>
				</form>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-4 text-xl font-bold">Current Fields</h2>
		<div class="grid gap-4">
			{#each data.card.fields as field}
				<Card.Root>
					<Card.Header>
						<Card.Title>{field.label}</Card.Title>
						<Card.Description>Type: {field.type}</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>Placeholder: {field.placeholder}</p>
						<p>Required: {field.required ? 'Yes' : 'No'}</p>
					</Card.Content>
					<Card.Footer class="flex justify-end">
						<form method="POST" action="?/deleteField" use:enhance>
							<input type="hidden" name="id" value={field.id} />
							<Button variant="destructive" type="submit">Delete</Button>
						</form>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</div>
