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
			<li>{item}</li>
		{/each}
	</ul>
	<Button variant={plan.featured ? 'ink' : 'secondary'} {href}>Cotizar por WhatsApp</Button>
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
	.list li {
		padding: var(--space-3) 0;
		border-top: 1px solid var(--line);
	}
	.featured {
		background: var(--brand);
		color: var(--on-brand);
		border-color: transparent;
	}
	.featured .from,
	.featured .note {
		color: var(--on-brand-muted);
	}
	.featured .list li {
		border-top-color: var(--on-brand-muted);
	}
</style>
