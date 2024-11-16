<script lang="ts">
    import Chat from '$lib/components/chat.svelte';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
    import * as Card from '$lib/components/ui/card/index.js';
	import { Title } from '$lib/components/ui/sheet';
    import { pageTitle } from '$lib/stores/page';

    import { House, Inbox, Calendar, Signature } from 'lucide-svelte';
    
    $pageTitle = 'Sales';

    const cards = [
      {
        title: "Create a Contract",
        description: "Get help drafting and reviewing sales contracts to ensure compliance and protect your business.",
        url: "/sales/new-contract",
        icon: Signature,
      },
      {
        title: "New Client",
        description: "Get help reaching out to new clients to introduce your services and establish relationships.",
        url: "#",
        icon: House,
      },
      {
        title: "Client Retention",
        description: "Get help reaching out to existing clients to maintain relationships and ensure continued business.",
        url: "#",
        icon: Inbox,
      },
      {
        title: "Sales Pipeline",
        description: "Get help managing your sales pipeline to identify and prioritize opportunities.",
        url: "#",
        icon: Calendar,
      },
    ];
    </script>
    
    <Chat>
        <div class="w-full place-items-center">
            <div class="grid grid-cols-2 gap-4 w-2/3">
                {#each cards as card}
                <a href={card.url}>
                    <Card.Root class="p-4 {card.url === '#' ? 'text-gray-300' : ''} relative">
                        {#if card.url === '#'}
                        <div class="absolute inset-0 flex items-center justify-center z-10">
                            <span class="text-neutral-400/50 rounded-md px-2 py-1 font-semibold text-lg">In Development</span>
                        </div>
                        {/if}
                        <Card.Title class="flex items-center gap-2 {card.url === '#' ? 'blur-[3px]' : ''}">
                            <card.icon />
                            {card.title}
                        </Card.Title>
                        <Card.Content class="{card.url === '#' ? 'blur-[3px]' : ''}">
                            {card.description}
                        </Card.Content>
                    </Card.Root>
                </a>
                {/each}
            </div>
    </Chat>