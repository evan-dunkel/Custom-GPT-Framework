<!-- 
  Custom Button component for Svelte 4 compatibility
  Use this instead of shadcn's Button component
-->

<!--
Examples:

To adjust width, use the className prop like className="w-[200px]" 
Or use props like:

    <script lang="ts">
    // ... other exports
    export let fullWidth = false;
    </script>

    <button
    class={cn(
        // ... other classes
        fullWidth && "w-full",
        !fullWidth && "w-auto",
        className
    )}
    on:click
    >
    <slot />
    </button>

Then use it like:

    <Button fullWidth>Full Width Button</Button>

-->
<script lang="ts">
	import { cn } from '$lib/utils';

	export let variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' =
		'default';
	export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
	export let className = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled = false;
</script>

<button
	{type}
	{disabled}
	class={cn(
		'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		// Variant styles
		variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
		variant === 'destructive' &&
			'bg-destructive text-destructive-foreground hover:bg-destructive/90',
		variant === 'outline' &&
			'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
		variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
		variant === 'link' && 'text-primary underline-offset-4 hover:underline',
		// Size styles
		size === 'default' && 'h-10 px-4 py-2',
		size === 'sm' && 'h-9 rounded-md px-3',
		size === 'lg' && 'h-11 rounded-md px-8',
		size === 'icon' && 'h-10 w-10',
		className
	)}
	on:click
>
	<slot />
</button>
