<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	export let title: string;
	export let description: string;
</script>

<div class="flex flex-col gap-4 lg:flex-row">
	<div class="w-full lg:w-[400px]">
		<Card.Root class="p-4">
			<Card.Title>{title}</Card.Title>
			<Card.Description>{description}</Card.Description>
			<Card.Content>
				<slot />
			</Card.Content>
		</Card.Root>
	</div>

	<div class="flex-1">
		<slot name="response" />
	</div>
</div>
