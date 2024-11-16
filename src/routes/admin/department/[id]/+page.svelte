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
			<Input name="url" placeholder="URL Path" required />
			<select name="icon" class="w-full rounded border p-2" required>
				{#each Object.keys(icons) as iconName}
					<option value={iconName}>{iconName}</option>
				{/each}
			</select>
			<Button type="submit">Add Card</Button>
		</form>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.department.cards as card}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<svelte:component this={icons[card.icon]} />
						{card.title}
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<p>{card.description}</p>
					<p class="text-sm text-muted-foreground">URL: {card.url}</p>
				</Card.Content>
				<Card.Footer class="flex justify-end gap-2">
					<form method="POST" action="?/deleteCard" use:enhance>
						<input type="hidden" name="id" value={card.id} />
						<Button variant="destructive" type="submit">Delete</Button>
					</form>
					<a href="/admin/card/{card.id}">
						<Button>Manage Fields</Button>
					</a>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
