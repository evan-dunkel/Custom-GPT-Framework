<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	// Add type safety and default value
	$: department = data.department || { cards: [] };

	// Make sure we have the data before trying to access it
	$: cards = department?.cards || [];
</script>

{#if !department}
	<div class="flex h-full items-center justify-center">
		<p class="text-muted-foreground">Loading department...</p>
	</div>
{:else}
	<div class="container mx-auto py-8">
		<h1 class="mb-6 text-3xl font-bold">Edit Cards for {department.title}</h1>

		{#if cards.length === 0}
			<p class="text-muted-foreground">No cards yet. Add some below!</p>
		{:else}
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each cards as card}
					<!-- Your card component here -->
					<div class="card">
						{card.title}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Add card button/form -->
	</div>
{/if}
