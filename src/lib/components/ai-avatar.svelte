<script lang="ts">
	export let seed: string;
	export let size: string = 'h-48 w-48';
</script>

<div class="relative {size} rounded-full bg-primary/10">
	<img
		src="https://api.dicebear.com/9.x/lorelei/svg?seed={seed}"
		alt="AI Assistant Illustration"
		class="absolute inset-0 h-full w-full"
	/>
</div>
