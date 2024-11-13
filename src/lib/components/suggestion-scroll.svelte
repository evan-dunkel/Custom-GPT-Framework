<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let suggestions: Array<string | { label: string; value: string }>;
	export let onSelect: (value: string) => void;

	let mounted = false;
	let showAll = false;
	let containerRef: HTMLDivElement;

	// Let's show 6 items initially (roughly 2 rows worth)
	$: firstTwoRows = suggestions.slice(0, 3);
	$: remainingItems = suggestions.slice(3);

	onMount(() => {
		mounted = true;

		const resizeObserver = new ResizeObserver(() => {
			calculateRows();
		});

		if (containerRef) {
			resizeObserver.observe(containerRef);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});

	function getValue(suggestion: string | { label: string; value: string }): string {
		return typeof suggestion === 'string' ? suggestion : suggestion.value;
	}

	function getLabel(suggestion: string | { label: string; value: string }): string {
		return typeof suggestion === 'string' ? suggestion : suggestion.label;
	}
</script>

<div class="overflow-x-auto text-sm" bind:this={containerRef}>
	<div class="flex flex-wrap gap-1 pb-2 pt-1">
		{#if mounted}
			{#each firstTwoRows as suggestion, i (getValue(suggestion))}
				<div in:fly={{ x: 20, duration: 200, delay: i * 50 }} out:fade={{ duration: 150 }}>
					<button
						class="shrink-0 whitespace-nowrap rounded-full border p-1 px-2 hover:bg-secondary"
						on:click|preventDefault={() => onSelect(getValue(suggestion))}
					>
						{getLabel(suggestion)}
					</button>
				</div>
			{/each}

			{#if showAll && remainingItems.length > 0}
				{#each remainingItems as suggestion, i (getValue(suggestion))}
					<div
						in:fly={{ x: 20, duration: 200, delay: (i + firstTwoRows.length) * 50 }}
						out:fade={{ duration: 150 }}
					>
						<button
							class="shrink-0 whitespace-nowrap rounded-full border p-1 px-2 hover:bg-secondary"
							on:click|preventDefault={() => onSelect(getValue(suggestion))}
						>
							{getLabel(suggestion)}
						</button>
					</div>
				{/each}
			{/if}

			{#if remainingItems.length > 0}
				<button
					class="shrink-0 whitespace-nowrap rounded-full border p-1 px-2 text-primary/60 hover:bg-secondary"
					on:click|preventDefault={() => (showAll = !showAll)}
				>
					{showAll ? 'Show less...' : 'Show more...'}
				</button>
			{/if}
		{/if}
	</div>
</div>
