<script lang="ts">
	import { PUBLIC_WHATSAPP_NUMBER } from '$app/env/public';
	import BrandBand from '#lib/components/BrandBand.svelte';
	import ContactForm from '#lib/components/ContactForm.svelte';
	import ContextSection from '#lib/components/ContextSection.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import HeroStudio from '#lib/components/HeroStudio.svelte';
	import PlanCard from '#lib/components/PlanCard.svelte';
	import ProcessLavaMap from '#lib/components/ProcessLavaMap.svelte';
	import ServicesList from '#lib/components/ServicesList.svelte';
	import {
		faqs,
		paymentTerms,
		pillars,
		plans,
		recurring,
		services,
		steps
	} from '#lib/content/site.js';
	import { quote } from '#lib/quote.js';
	import { reveal } from '#lib/reveal.js';

	type PlanCategory =
		'all' | 'Desarrollo web' | 'Aplicaciones móviles' | 'Agentes y automatización';

	let selectedCategory = $state<PlanCategory>('all');

	const filteredPlans = $derived(
		selectedCategory === 'all' ? plans : plans.filter((p) => p.category === selectedCategory)
	);
</script>

<svelte:head>
	<title>Makma — Casa de desarrollo tecnológico</title>
	<meta
		name="description"
		content="Sitios web, tiendas en línea, sistemas a la medida, agentes de automatización y aplicaciones móviles para negocios e instituciones en Montería y la región."
	/>
	<meta property="og:title" content="Makma — Casa de desarrollo tecnológico" />
	<meta property="og:description" content="Software que trabaja mientras tu negocio crece." />
	<meta property="og:locale" content="es_CO" />
</svelte:head>

<main id="contenido">
	<HeroStudio {services} />

	<ContextSection />

	<section class="section" id="servicios" aria-labelledby="servicios-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Servicios</Eyebrow>
				<h2 class="display-lg" id="servicios-title">Lo que construimos</h2>
			</header>
			<ServicesList {services} />
		</div>
	</section>

	<section class="section" id="diferenciales" aria-labelledby="diferenciales-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Por qué Makma</Eyebrow>
				<h2 class="display-lg" id="diferenciales-title">
					Software propio, <span class="accent-italic">cero suscripciones</span>
				</h2>
				<p class="body-lg muted measure">
					Tecnología hecha a la medida de tu operación que te pertenece para siempre. Sin pagar
					alquileres eternos por usuario ni depender de plantillas ajenas.
				</p>
			</header>
			<div class="grid pillars-grid">
				{#each pillars as pillar, i (pillar.index)}
					<div class="pillar-card reveal" {@attach reveal(i * 80)}>
						<span class="pillar-index">{pillar.index}</span>
						<h3 class="heading-sm">{pillar.title}</h3>
						<p class="body-sm muted">{pillar.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="section" id="proceso" aria-labelledby="proceso-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Cómo trabajamos</Eyebrow>
				<h2 class="display-lg" id="proceso-title">De la idea al sistema funcionando</h2>
			</header>
			<!-- Mapa mental interactivo con la lámpara de magma central y conductos dinámicos -->
			<div class="reveal" {@attach reveal()}>
				<ProcessLavaMap {steps} />
			</div>
			<div class="guarantee-card reveal" {@attach reveal()}>
				<div class="guarantee-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
						<polyline points="9 12 11 14 15 10" />
					</svg>
				</div>
				<div class="guarantee-body">
					<h3 class="heading-sm">Garantía y forma de pago</h3>
					<p class="body-sm muted">
						<strong>{paymentTerms}</strong> Tu inversión está respaldada por hitos de entrega funcionales.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="section" id="planes" aria-labelledby="planes-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Planes y precios</Eyebrow>
				<h2 class="display-lg" id="planes-title">Precios claros desde el primer día</h2>
				<p class="body-lg muted measure">
					Valores de instalación en pesos colombianos. El hosting, el mantenimiento y los bots se
					cobran aparte, como suscripción.
				</p>
			</header>

			<!-- Selector fluido de categorías tipo cápsula -->
			<div class="plans-filter-wrap reveal" {@attach reveal()}>
				<div class="plans-filter" role="tablist" aria-label="Categorías de planes">
					<button
						type="button"
						role="tab"
						aria-selected={selectedCategory === 'all'}
						class="filter-pill"
						class:active={selectedCategory === 'all'}
						onclick={() => (selectedCategory = 'all')}
					>
						Todos
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={selectedCategory === 'Desarrollo web'}
						class="filter-pill"
						class:active={selectedCategory === 'Desarrollo web'}
						onclick={() => (selectedCategory = 'Desarrollo web')}
					>
						Web y tiendas
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={selectedCategory === 'Aplicaciones móviles'}
						class="filter-pill"
						class:active={selectedCategory === 'Aplicaciones móviles'}
						onclick={() => (selectedCategory = 'Aplicaciones móviles')}
					>
						Apps móviles
					</button>
					<button
						type="button"
						role="tab"
						aria-selected={selectedCategory === 'Agentes y automatización'}
						class="filter-pill"
						class:active={selectedCategory === 'Agentes y automatización'}
						onclick={() => (selectedCategory = 'Agentes y automatización')}
					>
						Agentes e IA
					</button>
				</div>
			</div>

			<div class="grid plans">
				{#each filteredPlans as plan, i (plan.name)}
					<div class="reveal-cell reveal" {@attach reveal((i % 3) * 100)}>
						<PlanCard {plan} href={quote(plan.name)} />
					</div>
				{/each}
			</div>

			<div class="recurring-box reveal" {@attach reveal()}>
				<div class="recurring-header">
					<Eyebrow>Acompañamiento continuo</Eyebrow>
					<h3 class="heading">Cobros recurrentes</h3>
					<p class="body-sm muted">
						Mantenemos tus sistemas activos, seguros y actualizados mes a mes.
					</p>
				</div>
				<dl class="recurring-list">
					{#each recurring as item (item.name)}
						<div class="recurring-item">
							<dt class="heading-sm">{item.name}</dt>
							<dd class="body-sm muted">{item.text}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</section>

	<section class="section" id="preguntas" aria-labelledby="preguntas-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Dudas frecuentes</Eyebrow>
				<h2 class="display-lg" id="preguntas-title">Preguntas resueltas</h2>
				<p class="body-lg muted measure">
					Transparencia total sobre tiempos, entregables y metodología antes de dar el primer paso.
				</p>
			</header>
			<div class="reveal" {@attach reveal(80)}>
				<FaqAccordion items={faqs} />
			</div>
		</div>
	</section>

	<!-- Sección "Proyectos": no se publica hasta tener casos reales (ver docs/diseno/sitio.md). -->

	<section class="section" id="contacto" aria-labelledby="contacto-title">
		<div class="container stack">
			<div class="contact">
				<header class="section-head reveal" {@attach reveal()}>
					<Eyebrow>Contacto</Eyebrow>
					<h2 class="display-lg" id="contacto-title">Cuéntanos qué necesitas</h2>
					<p class="body-lg muted measure">
						Escríbenos y te respondemos por WhatsApp con una propuesta técnica y un valor. Sin
						compromiso.
					</p>
				</header>
				<div class="reveal" {@attach reveal(120)}>
					<ContactForm whatsappNumber={PUBLIC_WHATSAPP_NUMBER} />
				</div>
			</div>
			<div class="reveal" {@attach reveal()}>
				<BrandBand
					eyebrow="Propiedad e independencia"
					title="Dile adiós a las suscripciones eternas"
					accent="con software propio"
					text="Cuéntanos qué proceso quieres digitalizar y construimos la herramienta que se adapte exactamente a tu empresa, 100% de tu propiedad."
					href={quote()}
				>
					{#snippet action()}Cotizar tu propio software por WhatsApp{/snippet}
				</BrandBand>
			</div>
		</div>
	</section>
</main>

<style>
	.muted {
		color: var(--ink-muted);
	}
	.measure {
		max-width: var(--measure);
	}
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-7);
	}
	.section-head {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	/* Pilares de ingeniería */
	.pillars-grid {
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--space-5);
	}
	.pillar-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
		transition:
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous),
			transform var(--duration) var(--ease-viscous);
	}
	.pillar-card:hover {
		border-color: var(--glow-thermal-border);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
		transform: translateY(-2px);
	}
	.pillar-index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1;
		color: var(--brand-text);
	}

	/* Grillas */
	.grid {
		display: grid;
		gap: var(--space-4);
	}
	.plans {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	/* Filtro de planes */
	.plans-filter-wrap {
		display: flex;
		justify-content: flex-start;
	}
	.plans-filter {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-1);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-full);
	}
	.filter-pill {
		padding: var(--space-2) var(--space-4);
		background: transparent;
		color: var(--ink-muted);
		border: 0;
		border-radius: var(--radius-full);
		font-family: var(--font-sans);
		font-size: 14px;
		line-height: 20px;
		font-weight: 500;
		cursor: pointer;
		transition:
			color var(--duration) var(--ease),
			background-color var(--duration) var(--ease-viscous);
	}
	.filter-pill:hover {
		color: var(--ink);
	}
	.filter-pill.active {
		background: var(--surface);
		color: var(--ink);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
		border: 1px solid var(--line-strong);
	}

	/* Tarjeta de Garantía 50/50 */
	.guarantee-card {
		display: flex;
		align-items: center;
		gap: var(--space-5);
		padding: var(--space-5) var(--space-6);
		background: var(--surface-raised);
		border: 1px solid var(--glow-thermal-border);
		border-radius: var(--radius-lg);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
	}
	.guarantee-icon {
		flex: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius-full);
		background: var(--brand-soft);
		color: var(--brand-text);
	}
	.guarantee-icon svg {
		width: 24px;
		height: 24px;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
	}
	.guarantee-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}
	.guarantee-body strong {
		color: var(--ink);
		font-weight: 500;
	}

	/* Cobros recurrentes rediseñados */
	.recurring-box {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		gap: var(--space-7);
		padding: var(--space-7);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: inset 0 1px 0 var(--glass-highlight);
	}
	.recurring-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.recurring-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-6);
		margin: 0;
	}
	.recurring-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
	.recurring-item dd {
		margin: 0;
	}

	/* Contacto */
	.contact {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-8);
	}

	@media (max-width: 960px) {
		.recurring-box {
			grid-template-columns: 1fr;
			gap: var(--space-5);
		}
	}
	@media (max-width: 640px) {
		.section {
			padding-block: var(--space-8);
		}
		.guarantee-card {
			flex-direction: column;
			align-items: flex-start;
			padding: var(--space-5);
		}
		.recurring-box {
			padding: var(--space-5);
		}
	}
</style>
