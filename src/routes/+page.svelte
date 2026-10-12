<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_WHATSAPP_NUMBER } from '$app/env/public';
	import BrandBand from '#lib/components/BrandBand.svelte';
	import Button from '#lib/components/Button.svelte';
	import ContactForm from '#lib/components/ContactForm.svelte';
	import Eyebrow from '#lib/components/Eyebrow.svelte';
	import PlanCard from '#lib/components/PlanCard.svelte';
	import ServicesAccordion from '#lib/components/ServicesAccordion.svelte';
	import ServicesList from '#lib/components/ServicesList.svelte';
	import ServicesTabs from '#lib/components/ServicesTabs.svelte';
	import { hero, paymentTerms, plans, recurring, services, steps } from '#lib/content/site.js';
	import { quote } from '#lib/quote.js';
	import { reveal } from '#lib/reveal.js';

	// VISTA PREVIA TEMPORAL: propuestas para "Lo que construimos". Al elegir una, borrar las otras
	// dos, este selector y la variable `variant`.
	const variants = [
		{ id: 'lista', label: 'Lista' },
		{ id: 'pestanas', label: 'Pestañas' },
		{ id: 'acordeon', label: 'Acordeón' }
	] as const;
	const variant = $derived(
		variants.find((v) => v.id === page.url.searchParams.get('servicios'))?.id ?? 'lista'
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
	<section class="hero" id="inicio" aria-labelledby="hero-title">
		<div class="container hero-grid">
			<div class="hero-copy reveal" {@attach reveal()}>
				<Eyebrow>{hero.eyebrow}</Eyebrow>
				<h1 class="display-xl" id="hero-title">
					{hero.titleStart} <span class="accent-italic">{hero.titleAccent}</span>
					{hero.titleEnd}
				</h1>
				<p class="body-lg lead">{hero.lead}</p>
				<div class="actions">
					<Button href={quote()}>Cotizar por WhatsApp</Button>
					<Button href="#servicios" variant="secondary">Ver servicios</Button>
				</div>
			</div>
			<div class="hero-art reveal" {@attach reveal(150)} aria-hidden="true">
				<enhanced:img
					src="#lib/assets/brand/magma.png"
					alt=""
					sizes="(min-width: 960px) 480px, 0px"
					fetchpriority="high"
				/>
			</div>
		</div>
	</section>

	<section class="section" id="servicios" aria-labelledby="servicios-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Servicios</Eyebrow>
				<h2 class="display-lg" id="servicios-title">Lo que construimos</h2>
			</header>
			<div class="variants reveal" {@attach reveal()}>
				<span class="caption muted">Vista previa de diseños:</span>
				{#each variants as v (v.id)}
					<a
						class="variant"
						href="?servicios={v.id}#servicios"
						aria-current={variant === v.id ? 'true' : undefined}
						data-sveltekit-noscroll>{v.label}</a
					>
				{/each}
			</div>
			{#if variant === 'pestanas'}
				<ServicesTabs {services} />
			{:else if variant === 'acordeon'}
				<ServicesAccordion {services} />
			{:else}
				<ServicesList {services} />
			{/if}
		</div>
	</section>

	<section class="section" id="proceso" aria-labelledby="proceso-title">
		<div class="container stack">
			<header class="section-head reveal" {@attach reveal()}>
				<Eyebrow>Cómo trabajamos</Eyebrow>
				<h2 class="display-lg" id="proceso-title">De la idea al sistema funcionando</h2>
			</header>
			<ol class="steps">
				{#each steps as step, i (step.title)}
					<li class="reveal" {@attach reveal(i * 100)}>
						<span class="step-index">{String(i + 1).padStart(2, '0')}</span>
						<h3 class="heading-sm">{step.title}</h3>
						<p class="body-sm muted">{step.text}</p>
					</li>
				{/each}
			</ol>
			<p class="payment reveal" {@attach reveal()}>
				<strong>Forma de pago de la instalación:</strong>
				{paymentTerms}
			</p>
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
			<div class="grid plans">
				{#each plans as plan, i (plan.name)}
					<div class="reveal-cell reveal" {@attach reveal((i % 3) * 100)}>
						<PlanCard {plan} href={quote(plan.name)} />
					</div>
				{/each}
			</div>
			<div class="recurring reveal" {@attach reveal()}>
				<h3 class="heading">Cobros recurrentes</h3>
				<dl>
					{#each recurring as item (item.name)}
						<div>
							<dt class="heading-sm">{item.name}</dt>
							<dd class="body-sm muted">{item.text}</dd>
						</div>
					{/each}
				</dl>
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
						Te respondemos con una propuesta y un valor. Sin compromiso.
					</p>
				</header>
				<div class="reveal" {@attach reveal(120)}>
					<ContactForm whatsappNumber={PUBLIC_WHATSAPP_NUMBER} />
				</div>
			</div>
			<div class="reveal" {@attach reveal()}>
				<BrandBand
					eyebrow="Primer paso"
					title="Cuéntanos qué necesitas y te cotizamos"
					accent="sin compromiso"
					text="Respondemos por WhatsApp con una propuesta y un valor."
					href={quote()}
				>
					{#snippet action()}Cotizar por WhatsApp{/snippet}
				</BrandBand>
			</div>
		</div>
	</section>
</main>

<style>
	/* Selector temporal de propuestas (ver comentario en el script) */
	.variants {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
	}
	.variant {
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--line-strong);
		border-radius: var(--radius-full);
		font-size: 13px;
		line-height: 16px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink);
		text-decoration: none;
	}
	.variant[aria-current='true'] {
		background: var(--brand-soft);
		border-color: transparent;
		color: var(--brand-text);
	}

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

	/* Hero */
	.hero {
		padding-block: var(--space-9);
		border-bottom: 1px solid var(--line);
	}
	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		align-items: center;
		gap: var(--space-8);
	}
	.hero-copy {
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
	.hero-art {
		overflow: hidden;
		aspect-ratio: 1;
		border-radius: var(--radius-lg);
	}
	.hero-art :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* Grillas */
	.grid {
		display: grid;
		gap: var(--space-4);
	}
	.plans {
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}

	/* Proceso */
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--space-6);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.steps li {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding-top: var(--space-5);
		border-top: 1px solid var(--line-strong);
	}
	.step-index {
		font-family: var(--font-serif);
		font-size: 24px;
		line-height: 1.25;
		color: var(--brand-text);
	}
	.payment {
		max-width: var(--measure);
		color: var(--ink-muted);
	}
	.payment strong {
		color: var(--ink);
		font-weight: 500;
	}

	/* Cobros recurrentes */
	.recurring {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		gap: var(--space-6);
		padding-top: var(--space-6);
		border-top: 1px solid var(--line);
	}
	.recurring dl {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-6);
		margin: 0;
	}
	.recurring dd {
		margin: var(--space-2) 0 0;
	}

	/* Contacto */
	.contact {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-8);
	}

	@media (max-width: 960px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
		.hero-art {
			display: none;
		}
		.recurring {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.hero {
			padding-block: var(--space-8);
		}
		.section {
			padding-block: var(--space-8);
		}
	}
</style>
