<script lang="ts">
	import { context } from '#lib/content/site.js';
	import { reveal } from '#lib/reveal.js';
</script>

<section class="section-context" id="contexto" aria-labelledby="context-title">
	<div class="container">
		<div class="context-layout glass reveal" {@attach reveal()}>
			<div class="context-left">
				<div class="context-eyebrow">
					<span class="eyebrow-dash" aria-hidden="true"></span>
					<span>{context.eyebrow}</span>
				</div>

				<h2 class="context-title" id="context-title">
					{context.title}
				</h2>

				<div class="context-badge">
					<span class="badge-dot" aria-hidden="true"></span>
					<span>{context.badge}</span>
				</div>
			</div>

			<div class="context-right">
				{#each context.paragraphs as paragraph, i (i)}
					<p class="context-paragraph" class:highlight={i === 0}>
						{paragraph}
					</p>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.section-context {
		position: relative;
		padding-block: var(--space-8);
		border-bottom: 1px solid var(--line);
	}

	.context-layout {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1.35fr;
		gap: var(--space-8);
		align-items: flex-start;
		padding: var(--space-8);
		border-radius: var(--radius-lg);
		border: 1px solid var(--line);
		background: var(--surface-raised);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			0 16px 40px -16px rgb(0 0 0 / 0.5);
		transition:
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous);
	}

	.context-layout:hover {
		border-color: var(--glow-thermal-border);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
	}

	.context-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-5);
		height: 100%;
	}

	.context-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--brand-text);
	}

	.eyebrow-dash {
		width: 22px;
		height: 2px;
		background: var(--brand);
		border-radius: var(--radius-full);
		box-shadow: 0 0 6px var(--brand);
	}

	.context-title {
		font-family: var(--font-serif);
		font-size: clamp(32px, 3.8vw, 48px);
		line-height: 1.1;
		font-weight: 400;
		letter-spacing: -0.02em;
		color: var(--ink);
		margin: 0;
	}

	.context-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 12px;
		letter-spacing: 0.04em;
		color: var(--ink-muted);
		margin-top: auto;
		padding-top: var(--space-4);
		border-top: 1px dashed var(--line);
		width: 100%;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--brand);
		box-shadow: 0 0 6px var(--brand);
		flex-shrink: 0;
	}

	.context-right {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.context-paragraph {
		font-size: 17px;
		line-height: 1.7;
		color: var(--ink-muted);
		margin: 0;
	}

	.context-paragraph.highlight {
		font-size: 19px;
		line-height: 1.62;
		color: var(--ink);
		font-weight: 400;
	}

	@media (max-width: 960px) {
		.context-layout {
			grid-template-columns: 1fr;
			gap: var(--space-6);
			padding: var(--space-6);
		}

		.context-badge {
			margin-top: 0;
		}
	}

	@media (max-width: 640px) {
		.section-context {
			padding-block: var(--space-6);
		}

		.context-layout {
			padding: var(--space-5);
		}

		.context-title {
			font-size: clamp(28px, 8.5vw, 36px);
		}

		.context-paragraph.highlight {
			font-size: 17px;
		}

		.context-paragraph {
			font-size: 15px;
			line-height: 1.6;
		}
	}
</style>
