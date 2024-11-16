<script lang="ts">
	import { Command } from '$lib/components/ui/command';
	import { Input } from '$lib/components/ui/input';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import * as lucideIcons from 'lucide-svelte';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let value: string | undefined = undefined;
	export let placeholder = 'Select an icon...';

	const dispatch = createEventDispatcher<{
		select: { value: string };
	}>();

	// Filter out non-icon exports from lucide-svelte
	const icons = Object.entries(lucideIcons).filter(
		([name]) => !['createLucideIcon', 'default'].includes(name)
	);

	let open = false;
	let search = '';

	$: filteredIcons = icons.filter(([name]) => name.toLowerCase().includes(search.toLowerCase()));

	function handleSelect(iconName: string) {
		value = iconName;
		open = false;
		dispatch('select', { value: iconName });
	}
</script>

<Popover.Root bind:open>
	<div class="relative">
		<Popover.Trigger>
			<button
				class={cn(
					'w-full justify-between',
					'inline-flex items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
				)}
			>
				{#if value && lucideIcons[value]}
					<div class="flex items-center gap-2">
						<svelte:component this={lucideIcons[value]} class="h-4 w-4" />
						<span>{value}</span>
					</div>
				{:else}
					<span class="text-muted-foreground">{placeholder}</span>
				{/if}
				<ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</button>
		</Popover.Trigger>
	</div>

	<Popover.Content class="w-[300px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search icons..." bind:value={search} class="h-9" />
			<Command.List>
				<Command.Empty>No icons found.</Command.Empty>
				<div class="max-h-[300px] overflow-auto">
					<div class="grid grid-cols-4 gap-2 p-2">
						{#each filteredIcons as [name, Icon]}
							<button
								class={cn(
									'relative flex flex-col items-center justify-center rounded-md p-2 text-xs hover:bg-accent hover:text-accent-foreground',
									value === name && 'bg-accent text-accent-foreground'
								)}
								on:click={() => handleSelect(name)}
							>
								<Icon class="mb-1 h-5 w-5" />
								<span class="w-full truncate text-center">{name}</span>
								{#if value === name}
									<div class="absolute right-1 top-1">
										<Check class="h-4 w-4" />
									</div>
								{/if}
							</button>
						{/each}
					</div>
				</div>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
