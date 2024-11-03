<script lang="ts">
	import '../app.css';
	import * as Sidebar from "$lib/components/ui/sidebar";
	import AppSidebar from "$lib/components/sidebar.svelte";
	import { pageTitle } from '$lib/stores/page';
	import { Toaster } from 'svelte-sonner';
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import * as Button from "$lib/components/ui/button/index.js";
	import { page } from '$app/stores';
	import { ModeWatcher } from "mode-watcher";


	$: pathSegments = $page.url.pathname
		.split('/')
		.filter(Boolean)
		.map((segment) => ({
			label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
			href: '/' + segment
		}));
</script>
<ModeWatcher />
<Toaster />

<div class="flex h-screen">
	<Sidebar.Provider>
		<AppSidebar />
		<main class="flex-1">
			<div class="border-l border-border bg-card h-full flex flex-col flex-1">
				<div class="p-4 border-b border-border flex items-center gap-4">
					<Sidebar.Trigger class="h-8 w-8" />
					<Breadcrumb.Root>
						<Breadcrumb.List>
							<!-- <Breadcrumb.Item>
								<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
							</Breadcrumb.Item> -->
							{#each pathSegments as segment, i}
								<Breadcrumb.Item>
									{#if i === pathSegments.length - 1}
										<Breadcrumb.Page>{segment.label}</Breadcrumb.Page>
									{:else}
										<Breadcrumb.Link href={segment.href}>{segment.label}</Breadcrumb.Link>
									{/if}
								</Breadcrumb.Item>
								<Breadcrumb.Separator />

							{/each}
						</Breadcrumb.List>
					</Breadcrumb.Root>
				</div>
				<slot />
			</div>
		</main>
	</Sidebar.Provider>
</div>