<script lang="ts">
	import { reveal } from '#lib/reveal.js';
	import { quote } from '#lib/quote.js';
	import type { Service } from '#lib/content/site.js';

	let { services }: { services: Service[] } = $props();
</script>

<div class="accordion">
	{#each services as service, i (service.index)}
		<details class="item reveal" name="servicios" open={i === 0} {@attach reveal(i * 80)}>
			<summary>
				<span class="index">{service.index}</span>
				<span class="title">{service.title}</span>
				<span class="icon" aria-hidden="true">
					<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
				</span>
			</summary>
			<div class="body">
				<p class="text">{service.text}</p>
				<ul class="items">
					{#each service.items as item (item.name)}
						<li><b>{item.name}</b> <span>{item.detail}</span></li>
					{/each}
				</ul>
				<a class="cta" href={quote(service.title)}>Cotizar este servicio</a>
			</div>
		</details>
	{/each}
</div>

<style>
	.accordion {
		border-bottom: 1px solid var(--line);
	}
	.item {
		border-top: 1px solid var(--line);
		transition:
			border-color var(--duration) var(--ease),
			opacity 600ms var(--ease) var(--reveal-delay, 0ms),
			transform 600ms var(--ease) var(--reveal-delay, 0ms);
	}
	.item:hover {
		border-top-color: var(--line-strong);
	}
	summary {
		display: grid;
		grid-template-columns: 72px minmax(0, 1fr) 40px;
		align-items: center;
		gap: var(--space-6);
		padding-block: var(--space-6);
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	.index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
		color: var(--brand-text);
	}
	.title {
		font-family: var(--font-serif);
		font-size: 44px;
		line-height: 1.08;
		letter-spacing: -0.015em;
	}
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: 1.5px solid var(--line-strong);
		border-radius: var(--radius-full);
		transition:
			transform var(--duration) var(--ease),
			border-color var(--duration) var(--ease);
	}
	summary:hover .icon {
		border-color: var(--ink);
	}
	.icon svg {
		width: 20px;
		height: 20px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
	}
	.item[open] .icon {
		transform: rotate(45deg);
	}
	.body {
		display: grid;
		grid-template-columns: 72px minmax(0, 1fr) minmax(0, 1.1fr);
		gap: var(--space-4) var(--space-6);
		padding-bottom: var(--space-7);
	}
	.text {
		grid-column: 2;
		max-width: 38ch;
		font-size: 14px;
		line-height: 22px;
		color: var(--ink-muted);
	}
	.items {
		grid-column: 3;
		grid-row: 1 / span 2;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 14px;
		line-height: 22px;
	}
	.items li {
		padding: var(--space-3) 0;
		border-top: 1px solid var(--line);
	}
	.items li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.items b {
		font-weight: 500;
	}
	.items span {
		color: var(--ink-muted);
	}
	.cta {
		grid-column: 2;
		align-self: start;
		justify-self: start;
		font-size: 15px;
		line-height: 20px;
		font-weight: 500;
		color: var(--brand-text);
		text-decoration: underline;
		text-decoration-thickness: 1.5px;
		text-underline-offset: 6px;
	}
	.cta:hover {
		color: var(--brand-text-hover);
	}
	summary:focus-visible {
		outline: 2px solid var(--focus);
		outline-offset: -2px;
		border-radius: var(--radius-md);
	}
	@media (max-width: 960px) {
		summary {
			grid-template-columns: 48px minmax(0, 1fr) 40px;
		}
		.title {
			font-size: 32px;
		}
		.body {
			grid-template-columns: 48px minmax(0, 1fr);
			gap: var(--space-4);
		}
		.items {
			grid-column: 2;
			grid-row: auto;
		}
	}
</style>
