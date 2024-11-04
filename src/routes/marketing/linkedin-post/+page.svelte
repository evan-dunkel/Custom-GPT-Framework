<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import { pageTitle } from '$lib/stores/page';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';
	import { useChat } from '@ai-sdk/svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';
	import { Copy, Pin } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { onMount, tick } from 'svelte';

	$pageTitle = 'LinkedIn Post Generator';

	let topic = '';
	let audience = '';

	$: message = `Content Brief Generator
You are an AI Research Analyst specializing in conducting in-depth internet research and generating comprehensive content briefs tailored to specific topics, audiences, and objectives.

TOPIC: ${topic}
AUDIENCE: ${audience}`;

	const { input, handleSubmit, messages } = useChat();

	function handleFormSubmit() {
		if (message && topic && audience) {
			$input = message;
			handleSubmit();
		} else {
			toast.error('Please fill in both topic and audience fields');
		}
	}

	function copyMessage(content: string) {
		navigator.clipboard
			.writeText(content)
			.then(() => toast.success('Copied to clipboard'))
			.catch(() => toast.error('Failed to copy'));
	}

	// Example topics for quick selection
	const topicSuggestions = [
		'Industry Trends 2024',
		'Professional Development',
		'Leadership Insights',
		'Innovation in Tech'
	];

	// Example audiences for quick selection
	const audienceSuggestions = [
		'Tech Professionals',
		'Business Leaders',
		'Startup Founders',
		'Marketing Managers'
	];

	let mounted = false;

	onMount(async () => {
		await tick();
		mounted = true;
	});
</script>

<div class="flex h-full">
	<div class="w-[400px] p-4">
		<Card.Root class="flex flex-col gap-4 overflow-hidden p-4">
			<Card.Title>LinkedIn Post Generator</Card.Title>
			<Card.Description
				>Generate engaging LinkedIn content based on your topic and target audience.</Card.Description
			>
			<Card.Content class="w-full">
				<form on:submit|preventDefault={handleFormSubmit} class="flex w-full flex-col gap-2">
					<fieldset class="w-[20px] space-y-2">
						<div class="space-y-1">
							<label for="topic" class="text-sm font-medium">Topic</label>
							<Textarea
								id="topic"
								placeholder="What would you like to write about?"
								bind:value={topic}
							/>
							<ScrollArea class="overflow-hidden">
								<div class="flex gap-2 pb-2">
									{#each topicSuggestions as suggestion, i}
										<div
											class="transition-all duration-500"
											style:transform={mounted ? 'translateX(0)' : 'translateX(100px)'}
											style:opacity={mounted ? '1' : '0'}
											style:transition-delay="{i * 100}ms"
										>
											<button
												class="whitespace-nowrap rounded-md border p-1 hover:bg-secondary"
												on:click|preventDefault={() => (topic = suggestion)}
											>
												{suggestion}
											</button>
										</div>
									{/each}
								</div>
							</ScrollArea>
						</div>
						<div class="space-y-1">
							<label for="audience" class="text-sm font-medium">Target Audience</label>
							<Textarea
								id="audience"
								placeholder="Who is your target audience?"
								bind:value={audience}
							/>
							<ScrollArea class="w-full">
								<div class="flex gap-2 pb-2">
									{#each audienceSuggestions as suggestion, i}
										<div
											class="transition-all duration-500"
											style:transform={mounted ? 'translateX(0)' : 'translateX(100px)'}
											style:opacity={mounted ? '1' : '0'}
											style:transition-delay="{i * 100}ms"
										>
											<button
												class="whitespace-nowrap rounded-md border p-1 hover:bg-secondary"
												on:click|preventDefault={() => (audience = suggestion)}
											>
												{suggestion}
											</button>
										</div>
									{/each}
								</div>
							</ScrollArea>
						</div>
					</fieldset>
					<Button type="submit" class="mt-2">Generate Post</Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="flex-1 p-4">
		<Card.Root class="flex h-full flex-col">
			<div class="flex-1 overflow-auto">
				{#each $messages as message}
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
	</div>
</div>
