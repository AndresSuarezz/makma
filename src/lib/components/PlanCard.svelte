<script lang="ts">
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import { formatCop, type Plan } from '#lib/content/site.js';

	let { plan, href }: { plan: Plan; href: string } = $props();
</script>

<article class="plan" class:featured={plan.featured} class:on-brand-surface={plan.featured}>
	<Eyebrow>{plan.category}</Eyebrow>
	<h3 class="name">{plan.name}</h3>
	{#if plan.price !== null}
		<p class="price"><span class="from">desde · COP</span>{formatCop(plan.price)}</p>
	{:else}
		<p class="price"><span class="from">precio</span>A medida</p>
	{/if}
	<p class="note">{plan.note}</p>
	<ul class="list">
		{#each plan.items as item (item)}
			<li class="item">
				<span class="check-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
				</span>
				<span>{item}</span>
			</li>
		{/each}
	</ul>
	<Button variant={plan.featured ? 'ink' : 'secondary'} arrow={true} {href}
		>Cotizar por WhatsApp</Button
	>
</article>

<style>
	.plan {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--surface-raised);
		color: var(--ink);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
		transition:
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous),
			transform var(--duration) var(--ease-viscous);
	}
	.plan:hover {
		border-color: var(--line-strong);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
		transform: translateY(-2px);
	}
	.name {
		font-size: 24px;
		line-height: 1.25;
	}
	.price {
		font-family: var(--font-serif);
		font-size: 44px;
		line-height: 1.08;
		letter-spacing: -0.015em;
	}
	.from {
		display: block;
		margin-bottom: var(--space-1);
		font-family: var(--font-sans);
		font-size: 14px;
		line-height: 22px;
		letter-spacing: 0;
		color: var(--ink-muted);
	}
	.note {
		font-size: 14px;
		line-height: 22px;
		color: var(--ink-muted);
	}
	.list {
		flex: 1;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 14px;
		line-height: 22px;
	}
	.item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: var(--space-3) 0;
		border-top: 1px solid var(--line);
	}
	.item:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.check-icon {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		margin-top: 2px;
		border-radius: var(--radius-full);
		background: var(--brand-soft);
		color: var(--brand-text);
	}
	.check-icon svg {
		width: 11px;
		height: 11px;
		stroke: currentColor;
		stroke-width: 2.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	.featured {
		background: var(--brand);
		color: var(--on-brand);
		border-color: transparent;
		box-shadow: var(--glow-thermal);
	}
	.featured:hover {
		border-color: transparent;
		box-shadow: var(--glow-thermal);
		transform: translateY(-3px);
	}
	.featured .from,
	.featured .note {
		color: var(--on-brand-muted);
	}
	.featured .item {
		border-top-color: var(--on-brand-muted);
	}
	.featured .check-icon {
		background: var(--on-brand);
		color: var(--brand);
	}
</style>
