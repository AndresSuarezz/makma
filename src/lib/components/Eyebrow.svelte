<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<p class="eyebrow">{@render children()}</p>

<style>
	.eyebrow {
		font-family: var(--font-sans);
		font-size: 13px;
		line-height: 16px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--brand-text);
	}
	/* Dentro de una superficie de marca el eyebrow pasa a on-brand-muted */
	:global(.on-brand-surface) .eyebrow {
		color: var(--on-brand-muted);
	}
</style>
