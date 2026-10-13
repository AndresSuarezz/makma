<script lang="ts">
	import Button from './Button.svelte';
	import MagmaBackground from './MagmaBackground.svelte';
	import { quote } from '#lib/quote.js';
	import { reveal } from '#lib/reveal.js';

	export interface HeroServiceItem {
		index: string;
		title: string;
	}

	interface Props {
		services?: HeroServiceItem[];
	}

	let {
		services = [
			{ index: '01', title: 'Desarrollo web y sistemas' },
			{ index: '02', title: 'Agentes y automatización' },
			{ index: '03', title: 'Aplicaciones móviles' },
			{ index: '04', title: 'Consultoría IT y nube' }
		]
	}: Props = $props();

	const marqueeItems = [
		'ADIÓS A LAS SUSCRIPCIONES ETERNAS',
		'SOFTWARE 100% PROPIO',
		'DESARROLLO A LA MEDIDA',
		'AGENTES CON INTELIGENCIA ARTIFICIAL',
		'CERO PLANTILLAS INFLADAS',
		'AUTOMATIZACIÓN DE PROCESOS',
		'TECNOLOGÍA QUE HACE CRECER TU NEGOCIO',
		'TALENTO MONTERIANO',
		'MONTERÍA & COLOMBIA'
	];
</script>

<section class="hero-studio" id="inicio" aria-labelledby="hero-title">
	<!-- Lienzo vivo con partículas incandescentes y lava en canvas -->
	<MagmaBackground />

	<div class="hero-shell">
		<!-- Vértices superiores con sello técnico y coordenadas de estudio -->
		<div class="hero-topbar reveal" {@attach reveal(40)}>
			<div class="studio-stamp">
				<span class="stamp-dot" aria-hidden="true"></span>
				<span class="mono-meta">• (04) — (2026)</span>
				<span class="sep">/</span>
				<span class="mono-label">SOFTWARE STUDIO</span>
			</div>
			<div class="studio-coords">
				<span class="coords-radar" aria-hidden="true">
					<svg viewBox="0 0 16 16" fill="none">
						<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.4" />
						<circle cx="8" cy="8" r="3" stroke="currentColor" />
						<line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" stroke-opacity="0.3" />
						<line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" stroke-opacity="0.3" />
					</svg>
				</span>
				<span class="mono-coords">8°45′N 75°53′W · MONTERÍA, COLOMBIA</span>
			</div>
		</div>

		<!-- Núcleo central del Hero -->
		<div class="hero-body">
			<!-- Columna principal con titular monumental y estado -->
			<div class="hero-headline-block reveal" {@attach reveal(80)}>
				<div class="studio-badge">
					<span class="badge-beacon" aria-hidden="true"></span>
					<span class="badge-text">Disponibles para nuevos proyectos · Montería & remoto</span>
				</div>

				<h1 class="hero-monumental" id="hero-title">
					<span class="monumental-line-1">TECNOLOGÍA QUE</span>
					<span class="monumental-line-2">HACE CRECER</span>
					<span class="monumental-line-3">
						TU NEGOCIO<span class="brand-reg" aria-label="marca registrada">®</span>
					</span>
				</h1>

				<p class="hero-slogan">
					DEJA DE ALQUILAR PLATAFORMAS GENÉRICAS. <span class="slogan-accent"
						>CONSTRUYE SOFTWARE PROPIO QUE SE ADAPTA A TU EMPRESA.</span
					>
				</p>
			</div>

			<!-- Tarjeta editorial de Talento Monteriano / Caribe -->
			<aside
				class="hero-editorial-card glass reveal"
				{@attach reveal(120)}
				aria-label="Origen y enfoque"
			>
				<div class="editorial-head">
					<div class="editorial-tag">
						<svg class="editorial-pin" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
							<path
								d="M8 1a4.5 4.5 0 0 0-4.5 4.5c0 3.375 4.5 9.5 4.5 9.5s4.5-6.125 4.5-9.5A4.5 4.5 0 0 0 8 1zm0 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
							/>
						</svg>
						<span>TALENTO MONTERIANO</span>
					</div>
					<span class="editorial-status">SOLUCIONES A LA MEDIDA</span>
				</div>
				<p class="editorial-description">
					Desarrollamos soluciones tecnológicas de alto estándar directamente desde Montería,
					Córdoba para empresas e instituciones de toda Colombia.
				</p>
				<div class="editorial-footer">
					<span class="editorial-spark" aria-hidden="true">✦</span>
					<span>Software propio · Cero suscripciones eternas</span>
				</div>
			</aside>
		</div>

		<!-- Fila inferior: Llamado a la acción, beacon de scroll y directorio de servicios -->
		<div class="hero-footbar reveal" {@attach reveal(160)}>
			<!-- Bloque izquierdo: Propuesta de valor & Botones -->
			<div class="hero-foot-left">
				<div class="team-signature">
					<span class="team-avatar-pill" aria-hidden="true">
						<span class="avatar-cell">M</span>
						<span class="avatar-cell brand">K</span>
						<span class="avatar-cell">M</span>
					</span>
					<div class="team-text">
						<span class="team-name">MAKMA</span>
						<span class="team-sub">CASA DE DESARROLLO</span>
					</div>
				</div>
				<p class="hero-foot-summary">
					Reemplazamos hojas de cálculo y suscripciones mensuales por software a la medida y agentes
					de IA que automatizan tus procesos comerciales.
				</p>
				<div class="hero-actions">
					<Button href={quote()} arrow={true}>Cotizar por WhatsApp</Button>
					<Button href="#servicios" variant="secondary">Ver servicios</Button>
				</div>
			</div>

			<!-- Bloque central: Indicador vertical de scroll dinámico -->
			<div class="hero-foot-center">
				<a href="#servicios" class="scroll-beacon" aria-label="Desplazarse hacia servicios">
					<span class="beacon-emitter" aria-hidden="true">
						<span class="beacon-core"></span>
						<span class="beacon-wave"></span>
					</span>
					<span class="beacon-stem" aria-hidden="true"></span>
					<span class="beacon-label">SCROLL DOWN</span>
				</a>
			</div>

			<!-- Bloque derecho: Directorio interactivo de 4 servicios con saltos suaves -->
			<div class="hero-foot-right" aria-label="Servicios principales">
				<span class="directory-title">ESPECIALIDADES TÉCNICAS</span>
				<nav class="directory-list">
					{#each services as item (item.index)}
						<a href="#servicios" class="directory-link">
							<span class="link-idx">{item.index}</span>
							<span class="link-arrow" aria-hidden="true">›</span>
							<span class="link-label">{item.title}</span>
						</a>
					{/each}
				</nav>
			</div>
		</div>
	</div>

	<!-- Cinta Ticker Infinita en la base del Hero -->
	<div class="hero-ticker" aria-hidden="true">
		<div class="ticker-track">
			{#each [0, 1] as copyIndex (copyIndex)}
				<div class="ticker-group">
					{#each marqueeItems as item, itemIdx (`${copyIndex}-${itemIdx}`)}
						<span class="ticker-token">
							<span class="ticker-bullet">✦</span>
							<span class="ticker-text">{item}</span>
						</span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Contenedor principal del Hero Studio */
	.hero-studio {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100svh;
		border-bottom: 1px solid var(--line);
		background: var(--surface);
		padding-top: calc(var(--nav-height, 68px) + var(--space-4));
	}

	.hero-shell {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: var(--container-max);
		margin-inline: auto;
		padding-inline: var(--gutter);
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: space-between;
		gap: var(--space-6);
		padding-bottom: var(--space-6);
	}

	/* Barra superior con coordenadas y sellos de estudio */
	.hero-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-3);
		padding-bottom: var(--space-3);
		border-bottom: 1px dashed var(--line);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-muted);
	}

	.studio-stamp {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.stamp-dot {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--brand);
		box-shadow: 0 0 8px var(--brand);
	}

	.mono-meta {
		font-family: var(--font-sans);
		font-weight: 600;
		color: var(--ink);
	}

	.sep {
		opacity: 0.35;
	}

	.mono-label {
		font-weight: 500;
	}

	.studio-coords {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.coords-radar {
		display: inline-flex;
		width: 14px;
		height: 14px;
		color: var(--brand-text);
	}

	.mono-coords {
		font-weight: 500;
	}

	/* Cuerpo central */
	.hero-body {
		display: grid;
		grid-template-columns: 1.35fr minmax(320px, 0.85fr);
		gap: var(--space-7);
		align-items: center;
		margin-block: auto;
		padding-block: var(--space-4);
	}

	.hero-headline-block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-4);
	}

	.studio-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: 4px 14px;
		border-radius: var(--radius-full);
		background: rgb(255 68 0 / 0.08);
		border: 1px solid var(--glow-thermal-border);
		color: var(--ink);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.badge-beacon {
		width: 7px;
		height: 7px;
		border-radius: var(--radius-full);
		background: var(--brand);
		box-shadow: 0 0 10px var(--brand);
		animation: pulse-beacon 2.4s infinite var(--ease-viscous);
	}

	@keyframes pulse-beacon {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.35);
			opacity: 0.55;
		}
	}

	/* Titular Monumental */
	.hero-monumental {
		display: flex;
		flex-direction: column;
		font-family: var(--font-serif);
		line-height: 0.92;
		letter-spacing: -0.035em;
		font-weight: 400;
		color: var(--ink);
		margin: 0;
	}

	.monumental-line-1,
	.monumental-line-2 {
		font-size: clamp(34px, 4.4vw, 76px);
		color: var(--ink);
		text-transform: uppercase;
		white-space: nowrap;
	}

	.monumental-line-3 {
		font-size: clamp(38px, 5.2vw, 88px);
		font-style: italic;
		color: var(--brand-text);
		text-transform: uppercase;
		display: inline-flex;
		align-items: baseline;
		filter: drop-shadow(0 0 28px rgb(255 68 0 / 0.28));
		white-space: nowrap;
	}

	.brand-reg {
		font-size: 0.32em;
		font-style: normal;
		margin-left: 6px;
		vertical-align: super;
		color: var(--ink-muted);
		border: 1px solid var(--line-strong);
		border-radius: var(--radius-full);
		padding: 2px 5px;
		line-height: 1;
	}

	.hero-slogan {
		font-size: 13px;
		letter-spacing: 0.08em;
		font-weight: 600;
		color: var(--ink-muted);
		text-transform: uppercase;
		margin: 0;
		max-width: 580px;
		line-height: 1.5;
	}

	.slogan-accent {
		color: var(--ink);
	}

	/* Tarjeta editorial Talento Monteriano */
	.hero-editorial-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		border: 1px solid var(--glass-border);
		background: var(--glass-bg);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			0 12px 36px -12px rgb(0 0 0 / 0.45);
		transition:
			border-color var(--duration) var(--ease),
			transform var(--duration) var(--ease-viscous);
	}

	.hero-editorial-card:hover {
		border-color: var(--glow-thermal-border);
		transform: translateY(-2px);
	}

	.editorial-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.editorial-tag {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--brand-text);
	}

	.editorial-pin {
		width: 14px;
		height: 14px;
	}

	.editorial-status {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.06em;
		padding: 3px 8px;
		border-radius: var(--radius-full);
		background: rgb(255 68 0 / 0.12);
		color: var(--brand-text);
		border: 1px solid rgb(255 68 0 / 0.25);
		white-space: nowrap;
		flex-shrink: 0;
	}

	.editorial-description {
		font-size: 15px;
		line-height: 1.55;
		color: var(--ink);
		margin: 0;
	}

	.editorial-footer {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 12px;
		color: var(--ink-muted);
		border-top: 1px solid var(--line);
		padding-top: var(--space-3);
	}

	.editorial-spark {
		color: var(--brand-text);
		font-size: 11px;
	}

	/* Fila inferior de 3 columnas */
	.hero-footbar {
		display: grid;
		grid-template-columns: 1.2fr auto 1fr;
		gap: var(--space-6);
		align-items: flex-end;
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
	}

	/* Bloque izquierdo */
	.hero-foot-left {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: 460px;
	}

	.team-signature {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
	}

	.team-avatar-pill {
		display: inline-flex;
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-full);
		padding: 2px 4px;
		gap: 2px;
	}

	.avatar-cell {
		font-family: var(--font-sans);
		font-size: 10px;
		font-weight: 700;
		width: 18px;
		height: 18px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
		background: var(--surface-sunken);
		color: var(--ink);
	}

	.avatar-cell.brand {
		background: var(--brand);
		color: var(--on-brand);
	}

	.team-text {
		display: flex;
		flex-direction: column;
		line-height: 1.15;
	}

	.team-name {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--ink);
	}

	.team-sub {
		font-size: 10px;
		letter-spacing: 0.06em;
		color: var(--ink-muted);
	}

	.hero-foot-summary {
		font-size: 14px;
		line-height: 1.45;
		color: var(--ink-muted);
		margin: 0;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-2);
	}

	/* Bloque central: Scroll beacon */
	.hero-foot-center {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: var(--space-2);
	}

	.scroll-beacon {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		color: var(--ink-muted);
		transition: color var(--duration) var(--ease);
	}

	.scroll-beacon:hover {
		color: var(--brand-text);
	}

	.beacon-emitter {
		position: relative;
		width: 12px;
		height: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.beacon-core {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--brand);
		box-shadow: 0 0 10px var(--brand);
	}

	.beacon-wave {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-full);
		border: 1px solid var(--brand);
		animation: pulse-wave 2s infinite var(--ease);
	}

	@keyframes pulse-wave {
		0% {
			transform: scale(0.8);
			opacity: 1;
		}
		100% {
			transform: scale(2.4);
			opacity: 0;
		}
	}

	.beacon-stem {
		width: 1px;
		height: 28px;
		background: linear-gradient(to bottom, var(--brand), transparent);
		animation: stem-glow 2s infinite alternate ease-in-out;
	}

	@keyframes stem-glow {
		0% {
			opacity: 0.4;
		}
		100% {
			opacity: 1;
		}
	}

	.beacon-label {
		font-size: 10px;
		letter-spacing: 0.12em;
		font-weight: 600;
		text-transform: uppercase;
	}

	/* Bloque derecho: Directorio de 4 servicios */
	.hero-foot-right {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		align-items: flex-start;
		justify-self: end;
		width: 100%;
		max-width: 320px;
	}

	.directory-title {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-muted);
	}

	.directory-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
	}

	.directory-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: 6px 12px;
		border-radius: var(--radius-sm);
		background: rgb(243 238 228 / 0.03);
		border: 1px solid var(--line);
		text-decoration: none;
		color: var(--ink);
		font-size: 13px;
		line-height: 1.2;
		transition:
			background var(--duration) var(--ease),
			border-color var(--duration) var(--ease),
			transform var(--duration) var(--ease-viscous);
	}

	.directory-link:hover {
		background: rgb(255 68 0 / 0.1);
		border-color: var(--glow-thermal-border);
		transform: translateX(4px);
		color: var(--brand-text);
	}

	.link-idx {
		font-size: 11px;
		font-weight: 700;
		font-family: var(--font-sans);
		color: var(--brand-text);
		opacity: 0.9;
	}

	.link-arrow {
		font-size: 12px;
		color: var(--ink-muted);
		transition: transform var(--duration) var(--ease);
	}

	.directory-link:hover .link-arrow {
		transform: translateX(2px);
		color: var(--brand-text);
	}

	.link-label {
		font-weight: 500;
	}

	/* Cinta Ticker Infinita */
	.hero-ticker {
		position: relative;
		width: 100%;
		overflow: hidden;
		background: var(--surface-sunken);
		border-top: 1px solid var(--glow-thermal-border);
		border-bottom: 1px solid var(--line);
		padding-block: 10px;
		user-select: none;
		box-shadow: inset 0 1px 0 var(--glass-highlight);
	}

	.ticker-track {
		display: flex;
		width: max-content;
		animation: marquee-slide 34s linear infinite;
	}

	.ticker-group {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.ticker-token {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding-inline: var(--space-4);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--ink);
		white-space: nowrap;
	}

	.ticker-bullet {
		color: var(--brand-text);
		font-size: 10px;
	}

	@keyframes marquee-slide {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	/* Respeto a movimiento reducido */
	@media (prefers-reduced-motion: reduce) {
		.badge-beacon,
		.beacon-wave,
		.beacon-stem {
			animation: none;
		}
		.ticker-track {
			animation: none;
		}
	}

	/* Ajustes responsivos */
	@media (max-width: 1024px) {
		.hero-body {
			grid-template-columns: 1fr;
			gap: var(--space-5);
		}
		.hero-editorial-card {
			max-width: 520px;
		}
		.hero-footbar {
			grid-template-columns: 1fr;
			gap: var(--space-5);
		}
		.hero-foot-center {
			display: none;
		}
		.hero-foot-right {
			max-width: 100%;
		}
	}

	@media (max-width: 640px) {
		.hero-studio {
			padding-top: calc(var(--nav-height, 68px) + var(--space-2));
		}
		.hero-topbar {
			flex-direction: column;
			align-items: flex-start;
			gap: 4px;
		}
		.monumental-line-1,
		.monumental-line-2 {
			font-size: clamp(26px, 8.5vw, 42px);
			white-space: normal;
		}
		.monumental-line-3 {
			font-size: clamp(30px, 9.8vw, 48px);
			white-space: normal;
		}
		.hero-slogan {
			font-size: 12px;
		}
		.directory-link {
			padding: 8px 12px;
		}
	}
</style>
