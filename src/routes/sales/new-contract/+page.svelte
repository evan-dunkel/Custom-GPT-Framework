<script lang="ts">
	import Chat from '$lib/components/chat.svelte';
	import { pageTitle } from '$lib/stores/page';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Card from '$lib/components/ui/card/index.js';
	import { useChat } from '@ai-sdk/svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { toast } from 'svelte-sonner';
	import { Copy, Pin } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { fly } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	$pageTitle = 'New Contract';

	let contractTemplate = 'Standard Sales Agreement';
	let clientDetails: string =
		'ABC Corporation, 123 Business Rd, Suite 100, Business City, BC 12345';
	let contractTerms =
		'Total sales amount of $50,000, payment terms of 30 days net, delivery timeframe of 60 days from contract signing';
	let approvalProcess =
		'Contract review by Legal Department, followed by approval from the Sales Director';
	let deliveryMethod = 'Secure email with PDF attachment';

	$: message = `As a Sales Manager with expertise in streamlining sales processes, you will assist in automating the generation of sales contracts. Begin by selecting the appropriate contract template: ${contractTemplate}. Next, input the necessary client details: ${clientDetails}. Define the specific contract terms that need to be included: ${contractTerms}. Outline the approval process to ensure all necessary checks are completed: ${approvalProcess}. Finally, specify the preferred delivery method for the contract: ${deliveryMethod}. Ensure that the output is professional, clear, and compliant with relevant standards, allowing for easy customization and review.`;

	const { input, handleSubmit, messages } = useChat();

	let test = 'This is a test message';
	function handleFormSubmit() {
		if (message) {
			$input = message;
			handleSubmit();
		}
	}

	function copyMessage(content: string) {
		navigator.clipboard
			.writeText(content)
			.then(() => toast.success('Copied to clipboard'))
			.catch(() => toast.error('Failed to copy'));
	}

	const companies = [
		{ name: 'Esided', details: 'Esided Inc., 456 Tech Park, Suite 200, Silicon Valley, CA 94025' },
		{
			name: 'Acme Corp',
			details: 'Acme Corporation, 789 Industry Ave, Floor 15, Metro City, MC 54321'
		},
		{
			name: 'TechFlow',
			details: 'TechFlow Solutions, 321 Innovation Dr, Unit 500, Tech Hub, TH 67890'
		}
		// Add more companies as needed
	];

	let isVisible = false;
	let mounted = false;

	onMount(async () => {
		await tick();
		mounted = true;
	});
</script>

<div class="flex h-full">
	<div class="w-[400px] p-4">
		<Card.Root class="flex flex-col gap-4 p-4">
			<Card.Title>New Contract</Card.Title>
			<Card.Description>Use this tool to generate a new sales contract.</Card.Description>
			<Card.Content>
				<form on:submit|preventDefault={handleFormSubmit} class="flex flex-col gap-2">
					<fieldset class="space-y-2">
						<div class="space-y-1">
							<label for="clientDetails" class="text-sm font-medium">Client Details</label>
							<Textarea
								id="clientDetails"
								placeholder="Client Details"
								bind:value={clientDetails}
							/>
							<ScrollArea class="w-full">
								<div class="flex gap-2 pb-2">
									{#each companies as company, i}
										<div
											class="transition-all duration-500"
											style:transform={mounted ? 'translateX(0)' : 'translateX(100px)'}
											style:opacity={mounted ? '1' : '0'}
											style:transition-delay="{i * 100}ms"
										>
											<button
												class="whitespace-nowrap rounded-md border p-1 hover:bg-secondary"
												on:click|preventDefault={() => (clientDetails = company.details)}
											>
												{company.name}
											</button>
										</div>
									{/each}
								</div>
							</ScrollArea>
						</div>
						<div class="space-y-1">
							<label for="contractTerms" class="text-sm font-medium">Contract Terms</label>
							<Textarea
								id="contractTerms"
								placeholder="Contract Terms"
								bind:value={contractTerms}
							/>
						</div>
						<div class="space-y-1">
							<label for="approvalProcess" class="text-sm font-medium">Approval Process</label>
							<Textarea
								id="approvalProcess"
								placeholder="Approval Process"
								bind:value={approvalProcess}
							/>
						</div>
						<div class="space-y-1">
							<label for="deliveryMethod" class="text-sm font-medium">Delivery Method</label>
							<Textarea
								id="deliveryMethod"
								placeholder="Delivery Method"
								bind:value={deliveryMethod}
							/>
						</div>
					</fieldset>
					<Button type="submit" class="mt-2">Generate Contract</Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>

	<div class="flex-1 p-4">
		<Card.Root class="flex h-full flex-col">
			<!-- Test card -->
			<!-- <div class="flex-1 overflow-auto">
				<div class="mb-4">
					<Card.Content class="flex flex-col items-start justify-start gap-2">
						<div class="flex items-center gap-2">
							<Button>
								<Pin />
								Save to Project
							</Button>
							<button class="m-0 p-0">
								<Button variant="outline" size="default" class="ml-2 hover:opacity-70">
									<Copy class="h-4 w-4" /> Copy
								</Button>
							</button>
						</div>
					</Card.Content>
				</div>
			</div> -->

			<!-- Generated card -->
			<div class="flex-1 overflow-auto">
				{#each $messages as message}
					<div class="mb-4 {message.role === 'assistant' ? 'pl-4' : 'hidden'}">
						<!-- <Card.Root class="{message.role === 'assistant' ? 'bg-secondary' : 'ml-auto'} w-3/4"> -->
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
						<!-- </Card.Root> -->
					</div>
				{/each}
			</div>
		</Card.Root>

		<!-- Test card -->

		<!-- <Card.Root class="w-3/4">
            <Card.Content>
                <div class="flex justify-between items-start">
                    <SvelteMarkdown source={test} />
                    <button 
                        class="ml-2 hover:opacity-70"
                        on:click={() => copyMessage(test)}
                    >
                        <Copy class="h-4 w-4" />
                    </button>
                </div>
            </Card.Content>
        </Card.Root> -->
	</div>
</div>
