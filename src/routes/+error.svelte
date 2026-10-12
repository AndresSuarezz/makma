<script lang="ts">
	import { page } from '$app/state';
	import Button from '#lib/components/Button.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import { reveal } from '#lib/reveal.js';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Página no encontrada' : 'Algo salió mal'} — Makma</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="contenido" class="error">
	<div class="container inner">
		<div class="copy reveal" {@attach reveal()}>
			<Eyebrow>Error {page.status}</Eyebrow>
			{#if notFound}
				<h1 class="display-xl">
					Esta página no <span class="accent-italic">existe.</span>
				</h1>
				<p class="body-lg lead">
					Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio o
					escríbenos y te ayudamos a encontrar lo que buscas.
				</p>
			{:else}
				<h1 class="display-xl">
					Algo salió <span class="accent-italic">mal.</span>
				</h1>
				<p class="body-lg lead">
					Tuvimos un problema al cargar esta página. Intenta de nuevo en unos minutos; si sigue
					pasando, escríbenos.
				</p>
			{/if}
			<div class="actions">
				<Button href="/">Volver al inicio</Button>
				<Button href="/#contacto" variant="secondary">Contacto</Button>
			</div>
		</div>

		<div class="art reveal" {@attach reveal(120)} aria-hidden="true">
			<svg viewBox="0 0 400 400">
				<path
					d="M110 70c40-40 120-30 140 20 14 36-18 58-26 92-8 36 30 52 62 70 38 22 52 68 22 100-34 36-106 34-152 8-52-30-66-86-52-136 12-42-10-60-22-90-8-22-2-48 28-64z"
				/>
				<circle cx="318" cy="110" r="46" />
				<circle cx="78" cy="250" r="22" />
			</svg>
		</div>
	</div>
</main>

<style>
	.error {
		display: flex;
		align-items: center;
		min-height: calc(100svh - var(--nav-height));
		padding-block: var(--space-9);
	}
	.inner {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		align-items: center;
		gap: var(--space-8);
	}
	.copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-5);
	}
	.lead {
		max-width: var(--measure);
		color: var(--ink-muted);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-3);
	}
	/* Franja de marca con manchas: el único bloque naranja grande de la página */
	.art {
		display: grid;
		place-items: center;
		aspect-ratio: 1;
		background: var(--brand);
		border-radius: var(--radius-lg);
	}
	.art svg {
		width: 80%;
		fill: var(--on-brand);
	}
	@media (max-width: 960px) {
		.inner {
			grid-template-columns: 1fr;
		}
		.art {
			display: none;
		}
	}
</style>
