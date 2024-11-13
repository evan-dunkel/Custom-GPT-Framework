<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Copy, Pin } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';

	export let messages: Array<{ role: string; content: string }>;

	function copyMessage(content: string) {
		navigator.clipboard
			.writeText(content)
			.then(() => toast.success('Copied to clipboard'))
			.catch(() => toast.error('Failed to copy'));
	}
</script>

<Card.Root class="flex h-full flex-col">
	<div class="flex-1 overflow-auto">
		{#each messages as message}
			<div class="mb-4 {message.role === 'assistant' ? 'pl-4' : 'hidden'}">
				<Card.Content class="flex flex-col items-start justify-start gap-2">
					<div class="flex items-center gap-2">
						<Button>
							<Pin />
							Save to Project
						</Button>
						<button class="m-0 p-0" on:click={() => copyMessage(message.content)}>
							<Button variant="outline" size="default" class="ml-2 hover:opacity-70">
								<Copy class="h-4 w-4" /> Copy
							</Button>
						</button>
					</div>
					<SvelteMarkdown source={message.content} />
				</Card.Content>
			</div>
		{/each}
	</div>
</Card.Root>
