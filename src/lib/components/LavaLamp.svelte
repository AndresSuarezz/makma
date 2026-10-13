<script lang="ts">
	import { onMount } from 'svelte';
	import { quote } from '#lib/quote.js';
	import Button from './Button.svelte';
	import Eyebrow from './Eyebrow.svelte';

	interface LavaModule {
		id: string;
		name: string;
		category: string;
		shortText: string;
		icon: string;
		price: string;
	}

	const modules: LavaModule[] = [
		{
			id: 'web',
			name: 'Desarrollo web',
			category: 'Sitios y tiendas',
			shortText: 'Páginas corporativas ultrarrápidas y tiendas con pasarela de pagos integrada.',
			icon: '🌐',
			price: 'Desde $350.000'
		},
		{
			id: 'bots',
			name: 'Agentes y bots',
			category: 'Automatización IA',
			shortText: 'Asistentes de WhatsApp conectados a tu catálogo para perfilar, vender y cobrar.',
			icon: '⚡',
			price: 'Cotización a medida'
		},
		{
			id: 'apps',
			name: 'Apps móviles',
			category: 'Operación y clientes',
			shortText: 'Aplicaciones nativas para operarios en campo, inventario o fidelización.',
			icon: '📱',
			price: 'Desde $1.800.000'
		},
		{
			id: 'sistemas',
			name: 'Sistemas a medida',
			category: 'Gestión interna',
			shortText: 'Plataformas administrativas personalizadas para controlar toda tu operación.',
			icon: '⚙️',
			price: 'Desde $600.000'
		}
	];

	let activeIndex = $state(1); // Por defecto 'Agentes y bots' activo
	let activeModule = $derived(modules[activeIndex]);

	// Simulación física de convección de las gotas de magma
	interface LavaBlob {
		id: string;
		x: number;
		y: number;
		targetX: number;
		targetY: number;
		radius: number;
		temp: number; // 1 = caliente (sube), 0 = frío (baja)
		speed: number;
		phase: number;
		moduleIndex: number;
	}

	let blobs = $state<LavaBlob[]>([
		{
			id: 'b-0',
			x: 100,
			y: 280,
			targetX: 100,
			targetY: 280,
			radius: 28,
			temp: 0.8,
			speed: 0.008,
			phase: 0.2,
			moduleIndex: 0
		},
		{
			id: 'b-1',
			x: 105,
			y: 190,
			targetX: 105,
			targetY: 190,
			radius: 34,
			temp: 0.95,
			speed: 0.006,
			phase: 1.5,
			moduleIndex: 1
		},
		{
			id: 'b-2',
			x: 95,
			y: 110,
			targetX: 95,
			targetY: 110,
			radius: 26,
			temp: 0.3,
			speed: 0.007,
			phase: 3.1,
			moduleIndex: 2
		},
		{
			id: 'b-3',
			x: 102,
			y: 350,
			targetX: 102,
			targetY: 350,
			radius: 30,
			temp: 0.9,
			speed: 0.009,
			phase: 4.8,
			moduleIndex: 3
		}
	]);

	let heatPower = $state<'normal' | 'turbo'>('normal');

	onMount(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		if (reduced.matches) return;

		let rafId: number;
		let t = 0;

		function step() {
			t += heatPower === 'turbo' ? 0.024 : 0.014;

			blobs = blobs.map((b) => {
				// Ciclo de convección vertical: las gotas suben cuando están calientes y bajan al enfriarse
				const yCycle = Math.sin(t * b.speed * 60 + b.phase);
				// El rango de movimiento vertical es de Y=90 (arriba) a Y=360 (abajo)
				const newY = 225 + yCycle * 130;
				// Leve bamboleo lateral orgánico restringido al ancho del vaso
				const xWobble = Math.sin(t * 1.5 + b.phase) * 14;
				const newX = 100 + xWobble;

				return {
					...b,
					x: newX,
					y: newY
				};
			});

			rafId = requestAnimationFrame(step);
		}

		rafId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafId);
	});

	function selectModule(index: number) {
		activeIndex = index;
	}
</script>

<div class="lava-showcase">
	<!-- La Lámpara de Magma Física (SVG interactivo con reflejos de vidrio y metal) -->
	<div class="lamp-column">
		<div class="lamp-glass-wrapper">
			<svg
				class="lamp-svg"
				viewBox="0 0 200 500"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				aria-label="Lámpara de magma interactiva con módulos de Makma"
			>
				<defs>
					<!-- Filtro de calor incandescente y metaballs orgánicas -->
					<filter id="magma-glow" x="-30%" y="-30%" width="160%" height="160%">
						<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>

					<!-- Clip-path que define el contorno interior del vaso de vidrio -->
					<clipPath id="lamp-interior-clip">
						<path
							d="M 68 62
								 C 68 140, 52 260, 42 375
								 C 40 395, 52 405, 100 405
								 C 148 405, 160 395, 158 375
								 C 148 260, 132 140, 132 62
								 Z"
						/>
					</clipPath>

					<!-- Gradiente del líquido interno (calor inferior que se disipa hacia arriba) -->
					<linearGradient id="liquid-gradient" x1="0" y1="1" x2="0" y2="0">
						<stop offset="0%" stop-color="#4a1503" />
						<stop offset="35%" stop-color="#240a02" />
						<stop offset="75%" stop-color="#120501" />
						<stop offset="100%" stop-color="#0a0301" />
					</linearGradient>

					<!-- Resplandor de la bombilla incandescente en la base -->
					<radialGradient id="heater-bulb" cx="50%" cy="100%" r="60%">
						<stop offset="0%" stop-color="#ff9900" stop-opacity="1" />
						<stop offset="40%" stop-color="#ff4400" stop-opacity="0.85" />
						<stop offset="80%" stop-color="#991a00" stop-opacity="0.4" />
						<stop offset="100%" stop-color="#000000" stop-opacity="0" />
					</radialGradient>

					<!-- Metal cepillado para tapa y base -->
					<linearGradient id="brushed-metal" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stop-color="#3d3733" />
						<stop offset="25%" stop-color="#696159" />
						<stop offset="50%" stop-color="#a89f93" />
						<stop offset="70%" stop-color="#544d46" />
						<stop offset="100%" stop-color="#26221f" />
					</linearGradient>

					<!-- Reflejo especular blanco del vidrio exterior -->
					<linearGradient id="glass-specular" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
						<stop offset="40%" stop-color="#ffffff" stop-opacity="0.05" />
						<stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
					</linearGradient>
				</defs>

				<!-- CONTENIDO INTERNO DENTRO DEL VASO DE VIDRIO -->
				<g clip-path="url(#lamp-interior-clip)">
					<!-- Líquido translúcido ámbar -->
					<rect x="0" y="0" width="200" height="500" fill="url(#liquid-gradient)" />

					<!-- Foco incandescente de calor en la base -->
					<rect x="20" y="320" width="160" height="100" fill="url(#heater-bulb)" />

					<!-- Masa de magma caliente en el fondo que alimenta las gotas -->
					<ellipse cx="100" cy="398" rx="52" ry="18" fill="#ff4400" filter="url(#magma-glow)" />
					<ellipse cx="100" cy="396" rx="42" ry="12" fill="#ff7700" />

					<!-- GOTAS DE MAGMA ANIMADAS -->
					{#each blobs as blob (blob.id)}
						{@const isSelected = activeIndex === blob.moduleIndex}
						<g
							class="lava-blob-group"
							class:is-active={isSelected}
							transform="translate({blob.x}, {blob.y})"
							onclick={() => selectModule(blob.moduleIndex)}
							role="button"
							tabindex="0"
							onkeydown={(e) =>
								(e.key === 'Enter' || e.key === ' ') && selectModule(blob.moduleIndex)}
							aria-label="Módulo {modules[blob.moduleIndex].name}"
						>
							<!-- Halo exterior de incandescencia -->
							<circle
								cx="0"
								cy="0"
								r={blob.radius + (isSelected ? 10 : 4)}
								fill="#ff4400"
								opacity={isSelected ? 0.9 : 0.65}
								filter="url(#magma-glow)"
							/>

							<!-- Núcleo ardiente de la gota -->
							<circle
								cx="0"
								cy="0"
								r={blob.radius * (isSelected ? 1.08 : 1)}
								fill={isSelected ? '#ff6600' : '#ff4400'}
							/>

							<!-- Centro amarillo incandescente -->
							<ellipse
								cx="-2"
								cy="-3"
								rx={blob.radius * 0.45}
								ry={blob.radius * 0.35}
								fill="#ffea75"
								opacity={isSelected ? 0.95 : 0.75}
							/>

							<!-- Icono representativo del servicio dentro de la gota -->
							<text
								x="0"
								y="4"
								text-anchor="middle"
								font-size={blob.radius * 0.7}
								class="blob-icon-text"
							>
								{modules[blob.moduleIndex].icon}
							</text>
						</g>
					{/each}

					<!-- Resorte o bobina térmica metálica en el fondo de la lámpara -->
					<path
						d="M 58 396 Q 78 392 100 396 Q 122 400 142 396"
						stroke="#ffaa00"
						stroke-width="2.5"
						stroke-linecap="round"
						opacity="0.8"
					/>
				</g>

				<!-- CONTORNO Y REFLEJOS DEL VASO DE VIDRIO EXTERIOR -->
				<!-- Reflejo curvo vertical en el cristal -->
				<path
					d="M 72 70
						 C 72 140, 58 260, 48 370
						 L 56 370
						 C 66 260, 80 140, 80 70
						 Z"
					fill="url(#glass-specular)"
					opacity="0.75"
					pointer-events="none"
				/>

				<!-- Borde perimetral del vaso con doble línea -->
				<path
					d="M 68 62
						 C 68 140, 52 260, 42 375
						 C 40 395, 52 405, 100 405
						 C 148 405, 160 395, 158 375
						 C 148 260, 132 140, 132 62
						 Z"
					stroke="rgba(243, 238, 228, 0.22)"
					stroke-width="1.8"
					fill="none"
					pointer-events="none"
				/>

				<!-- TAPA METÁLICA SUPERIOR -->
				<path
					d="M 80 18 L 120 18 L 132 64 L 68 64 Z"
					fill="url(#brushed-metal)"
					stroke="#1e1b18"
					stroke-width="1"
				/>
				<!-- Remate de la tapa -->
				<ellipse cx="100" cy="18" rx="20" ry="4" fill="#696159" />
				<!-- Aro inferior de la tapa -->
				<ellipse cx="100" cy="64" rx="32" ry="4" fill="#2a2622" />

				<!-- BASE METÁLICA CÓNICA -->
				<path
					d="M 52 404
						 C 50 404, 38 430, 32 465
						 C 30 480, 40 485, 100 485
						 C 160 485, 170 480, 168 465
						 C 162 430, 150 404, 148 404
						 Z"
					fill="url(#brushed-metal)"
					stroke="#1e1b18"
					stroke-width="1"
				/>

				<!-- Aro de unión entre vaso y base -->
				<ellipse cx="100" cy="406" rx="49" ry="6" fill="#181513" />
				<ellipse
					cx="100"
					cy="404"
					rx="48"
					ry="5"
					stroke="rgba(255, 68, 0, 0.45)"
					stroke-width="1.5"
					fill="none"
				/>

				<!-- Base inferior de apoyo -->
				<ellipse cx="100" cy="482" rx="68" ry="8" fill="#14110f" />
			</svg>
		</div>

		<!-- Selector de calor en la base -->
		<div class="lamp-controls">
			<span class="lamp-status-tag">
				<span class="heat-dot" class:turbo={heatPower === 'turbo'} aria-hidden="true"></span>
				Lámpara de Magma
			</span>
			<button
				type="button"
				class="heat-toggle"
				onclick={() => (heatPower = heatPower === 'normal' ? 'turbo' : 'normal')}
				aria-label="Cambiar intensidad de calor"
			>
				Flujo: <strong>{heatPower === 'normal' ? 'Viscoso' : 'Activo'}</strong>
			</button>
		</div>
	</div>

	<!-- Tarjeta Interactiva de Información (Inspection Pod de Vidrio) -->
	<div class="info-card glass">
		<div class="info-header">
			<Eyebrow>{activeModule.category}</Eyebrow>
			<h3 class="display-md module-title">{activeModule.name}</h3>
			<p class="body-sm module-price">{activeModule.price}</p>
		</div>

		<p class="body-lg module-text">{activeModule.shortText}</p>

		<!-- Selector rápido de módulos / gotas -->
		<div class="module-nav" role="tablist" aria-label="Módulos en la lámpara">
			{#each modules as mod, i (mod.id)}
				<button
					type="button"
					role="tab"
					aria-selected={activeIndex === i}
					class="module-pill"
					class:active={activeIndex === i}
					onclick={() => selectModule(i)}
				>
					<span class="pill-icon">{mod.icon}</span>
					<span class="pill-name">{mod.name}</span>
				</button>
			{/each}
		</div>

		<div class="info-action">
			<Button href={quote(activeModule.name)} arrow={true}>
				Cotizar {activeModule.name}
			</Button>
		</div>
	</div>
</div>

<style>
	.lava-showcase {
		display: grid;
		grid-template-columns: 190px minmax(0, 1fr);
		align-items: center;
		gap: var(--space-5);
		width: 100%;
		max-width: 600px;
	}

	.lamp-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
	}

	.lamp-glass-wrapper {
		position: relative;
		width: 180px;
		height: 420px;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 0 35px rgba(255, 68, 0, 0.22));
	}

	.lamp-svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.lava-blob-group {
		cursor: pointer;
		transition: transform 120ms var(--ease-viscous);
		outline: none;
	}

	.lava-blob-group:hover circle:first-child {
		opacity: 1;
		r: 42;
	}

	.lava-blob-group.is-active {
		filter: drop-shadow(0 0 12px #ff7700);
	}

	.blob-icon-text {
		user-select: none;
		pointer-events: none;
	}

	/* Controles bajo la base de la lámpara */
	.lamp-controls {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-1) var(--space-3);
		border-radius: var(--radius-full);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		font-size: 12px;
	}

	.lamp-status-tag {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--ink-muted);
	}

	.heat-dot {
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
		background: var(--brand);
		box-shadow: 0 0 8px var(--brand);
		animation: pulse-heat 2s infinite var(--ease-viscous);
	}

	.heat-dot.turbo {
		background: #ffaa00;
		box-shadow: 0 0 12px #ffaa00;
		animation-duration: 0.8s;
	}

	@keyframes pulse-heat {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.3);
			opacity: 0.6;
		}
	}

	.heat-toggle {
		background: transparent;
		border: 0;
		padding: var(--space-1) var(--space-2);
		border-radius: var(--radius-sm);
		color: var(--ink);
		cursor: pointer;
		font-size: 12px;
		font-family: inherit;
		border-left: 1px solid var(--line);
	}

	.heat-toggle:hover {
		color: var(--brand-text);
	}

	/* Tarjeta interactiva de inspección */
	.info-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		padding: var(--space-7);
		border-radius: var(--radius-lg);
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
		-webkit-backdrop-filter: blur(20px) saturate(1.4);
		backdrop-filter: blur(20px) saturate(1.4);
	}

	.info-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.module-title {
		margin: 0;
		font-size: 36px;
		line-height: 1.1;
		letter-spacing: -0.015em;
	}

	.module-price {
		color: var(--brand-text);
		font-weight: 500;
		margin: 0;
	}

	.module-text {
		color: var(--ink-muted);
		line-height: 26px;
		margin: 0;
	}

	.module-nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.module-pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-full);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		color: var(--ink-muted);
		font-family: var(--font-sans);
		font-size: 13px;
		cursor: pointer;
		transition:
			border-color var(--duration) var(--ease),
			color var(--duration) var(--ease),
			background-color var(--duration) var(--ease);
	}

	.module-pill:hover {
		border-color: var(--line-strong);
		color: var(--ink);
	}

	.module-pill.active {
		border-color: var(--glow-thermal-border);
		background: var(--brand-soft);
		color: var(--ink);
		box-shadow: var(--glow-thermal-sm);
	}

	.pill-icon {
		font-size: 14px;
	}

	.info-action {
		margin-top: var(--space-2);
	}

	@media (max-width: 860px) {
		.lava-showcase {
			grid-template-columns: 1fr;
			justify-items: center;
			gap: var(--space-6);
		}
		.lamp-glass-wrapper {
			width: 190px;
			height: 420px;
		}
		.info-card {
			padding: var(--space-5);
		}
		.module-title {
			font-size: 30px;
		}
	}
</style>
