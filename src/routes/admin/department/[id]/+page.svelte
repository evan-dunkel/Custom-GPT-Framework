<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as icons from 'lucide-svelte';

	export let data;
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Manage Cards for {data.department.title}</h1>

	<div class="mb-8">
		<h2 class="mb-4 text-xl font-bold">Add Card</h2>
		<form method="POST" action="?/createCard" use:enhance class="max-w-md space-y-4">
			<Input name="title" placeholder="Card Title" required />
			<Input name="description" placeholder="Description" required />
			<select name="icon" class="w-full rounded border p-2" required>
				{#each Object.keys(icons) as iconName}
					<option value={iconName}>{iconName}</option>
				{/each}
			</select>
			<textarea
				name="messageTemplate"
				class="w-full rounded border p-2"
				placeholder="Enter message template with {'{'}variable{'}'} placeholders"
				rows="4"
				required
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
