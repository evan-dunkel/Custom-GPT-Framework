<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/sidebar.svelte';
	import { pageTitle } from '$lib/stores/page';

	export let data;
</script>

<div class="flex h-screen">
	<Sidebar {data} />

	<main class="flex-1 overflow-auto">
		<slot />
	</main>
</div>
