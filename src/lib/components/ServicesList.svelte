<script lang="ts">
	import { reveal } from '#lib/reveal.js';
	import { quote } from '#lib/quote.js';
	import type { Service } from '#lib/content/site.js';

	let { services }: { services: Service[] } = $props();
</script>

<ol class="list">
	{#each services as service, i (service.index)}
		<li class="row reveal" {@attach reveal(i * 80)}>
			<span class="index">{service.index}</span>
			<div class="head">
				<h3 class="title">{service.title}</h3>
				<p class="text">{service.text}</p>
			</div>
			<div class="detail">
				<ul class="items">
					{#each service.items as item (item.name)}
						<li><b>{item.name}</b> <span>{item.detail}</span></li>
					{/each}
				</ul>
				<a class="cta" href={quote(service.title)}>
					Cotizar este servicio
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
				</a>
			</div>
		</li>
	{/each}
</ol>

<style>
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-bottom: 1px solid var(--line);
	}
	.row {
		display: grid;
		grid-template-columns: 72px minmax(0, 1fr) minmax(0, 1.1fr);
		gap: var(--space-6);
		padding: var(--space-7) var(--space-5);
		margin-inline: calc(-1 * var(--space-5));
		border-radius: var(--radius-md);
		border-top: 1px solid var(--line);
		transition:
			border-color var(--duration) var(--ease),
			background-color var(--duration) var(--ease-viscous),
			box-shadow var(--duration) var(--ease-viscous),
			opacity 600ms var(--ease) var(--reveal-delay, 0ms),
			transform 600ms var(--ease) var(--reveal-delay, 0ms);
	}
	.row:hover {
		border-top-color: var(--glow-thermal-border);
		background-color: rgb(255 68 0 / 0.03);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
	}
	.index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
		color: var(--brand-text);
		transition:
			color var(--duration) var(--ease),
			text-shadow var(--duration) var(--ease-viscous);
	}
	.row:hover .index {
		color: var(--brand-hover);
		text-shadow: 0 0 16px rgb(255 68 0 / 0.4);
	}
	.head {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
	.title {
		font-size: 44px;
		line-height: 1.08;
		letter-spacing: -0.015em;
	}
	.text {
		max-width: 38ch;
		font-size: 14px;
		line-height: 22px;
		color: var(--ink-muted);
	}
	.detail {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}
	.items {
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
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		align-self: flex-start;
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
	.cta svg {
		width: 18px;
		height: 18px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition: transform var(--duration) var(--ease);
	}
	.cta:hover svg {
		transform: translateX(4px);
	}
	@media (max-width: 960px) {
		.row {
			grid-template-columns: 48px minmax(0, 1fr);
			gap: var(--space-4);
		}
		.detail {
			grid-column: 2;
		}
		.title {
			font-size: 36px;
		}
	}
</style>
