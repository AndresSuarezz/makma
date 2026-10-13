<script lang="ts">
	import type { FaqItem } from '#lib/content/site.js';

	let { items }: { items: FaqItem[] } = $props();

	// Permite abrir y cerrar elementos de forma interactiva e intuitiva
	let openIndex = $state<number | null>(0);

	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<div class="faq-list">
	{#each items as item, i (item.question)}
		{@const isOpen = openIndex === i}
		<div class="faq-item" class:is-open={isOpen}>
			<h3>
				<button
					type="button"
					class="faq-trigger"
					aria-expanded={isOpen}
					aria-controls="faq-ans-{i}"
					id="faq-btn-{i}"
					onclick={() => toggle(i)}
				>
					<span class="faq-question">{item.question}</span>
					<span class="faq-icon" aria-hidden="true">
						<svg viewBox="0 0 24 24">
							<line x1="12" y1="5" x2="12" y2="19" />
							<line x1="5" y1="12" x2="19" y2="12" />
						</svg>
					</span>
				</button>
			</h3>
			<div id="faq-ans-{i}" class="faq-content" role="region" aria-labelledby="faq-btn-{i}">
				<div class="faq-inner">
					<p class="body-sm faq-answer">{item.answer}</p>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 860px;
		margin-inline: auto;
		width: 100%;
	}

	.faq-item {
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-md);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
		overflow: hidden;
		transition:
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous),
			background-color var(--duration) var(--ease);
	}

	.faq-item:hover {
		border-color: var(--line-strong);
	}

	.faq-item.is-open {
		border-color: var(--glow-thermal-border);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
	}

	h3 {
		margin: 0;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
	}

	.faq-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-5) var(--space-6);
		background: transparent;
		color: var(--ink);
		border: 0;
		font-family: var(--font-sans);
		font-size: 17px;
		line-height: 24px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		transition: color var(--duration) var(--ease);
	}

	.faq-trigger:hover {
		color: var(--ink);
	}

	.faq-question {
		flex: 1;
	}

	.faq-icon {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		background: var(--surface);
		border: 1px solid var(--line);
		color: var(--ink-muted);
		transition:
			transform 280ms var(--ease-viscous),
			border-color var(--duration) var(--ease),
			color var(--duration) var(--ease),
			background-color var(--duration) var(--ease);
	}

	.faq-icon svg {
		width: 14px;
		height: 14px;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		fill: none;
	}

	.faq-item.is-open .faq-icon {
		transform: rotate(45deg);
		color: var(--brand-text);
		border-color: var(--glow-thermal-border);
		background: var(--brand-soft);
	}

	/* Animación fluida de apertura con grid-template-rows */
	.faq-content {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 300ms var(--ease-viscous);
	}

	.faq-item.is-open .faq-content {
		grid-template-rows: 1fr;
	}

	.faq-inner {
		overflow: hidden;
	}

	.faq-answer {
		padding: 0 var(--space-6) var(--space-5);
		color: var(--ink-muted);
		line-height: 24px;
	}

	@media (max-width: 640px) {
		.faq-trigger {
			padding: var(--space-4) var(--space-4);
			font-size: 16px;
		}
		.faq-answer {
			padding: 0 var(--space-4) var(--space-4);
		}
	}
</style>
