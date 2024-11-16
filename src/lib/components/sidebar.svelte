<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Tabs from '$lib/components/ui/tabs';
	import TeamSwitcher from './team-switcher.svelte';
	import { Sparkles } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { sidebarOpen } from '$lib/stores/sidebar';
	import * as icons from 'lucide-svelte';

	export let data = { departments: [] };

	const teams = [
		{
			name: 'AI Hub',
			logo: Sparkles
		}
	];

	function handleMenuItemClick() {
		sidebarOpen.set(false);
	}
</script>

<div class="w-[250px]">
	<Sidebar.Provider>
		<Sidebar.Root>
			<Sidebar.Header>
				<TeamSwitcher {teams} />
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Tabs.Root value="team" class="w-full">
						<Tabs.List class="w-full">
							<Tabs.Trigger class="w-full" value="team">Team</Tabs.Trigger>
							<Tabs.Trigger class="w-full" value="personal">Personal</Tabs.Trigger>
						</Tabs.List>
					</Tabs.Root>
				</Sidebar.Group>

				<Sidebar.Group>
					<Sidebar.GroupLabel>Departments</Sidebar.GroupLabel>
					{#if data.departments && data.departments.length > 0}
						{#each data.departments as dept}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									<a href={dept.url} class="flex items-center gap-2" on:click={handleMenuItemClick}>
										{#if icons[dept.icon]}
											<svelte:component this={icons[dept.icon]} class="h-4 w-4" />
										{/if}
										<span>{dept.title}</span>
									</a>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					{:else}
						<div class="px-3 py-2 text-sm text-muted-foreground">
							No departments yet. Add one from the admin panel.
						</div>
					{/if}

					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<a href="/admin" class="flex items-center gap-2" on:click={handleMenuItemClick}>
								<Sparkles class="h-4 w-4" />
								<span>Admin</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar.Root>
	</Sidebar.Provider>
</div>
