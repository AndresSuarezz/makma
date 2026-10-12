<script lang="ts">
	import { reveal } from '#lib/reveal.js';
	import { quote } from '#lib/quote.js';
	import type { Service } from '#lib/content/site.js';

	let { services }: { services: Service[] } = $props();

	let selected = $state(0);
	const tabs: HTMLButtonElement[] = [];
	const current = $derived(services[selected]);

	function target(key: string): number | null {
		const last = services.length - 1;
		switch (key) {
			case 'ArrowDown':
			case 'ArrowRight':
				return selected === last ? 0 : selected + 1;
			case 'ArrowUp':
			case 'ArrowLeft':
				return selected === 0 ? last : selected - 1;
			case 'Home':
				return 0;
			case 'End':
				return last;
			default:
				return null;
		}
	}

	function onkeydown(event: KeyboardEvent) {
		const next = target(event.key);
		if (next === null) return;
		event.preventDefault();
		selected = next;
		tabs[next]?.focus();
	}
</script>

<div class="tabs reveal" {@attach reveal()}>
	<div
		class="tablist"
		role="tablist"
		aria-label="Servicios"
		aria-orientation="vertical"
		tabindex="-1"
		{onkeydown}
	>
		{#each services as service, i (service.index)}
			<button
				bind:this={tabs[i]}
				class="tab"
				role="tab"
				type="button"
				id="tab-{service.index}"
				aria-selected={selected === i}
				aria-controls="panel-servicios"
				tabindex={selected === i ? 0 : -1}
				onclick={() => (selected = i)}
			>
				<span class="index">{service.index}</span>
				<span class="label">{service.title}</span>
			</button>
		{/each}
	</div>

	<div
		class="panel"
		role="tabpanel"
		id="panel-servicios"
		aria-labelledby="tab-{current.index}"
		tabindex="0"
	>
		{#key current.index}
			<div class="content">
				<p class="text">{current.text}</p>
				<ul class="items">
					{#each current.items as item (item.name)}
						<li><b>{item.name}</b> <span>{item.detail}</span></li>
					{/each}
				</ul>
				<a class="cta" href={quote(current.title)}>
					Cotizar este servicio
					<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
				</a>
			</div>
		{/key}
	</div>
</div>

<style>
	.tabs {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--space-8);
		padding-top: var(--space-6);
		border-top: 1px solid var(--line);
	}
	.tablist {
		display: flex;
		flex-direction: column;
	}
	.tab {
		display: flex;
		align-items: baseline;
		gap: var(--space-4);
		padding: var(--space-4) 0;
		background: none;
		border: 0;
		border-bottom: 1px solid var(--line);
		color: var(--ink-muted);
		font: inherit;
		text-align: left;
		cursor: pointer;
		transition:
			color var(--duration) var(--ease),
			border-color var(--duration) var(--ease);
	}
	.tab:hover {
		color: var(--ink);
		border-bottom-color: var(--line-strong);
	}
	.tab[aria-selected='true'] {
		color: var(--ink);
		border-bottom-color: var(--brand-text);
	}
	.index {
		min-width: 32px;
		font-family: var(--font-serif);
		font-size: 20px;
		line-height: 1.25;
		color: var(--brand-text);
	}
	.label {
		font-family: var(--font-serif);
		font-size: 36px;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}
	.panel {
		align-self: start;
		min-height: 320px;
	}
	.panel:focus-visible {
		outline-offset: 8px;
		border-radius: var(--radius-md);
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		animation: swap 360ms var(--ease);
	}
	@keyframes swap {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}
	.text {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
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
		.tabs {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}
		.label {
			font-size: 28px;
		}
		.panel {
			min-height: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.content {
			animation: none;
		}
	}
</style>
