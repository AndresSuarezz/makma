<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'link' | 'ink';

	interface Props {
		variant?: Variant;
		size?: 'md' | 'sm';
		href?: string;
		arrow?: boolean;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		arrow = false,
		children,
		...rest
	}: Props &
		Omit<HTMLAnchorAttributes, 'children'> &
		Omit<HTMLButtonAttributes, 'children'> = $props();
</script>

{#if href}
	<!-- Solo recibe anclas (#seccion) y enlaces externos (WhatsApp), no rutas internas. -->
	<a {href} class="btn {variant} {size}" {...rest as HTMLAnchorAttributes}>
		{@render children()}
		{#if arrow}
			<svg class="btn-arrow" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		{/if}
	</a>
{:else}
	<button class="btn {variant} {size}" type="button" {...rest as HTMLButtonAttributes}>
		{@render children()}
		{#if arrow}
			<svg class="btn-arrow" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
		{/if}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		height: 48px;
		padding: 0 var(--space-5);
		border: 1.5px solid transparent;
		border-radius: var(--radius-full);
		font-family: var(--font-sans);
		font-size: 15px;
		line-height: 20px;
		font-weight: 500;
		letter-spacing: 0.01em;
		text-decoration: none;
		white-space: nowrap;
		cursor: pointer;
		transition:
			background-color var(--duration) var(--ease),
			color var(--duration) var(--ease),
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous),
			transform 160ms var(--ease-viscous);
	}
	.btn:active {
		transform: scale(0.975);
	}
	.btn-arrow {
		width: 16px;
		height: 16px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform var(--duration) var(--ease-viscous);
	}
	.btn:hover .btn-arrow {
		transform: translateX(3px);
	}
	.sm {
		height: 40px;
		padding: 0 var(--space-4);
		font-size: 14px;
	}
	.primary {
		background: var(--brand);
		color: var(--on-brand);
	}
	.primary:hover {
		background: var(--brand-hover);
		color: var(--on-brand);
		box-shadow: var(--glow-thermal-sm);
	}
	.secondary {
		background: transparent;
		color: var(--ink);
		border-color: var(--line-strong);
	}
	.secondary:hover {
		border-color: var(--ink);
		color: var(--ink);
	}
	/* Solo dentro de BrandBand y de un PlanCard destacado */
	.ink {
		background: var(--on-brand);
		color: var(--brand);
	}
	.ink:hover {
		background: var(--surface-raised);
		color: var(--brand-text);
	}
	.link {
		align-self: flex-start;
		height: auto;
		padding: 0;
		border-radius: 0;
		color: var(--brand-text);
		text-decoration: underline;
		text-decoration-thickness: 1.5px;
		text-underline-offset: 6px;
	}
	.link:hover {
		color: var(--brand-text-hover);
	}
	.btn:disabled,
	.btn[aria-disabled='true'] {
		opacity: 0.4;
		cursor: not-allowed;
	}
	/* Dentro de superficies de marca el foco usa on-brand */
	:global(.on-brand-surface) .btn:focus-visible {
		outline-color: var(--on-brand);
	}
</style>
