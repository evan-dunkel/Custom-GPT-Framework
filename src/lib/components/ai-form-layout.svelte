<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	export let title: string;
	export let description: string;
</script>

<div class="flex h-full">
	<div class="w-[400px] p-4">
		<Card.Root class="flex flex-col gap-4 p-4">
			<Card.Title>{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
			<Card.Content class="min-w-0">
				<slot />
			</Card.Content>
		</Card.Root>
	</div>

	<div class="flex-1 p-4">
		<slot name="response" />
	</div>
</div>
