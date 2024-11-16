<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { pageTitle } from '$lib/stores/page';
	import * as icons from 'lucide-svelte';

	$pageTitle = 'Admin';

	export let data;
</script>

<div class="p-4">
	<div class="mb-8">
		<h2 class="mb-4 text-2xl font-bold">Add Department</h2>
		<form method="POST" action="?/createDepartment" use:enhance class="max-w-md space-y-4">
			<div>
				<Input name="title" placeholder="Department Title" required />
			</div>
			<div>
				<Input name="description" placeholder="Description" required />
			</div>
			<div>
				<select name="icon" class="w-full rounded border p-2" required>
					{#each Object.keys(icons) as iconName}
						<option value={iconName}>{iconName}</option>
					{/each}
				</select>
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
