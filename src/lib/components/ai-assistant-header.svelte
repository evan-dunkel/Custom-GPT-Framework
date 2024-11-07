<script lang="ts">
	export let name: string;
	export let seed: string;
	export let description: string;

	import AiAvatar from '$lib/components/ai-avatar.svelte';
</script>

<div class="mb-12 flex flex-col items-center gap-8">
	<AiAvatar class="h-48 w-48" {seed} />
	<div class="">
		<h1 class="mb-4 text-center text-3xl font-bold">{name}</h1>
		<p class="max-w-2xl text-pretty text-left text-muted-foreground">
			{description}
		</p>
	</div>
</div>
