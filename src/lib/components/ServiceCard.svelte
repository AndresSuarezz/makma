<script lang="ts">
	import Button from './Button.svelte';
	import type { Service } from '#lib/content/site.js';

	let { service, href }: { service: Service; href: string } = $props();
</script>

<article class="card">
	<span class="index">{service.index}</span>
	<h3 class="title">{service.title}</h3>
	<p class="text">{service.text}</p>
	<ul class="list">
		{#each service.items as item (item.name)}
			<li><b>{item.name}</b> <span>{item.detail}</span></li>
		{/each}
	</ul>
	<Button variant="link" {href} rel={href.startsWith('http') ? 'noopener' : undefined}>
		Cotizar este servicio
	</Button>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
		background: var(--surface-raised);
		color: var(--ink);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		transition: border-color var(--duration) var(--ease);
	}
	.card:hover {
		border-color: var(--line-strong);
	}
	.index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
		color: var(--brand-text);
	}
	.title {
		font-size: 32px;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}
	.text {
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
	.list b {
		font-weight: 500;
	}
	.list span {
		color: var(--ink-muted);
	}
</style>
