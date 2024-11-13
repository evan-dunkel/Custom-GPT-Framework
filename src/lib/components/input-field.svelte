<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';
	import SuggestionScroll from './suggestion-scroll.svelte';

	export let label: string;
	export let value: string;
	export let placeholder: string;
	export let suggestions: Array<string | { label: string; value: string }> = [];
</script>

<div class="min-w-0 space-y-1">
	<label for={label} class="text-sm font-medium">{label}</label>
	<Textarea id={label} {placeholder} bind:value class="w-full resize-none" />
	<SuggestionScroll {suggestions} onSelect={(suggestion) => (value = suggestion)} />
</div>
