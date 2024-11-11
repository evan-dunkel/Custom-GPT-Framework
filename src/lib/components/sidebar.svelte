<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/stores';
	import { chats, createChat, deleteChat } from '$lib/stores/chats';
	import { goto } from '$app/navigation';
	import {
		Trash,
		Brain,
		MessageSquare,
		Sparkles,
		Plus,
		House,
		Inbox,
		Calendar,
		Search,
		BriefcaseBusiness,
		Settings
	} from 'lucide-svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';

	// Menu items.
	const items = [
		{
			title: 'Accounting',
			url: '#',
			icon: House
		},
		{
			title: 'Marketing',
			url: '/marketing',
			icon: Inbox
		},
		{
			title: 'Sales',
			url: '/sales',
			icon: Calendar
		},
		{
			title: 'Support',
			url: '#',
			icon: Search
		},
		{
			title: 'Setup',
			url: '/setup',
			icon: Settings
		}
	];

	// Check if the current path starts with the menu item's URL
	$: isActive = (itemUrl: string) => {
		return $page.url.pathname.startsWith(itemUrl);
	};

	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'AI Hub',
				logo: Sparkles
				// plan: 'Enterprise'
			}
		]
	};

	function handleAddChat() {
		console.log('clicked');
		const newChatId = createChat();
		goto(`/chat/${newChatId}`);
	}

	function handleMenuItemClick() {
		sidebarOpen.set(false);
	}
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Tabs.Root value="team" class="w-full">
				<Tabs.List class="w-full">
					<Tabs.Trigger class="w-full" value="team">Team</Tabs.Trigger>
					<Tabs.Trigger class="w-full" value="personal">Personal</Tabs.Trigger>
				</Tabs.List>
				<!-- <Tabs.Content value="team">
            Make changes to your account here.
          </Tabs.Content>
          <Tabs.Content value="personal">
            Change your password here.
          </Tabs.Content> -->
			</Tabs.Root>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Chats</Sidebar.GroupLabel>
			<Sidebar.GroupAction title="Add Chat" on:click={handleAddChat}>
				<Plus /> <span class="sr-only">Add Chat</span>
			</Sidebar.GroupAction>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each $chats as chat (chat.id)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								<!-- <Collapsible.Trigger> -->
								{#snippet child({ props })}
									<a href="/chat/{chat.id}" {...props} class="flex items-center justify-between">
										<div class="flex items-center gap-2">
											<MessageSquare class="h-4 w-4" />
											<span>{chat.title}</span>
										</div>
										<button
											class="opacity-0 transition-opacity group-hover/menu-item:opacity-100"
											on:click|preventDefault={() => deleteChat(chat.id)}
										>
											<Trash class="h-4 w-4" />
										</button>
									</a>
								{/snippet}
								<!-- </Collapsible.Trigger> -->
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
			<Sidebar.GroupAction title="Add Project">
				<Plus /> <span class="sr-only">Add Project</span>
			</Sidebar.GroupAction>
			<Sidebar.GroupContent />
		</Sidebar.Group>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Departments</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton isActive={isActive(item.url)}>
								{#snippet child({ props })}
									<a href={item.url} {...props} on:click={handleMenuItemClick}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<ThemeSwitcher />
	</Sidebar.Footer>
</Sidebar.Root>
