<script lang="ts">
	import { cn } from '$lib/utils';
	import { AlertCircle, Info } from '@lucide/svelte';

	type HelperVariant = 'info' | 'error';

	export let variant: HelperVariant = 'info';
	export let message: string = '';
	export let className: string = '';
	export let show: boolean = true;

	// Helper function to get classes based on variant
	function getVariantClasses(variant: HelperVariant): string {
		const baseClasses = 'text-sm transition-all duration-200 flex items-center gap-2';

		switch (variant) {
			case 'error':
				return `${baseClasses} text-destructive`;
			case 'info':
			default:
				return `${baseClasses} text-muted-foreground`;
		}
	}
</script>

{#if show}
	<div
		class={cn(getVariantClasses(variant), className)}
		role={variant === 'error' ? 'alert' : 'status'}
		aria-live={variant === 'error' ? 'assertive' : 'polite'}
	>
		<!-- Icon -->
		{#if variant === 'info'}
			<Info class="h-4 w-4" />
		{:else}
			<AlertCircle class="h-4 w-4" />
		{/if}

		<!-- Message -->
		<span class="leading-tight">
			{message}
		</span>
	</div>
{/if}
