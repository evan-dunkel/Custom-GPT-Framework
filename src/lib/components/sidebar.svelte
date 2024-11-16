<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Tabs from '$lib/components/ui/tabs';
	import TeamSwitcher from './team-switcher.svelte';
	import { Sparkles } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { sidebarOpen } from '$lib/stores/sidebar';
	import * as icons from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data = { departments: [] };

	console.log('Sidebar departments:', data.departments);

	const teams = [
		{
			name: 'AI Hub',
			logo: Sparkles
		}
	];

	function handleMenuItemClick() {
		sidebarOpen.set(false);
	}

	// Helper function to check if a link is active
	$: isCurrentPage = (url: string) => {
		if (url === '/admin') {
			// Check if current path starts with /admin
			return $page.url.pathname.startsWith('/admin');
		}
		// For other routes, exact match
		return $page.url.pathname === url;
	};
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
					<Sidebar.Menu>
						{#if data.departments && Array.isArray(data.departments) && data.departments.length > 0}
							{#each data.departments as dept}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={isCurrentPage(dept.url)}>
										<a
											href={dept.url}
											class="flex w-full items-center gap-2 px-2 py-1.5"
											on:click={handleMenuItemClick}
										>
											{#if dept.icon && icons[dept.icon]}
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
							<Sidebar.MenuButton isActive={isCurrentPage('/admin')}>
								<a
									href="/admin"
									class="flex w-full items-center gap-2 px-2 py-1.5"
									on:click={handleMenuItemClick}
								>
									<Sparkles class="h-4 w-4" />
									<span>Admin</span>
								</a>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					</Sidebar.Menu>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar.Root>
	</Sidebar.Provider>
</div>

<style>
	/* Remove default list styling */
	:global([data-sidebar='menu']) {
		list-style: none !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	/* Make the entire button area clickable */
	:global([data-sidebar='menu-button']) {
		width: 100%;
		cursor: pointer;
	}

	/* Style the links to take full width */
	:global([data-sidebar='menu']) a {
		display: flex;
		width: 100%;
		text-decoration: none;
		color: inherit;
	}

	/* Add hover effect */
	:global([data-sidebar='menu']) a:hover {
		background-color: var(--sidebar-accent);
		border-radius: theme('borderRadius.md');
	}

	/* Add styles for active state */
	:global([data-sidebar='menu-item'][data-state='active']) {
		background-color: var(--sidebar-accent);
		border-radius: theme('borderRadius.md');
	}

	/* Optional: Style the active link differently */
	:global([data-sidebar='menu-item'][data-state='active']) a {
		font-weight: 500;
	}
</style>
