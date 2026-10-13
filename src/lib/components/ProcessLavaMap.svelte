<script lang="ts">
	import { onMount } from 'svelte';

	export interface StepItem {
		title: string;
		text: string;
	}

	interface Props {
		steps: StepItem[];
	}

	let { steps }: Props = $props();

	const phases = [
		{ subtitle: 'Fase 01 · Descubrimiento' },
		{ subtitle: 'Fase 02 · Arquitectura' },
		{ subtitle: 'Fase 03 · Construcción' },
		{ subtitle: 'Fase 04 · Evolución' }
	];

	let activeStep = $state(0);
	let isAutoCycle = $state(true);

	interface LavaBlob {
		id: string;
		stepIndex: number;
		x: number;
		y: number;
		rx: number;
		ry: number;
		baseRadius: number;
		speed: number;
		phase: number;
	}

	let blobs = $state<LavaBlob[]>([
		{
			id: 'blob-0',
			stepIndex: 0,
			x: 260,
			y: 160,
			rx: 22,
			ry: 22,
			baseRadius: 22,
			speed: 0.007,
			phase: 0.2
		},
		{
			id: 'blob-1',
			stepIndex: 1,
			x: 256,
			y: 260,
			rx: 27,
			ry: 27,
			baseRadius: 27,
			speed: 0.0055,
			phase: 1.8
		},
		{
			id: 'blob-2',
			stepIndex: 2,
			x: 264,
			y: 195,
			rx: 24,
			ry: 24,
			baseRadius: 24,
			speed: 0.0075,
			phase: 3.4
		},
		{
			id: 'blob-3',
			stepIndex: 3,
			x: 258,
			y: 330,
			rx: 25,
			ry: 25,
			baseRadius: 25,
			speed: 0.006,
			phase: 5.0
		}
	]);

	function selectStep(index: number, pauseAuto = true) {
		activeStep = index;
		if (pauseAuto) {
			isAutoCycle = false;
		}
	}

	function toggleAutoCycle() {
		isAutoCycle = !isAutoCycle;
	}

	function nextStep() {
		activeStep = (activeStep + 1) % steps.length;
		isAutoCycle = false;
	}

	function prevStep() {
		activeStep = (activeStep - 1 + steps.length) % steps.length;
		isAutoCycle = false;
	}

	onMount(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		if (reduced.matches) {
			isAutoCycle = false;
			return;
		}

		let rafId: number;
		let t = 0;
		let cycleTimer = 0;

		function loop() {
			const dt = 0.013;
			t += dt;

			if (isAutoCycle) {
				cycleTimer += dt;
				if (cycleTimer > 4.5) {
					cycleTimer = 0;
					activeStep = (activeStep + 1) % steps.length;
				}
			}

			blobs = blobs.map((b) => {
				const isCurrent = b.stepIndex === activeStep;

				const yCycle = Math.sin(t * b.speed * 60 + b.phase);
				const yMin = 140;
				const yMax = 355;
				const yRange = (yMax - yMin) / 2;
				const baseCenterY = (yMin + yMax) / 2;

				let calcY = baseCenterY + yCycle * yRange;
				if (isCurrent) {
					const targetFocalY = b.stepIndex <= 1 ? 200 : 270;
					calcY = calcY * 0.65 + targetFocalY * 0.35;
				}

				const vy = Math.cos(t * b.speed * 60 + b.phase);
				const stretch = Math.min(0.2, Math.abs(vy) * 0.18);
				const targetRadius = isCurrent ? b.baseRadius * 1.18 : b.baseRadius;

				const rx = vy < 0 ? targetRadius * (1 - stretch * 0.7) : targetRadius * (1 + stretch);
				const ry =
					vy < 0 ? targetRadius * (1 + stretch * 1.05) : targetRadius * (1 - stretch * 0.5);

				const xWobble = Math.sin(t * 1.4 + b.phase) * 10;
				const calcX = 260 + xWobble;

				return { ...b, x: calcX, y: calcY, rx, ry };
			});

			rafId = requestAnimationFrame(loop);
		}

		rafId = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(rafId);
	});

	/* ─── Constantes geométricas de la lámpara ─── */
	// Vaso de vidrio: curvatura suave cónica con panza inferior
	const GLASS_OUTER =
		'M 237 72 C 237 72, 232 100, 228 140 C 222 195, 216 260, 210 320 C 206 360, 204 380, 202 390 Q 198 408, 210 416 Q 230 424, 260 424 Q 290 424, 310 416 Q 322 408, 318 390 C 316 380, 314 360, 310 320 C 304 260, 298 195, 292 140 C 288 100, 283 72, 283 72 Z';

	const GLASS_INNER =
		'M 239 74 C 239 74, 234 102, 230 142 C 224 197, 218 262, 212 322 C 208 362, 206 382, 204 392 Q 200 408, 212 415 Q 231 422, 260 422 Q 289 422, 308 415 Q 320 408, 316 392 C 314 382, 312 362, 308 322 C 302 262, 296 197, 290 142 C 286 102, 281 74, 281 74 Z';
</script>

<div class="process-map-wrapper">
	<!-- MAPA MENTAL EN PANTALLAS DE ESCRITORIO Y TABLET -->
	<div class="mindmap-container">
		<!-- COLUMNA IZQUIERDA: 01 Análisis & 02 Diseño -->
		<div class="steps-column steps-left">
			<!-- PASO 01 -->
			<div
				class="step-card"
				class:is-active={activeStep === 0}
				onclick={() => selectStep(0)}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectStep(0)}
				role="button"
				tabindex="0"
				aria-label="Paso 01: {steps[0].title}"
			>
				<div class="card-inner">
					<div class="card-topline">
						<span class="step-badge">{phases[0].subtitle}</span>
						<span class="thermal-led" aria-hidden="true"></span>
					</div>
					<div class="card-content">
						<div class="step-num-wrap">
							<span class="step-number">01</span>
						</div>
						<div class="step-text-body">
							<h3 class="heading-sm step-title">{steps[0].title}</h3>
							<p class="body-sm card-description">{steps[0].text}</p>
						</div>
					</div>
				</div>
				<span class="card-port port-right" aria-hidden="true"></span>
			</div>

			<!-- PASO 02 -->
			<div
				class="step-card"
				class:is-active={activeStep === 1}
				onclick={() => selectStep(1)}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectStep(1)}
				role="button"
				tabindex="0"
				aria-label="Paso 02: {steps[1].title}"
			>
				<div class="card-inner">
					<div class="card-topline">
						<span class="step-badge">{phases[1].subtitle}</span>
						<span class="thermal-led" aria-hidden="true"></span>
					</div>
					<div class="card-content">
						<div class="step-num-wrap">
							<span class="step-number">02</span>
						</div>
						<div class="step-text-body">
							<h3 class="heading-sm step-title">{steps[1].title}</h3>
							<p class="body-sm card-description">{steps[1].text}</p>
						</div>
					</div>
				</div>
				<span class="card-port port-right" aria-hidden="true"></span>
			</div>
		</div>

		<!-- COLUMNA CENTRAL: LÁMPARA DE MAGMA PREMIUM -->
		<div class="lamp-hub-column">
			<div class="lamp-circuit-canvas">
				<svg
					class="hub-svg"
					viewBox="0 0 520 500"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Lámpara de magma central conectada a las fases del proceso de Makma"
				>
					<defs>
						<!-- Filtro de halo incandescente mejorado con resplandor suave -->
						<filter id="plm-glow" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>

						<!-- Filtro suave para reflejos del cristal -->
						<filter id="plm-soft" x="-10%" y="-10%" width="120%" height="120%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="2" />
						</filter>

						<!-- Filtro de resplandor ambiental para el calor de base -->
						<filter id="plm-heat-ambient" x="-60%" y="-60%" width="220%" height="220%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="18" />
						</filter>

						<!-- Clip-path interior del vaso de vidrio -->
						<clipPath id="plm-glass-clip">
							<path d={GLASS_INNER} />
						</clipPath>

						<!-- Degradado térmico del líquido oscuro (más profundo) -->
						<linearGradient id="plm-liquid" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stop-color="#3a1005" />
							<stop offset="25%" stop-color="#1e0802" />
							<stop offset="60%" stop-color="#0e0401" />
							<stop offset="100%" stop-color="#080200" />
						</linearGradient>

						<!-- Foco térmico mejorado con difusión más realista -->
						<radialGradient id="plm-heater" cx="50%" cy="95%" r="55%">
							<stop offset="0%" stop-color="#ff8800" stop-opacity="0.95" />
							<stop offset="30%" stop-color="#ff4400" stop-opacity="0.7" />
							<stop offset="65%" stop-color="#991800" stop-opacity="0.25" />
							<stop offset="100%" stop-color="#000000" stop-opacity="0" />
						</radialGradient>

						<!-- Metal cepillado premium con mayor contraste -->
						<linearGradient id="plm-metal" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="#2a2521" />
							<stop offset="15%" stop-color="#504841" />
							<stop offset="35%" stop-color="#8a7f73" />
							<stop offset="50%" stop-color="#b5a999" />
							<stop offset="65%" stop-color="#7d7268" />
							<stop offset="85%" stop-color="#3d362f" />
							<stop offset="100%" stop-color="#1e1a17" />
						</linearGradient>

						<!-- Segundo gradiente de metal vertical para los aros -->
						<linearGradient id="plm-metal-ring" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="#6b6057" />
							<stop offset="50%" stop-color="#3a332d" />
							<stop offset="100%" stop-color="#1a1613" />
						</linearGradient>

						<!-- Reflejo especular del cristal (franja izquierda) -->
						<linearGradient id="plm-spec-l" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="#ffffff" stop-opacity="0.32" />
							<stop offset="50%" stop-color="#ffffff" stop-opacity="0.06" />
							<stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
						</linearGradient>

						<!-- Reflejo especular secundario (franja derecha, más sutil) -->
						<linearGradient id="plm-spec-r" x1="1" y1="0" x2="0" y2="0">
							<stop offset="0%" stop-color="#ffffff" stop-opacity="0.14" />
							<stop offset="40%" stop-color="#ffffff" stop-opacity="0.03" />
							<stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
						</linearGradient>

						<!-- Gradiente para el pool de magma en el fondo -->
						<radialGradient id="plm-magma-pool" cx="50%" cy="50%" r="55%">
							<stop offset="0%" stop-color="#ff7700" stop-opacity="1" />
							<stop offset="50%" stop-color="#ff4400" stop-opacity="0.9" />
							<stop offset="100%" stop-color="#cc2200" stop-opacity="0.5" />
						</radialGradient>
					</defs>

					<!-- ═══════════════════════════════════════════════ -->
					<!-- CONDUCTOS DE ENERGÍA: Conectores a las tarjetas -->
					<!-- ═══════════════════════════════════════════════ -->

					<!-- Pistas en reposo (líneas punteadas sutiles) -->
					<g class="circuit-conduits-passive">
						<path
							d="M 0 135 C 90 135, 140 155, 208 155"
							stroke="var(--line-strong)"
							stroke-width="1"
							stroke-dasharray="3 5"
							fill="none"
							opacity="0.6"
						/>
						<path
							d="M 0 365 C 90 365, 130 345, 200 345"
							stroke="var(--line-strong)"
							stroke-width="1"
							stroke-dasharray="3 5"
							fill="none"
							opacity="0.6"
						/>
						<path
							d="M 312 155 C 380 155, 430 135, 520 135"
							stroke="var(--line-strong)"
							stroke-width="1"
							stroke-dasharray="3 5"
							fill="none"
							opacity="0.6"
						/>
						<path
							d="M 320 345 C 390 345, 430 365, 520 365"
							stroke="var(--line-strong)"
							stroke-width="1"
							stroke-dasharray="3 5"
							fill="none"
							opacity="0.6"
						/>
					</g>

					<!-- Conductos activos con partícula viajera -->
					<g class="active-conduit" class:is-live={activeStep === 0}>
						<path
							d="M 0 135 C 90 135, 140 155, 208 155"
							stroke="var(--brand)"
							stroke-width="2"
							fill="none"
							filter="url(#plm-glow)"
						/>
						<circle r="3.5" fill="#ffea75" filter="url(#plm-glow)">
							<animateMotion
								path="M 0 135 C 90 135, 140 155, 208 155"
								dur="1.6s"
								repeatCount="indefinite"
							/>
						</circle>
					</g>

					<g class="active-conduit" class:is-live={activeStep === 1}>
						<path
							d="M 0 365 C 90 365, 130 345, 200 345"
							stroke="var(--brand)"
							stroke-width="2"
							fill="none"
							filter="url(#plm-glow)"
						/>
						<circle r="3.5" fill="#ffea75" filter="url(#plm-glow)">
							<animateMotion
								path="M 0 365 C 90 365, 130 345, 200 345"
								dur="1.6s"
								repeatCount="indefinite"
							/>
						</circle>
					</g>

					<g class="active-conduit" class:is-live={activeStep === 2}>
						<path
							d="M 312 155 C 380 155, 430 135, 520 135"
							stroke="var(--brand)"
							stroke-width="2"
							fill="none"
							filter="url(#plm-glow)"
						/>
						<circle r="3.5" fill="#ffea75" filter="url(#plm-glow)">
							<animateMotion
								path="M 312 155 C 380 155, 430 135, 520 135"
								dur="1.6s"
								repeatCount="indefinite"
							/>
						</circle>
					</g>

					<g class="active-conduit" class:is-live={activeStep === 3}>
						<path
							d="M 320 345 C 390 345, 430 365, 520 365"
							stroke="var(--brand)"
							stroke-width="2"
							fill="none"
							filter="url(#plm-glow)"
						/>
						<circle r="3.5" fill="#ffea75" filter="url(#plm-glow)">
							<animateMotion
								path="M 320 345 C 390 345, 430 365, 520 365"
								dur="1.6s"
								repeatCount="indefinite"
							/>
						</circle>
					</g>

					<!-- Nodos de anclaje magnético -->
					<circle
						cx="208"
						cy="155"
						r="3.5"
						fill={activeStep === 0 ? '#ff4400' : 'var(--line-strong)'}
					/>
					<circle
						cx="200"
						cy="345"
						r="3.5"
						fill={activeStep === 1 ? '#ff4400' : 'var(--line-strong)'}
					/>
					<circle
						cx="312"
						cy="155"
						r="3.5"
						fill={activeStep === 2 ? '#ff4400' : 'var(--line-strong)'}
					/>
					<circle
						cx="320"
						cy="345"
						r="3.5"
						fill={activeStep === 3 ? '#ff4400' : 'var(--line-strong)'}
					/>

					<!-- ═══════════════════════════════════════════════ -->
					<!-- LÁMPARA DE MAGMA – Diseño premium con vidrio   -->
					<!-- soplado, metal cepillado y óptica realista     -->
					<!-- ═══════════════════════════════════════════════ -->

					<!-- Resplandor ambiental cálido detrás de la lámpara -->
					<ellipse
						cx="260"
						cy="350"
						rx="65"
						ry="90"
						fill="#ff4400"
						opacity="0.08"
						filter="url(#plm-heat-ambient)"
					/>

					<!-- TAPA METÁLICA SUPERIOR (cónica invertida pulida) -->
					<path
						d="M 245 28 Q 252 24, 260 24 Q 268 24, 275 28
						   L 284 72 L 236 72 Z"
						fill="url(#plm-metal)"
						stroke="#14110e"
						stroke-width="0.8"
					/>
					<!-- Superficie elíptica superior de la tapa -->
					<ellipse cx="260" cy="26" rx="16" ry="3.5" fill="#7d7268" opacity="0.8" />
					<!-- Brillo en la arista de la tapa -->
					<path
						d="M 248 30 L 272 30"
						stroke="rgba(255,255,255,0.18)"
						stroke-width="0.8"
						stroke-linecap="round"
					/>
					<!-- Aro inferior de la tapa -->
					<ellipse cx="260" cy="72" rx="25" ry="4" fill="url(#plm-metal-ring)" />
					<ellipse
						cx="260"
						cy="72"
						rx="25"
						ry="4"
						stroke="rgba(255,255,255,0.08)"
						stroke-width="0.5"
						fill="none"
					/>

					<!-- CUERPO DEL VASO DE VIDRIO – Contenido interior -->
					<g clip-path="url(#plm-glass-clip)">
						<!-- Líquido oscuro ámbar -->
						<rect x="195" y="70" width="130" height="360" fill="url(#plm-liquid)" />

						<!-- Radiación térmica inferior -->
						<rect x="195" y="310" width="130" height="120" fill="url(#plm-heater)" />

						<!-- Pool de magma fundido en la base -->
						<ellipse
							cx="260"
							cy="416"
							rx="46"
							ry="14"
							fill="url(#plm-magma-pool)"
							filter="url(#plm-glow)"
						/>
						<ellipse cx="260" cy="414" rx="34" ry="8" fill="#ff8811" opacity="0.9" />
						<!-- Punto incandescente central -->
						<ellipse cx="260" cy="413" rx="18" ry="5" fill="#ffcc44" opacity="0.5" />

						<!-- GOTAS DE MAGMA DINÁMICAS -->
						{#each blobs as blob (blob.id)}
							{@const isSelected = activeStep === blob.stepIndex}
							<g
								class="hub-blob-element"
								class:is-active-blob={isSelected}
								transform="translate({blob.x}, {blob.y})"
								onclick={() => selectStep(blob.stepIndex)}
								onkeydown={(e) =>
									(e.key === 'Enter' || e.key === ' ') && selectStep(blob.stepIndex)}
								role="button"
								tabindex="0"
								aria-label="Fase {blob.stepIndex + 1}: {steps[blob.stepIndex].title}"
							>
								<!-- Halo térmico difuso exterior -->
								<ellipse
									cx="0"
									cy="0"
									rx={blob.rx * (isSelected ? 1.5 : 1.2)}
									ry={blob.ry * (isSelected ? 1.5 : 1.2)}
									fill="#ff4400"
									opacity={isSelected ? 0.7 : 0.35}
									filter="url(#plm-glow)"
								/>

								<!-- Cuerpo de magma viscoso con gradiente sutil -->
								<ellipse
									cx="0"
									cy="0"
									rx={blob.rx}
									ry={blob.ry}
									fill={isSelected ? '#ff5500' : '#e03800'}
								/>

								<!-- Cáustica ardiente interior (simulación de calor) -->
								<ellipse
									cx={-blob.rx * 0.12}
									cy={-blob.ry * 0.15}
									rx={blob.rx * 0.55}
									ry={blob.ry * 0.45}
									fill={isSelected ? '#ffd050' : '#ff8830'}
									opacity={isSelected ? 0.85 : 0.55}
								/>

								<!-- Reflejo especular en la gota (micro-detalle de vidrio) -->
								<ellipse
									cx={-blob.rx * 0.2}
									cy={-blob.ry * 0.3}
									rx={blob.rx * 0.25}
									ry={blob.ry * 0.18}
									fill="#ffffff"
									opacity={isSelected ? 0.25 : 0.12}
								/>

								<!-- Identificador numérico -->
								<text
									x="0"
									y="5"
									text-anchor="middle"
									font-family="var(--font-serif)"
									font-size={blob.baseRadius * 0.6}
									font-weight="bold"
									fill={isSelected ? '#1a0600' : 'rgba(255,255,255,0.9)'}
									class="blob-step-text"
								>
									{String(blob.stepIndex + 1).padStart(2, '0')}
								</text>
							</g>
						{/each}

						<!-- Bobina calefactora en la base -->
						<path
							d="M 222 415 Q 240 411 260 415 Q 280 419 298 415"
							stroke="#ffaa22"
							stroke-width="1.8"
							stroke-linecap="round"
							opacity="0.7"
						/>
					</g>

					<!-- CONTORNO DEL VASO DE VIDRIO (Doble línea para grosor real) -->
					<!-- Borde exterior -->
					<path
						d={GLASS_OUTER}
						stroke="rgba(200, 195, 185, 0.2)"
						stroke-width="2"
						fill="none"
						pointer-events="none"
					/>
					<!-- Borde interior (crea la ilusión de grosor del vidrio) -->
					<path
						d={GLASS_INNER}
						stroke="rgba(200, 195, 185, 0.08)"
						stroke-width="0.8"
						fill="none"
						pointer-events="none"
					/>

					<!-- Reflejo especular principal (franja izquierda del vidrio) -->
					<path
						d="M 237 80
						   C 234 120, 228 200, 222 290
						   C 219 330, 216 360, 214 380
						   L 220 380
						   C 222 360, 225 330, 228 290
						   C 234 200, 240 120, 243 80
						   Z"
						fill="url(#plm-spec-l)"
						opacity="0.9"
						pointer-events="none"
					/>

					<!-- Reflejo especular secundario (franja derecha) -->
					<path
						d="M 280 85
						   C 284 130, 290 210, 296 300
						   C 298 330, 300 350, 302 370
						   L 298 370
						   C 296 350, 294 330, 292 300
						   C 286 210, 280 130, 276 85
						   Z"
						fill="url(#plm-spec-r)"
						opacity="0.7"
						pointer-events="none"
					/>

					<!-- Brillo puntual superior en el cuello del vidrio -->
					<ellipse
						cx="248"
						cy="90"
						rx="3"
						ry="8"
						fill="white"
						opacity="0.12"
						filter="url(#plm-soft)"
					/>

					<!-- ARO DE UNIÓN ENTRE VASO Y BASE (Juntura sellada) -->
					<!-- Sombra del aro -->
					<ellipse cx="260" cy="426" rx="50" ry="6" fill="#0a0806" />
					<!-- Cuerpo del aro -->
					<ellipse cx="260" cy="424" rx="48" ry="5.5" fill="url(#plm-metal-ring)" />
					<!-- Línea luminosa en el borde del aro -->
					<ellipse
						cx="260"
						cy="423"
						rx="47"
						ry="4.5"
						stroke="rgba(255, 68, 0, 0.35)"
						stroke-width="1"
						fill="none"
					/>
					<!-- Reflejo metálico superior del aro -->
					<ellipse cx="260" cy="422" rx="42" ry="2" fill="rgba(255,255,255,0.06)" />

					<!-- BASE METÁLICA CÓNICA (forma orgánica refinada) -->
					<path
						d="M 214 424
						   C 212 424, 202 445, 196 462
						   Q 192 475, 200 480
						   Q 220 488, 260 488
						   Q 300 488, 320 480
						   Q 328 475, 324 462
						   C 318 445, 308 424, 306 424
						   Z"
						fill="url(#plm-metal)"
						stroke="#14110e"
						stroke-width="0.8"
					/>

					<!-- Reflejos en la base metálica -->
					<path
						d="M 220 430 C 218 430, 210 448, 206 462
						   Q 204 470, 208 473
						   L 214 473
						   Q 212 470, 214 462
						   C 218 448, 226 430, 228 430
						   Z"
						fill="rgba(255,255,255,0.06)"
						pointer-events="none"
					/>

					<!-- Base de apoyo inferior -->
					<ellipse cx="260" cy="486" rx="62" ry="6" fill="#0e0c0a" />
					<!-- Reflejo sutil en la base de apoyo -->
					<ellipse
						cx="260"
						cy="485"
						rx="58"
						ry="4"
						stroke="rgba(255,255,255,0.04)"
						stroke-width="0.5"
						fill="none"
					/>
				</svg>
			</div>

			<!-- CONSOLA DE CONTROL INTERACTIVO (simplificada, sin Flujo) -->
			<div class="hub-control-bar glass">
				<div class="control-status">
					<button
						type="button"
						class="cycle-toggle-btn"
						onclick={toggleAutoCycle}
						title={isAutoCycle ? 'Pausar ciclo automático' : 'Reanudar ciclo automático'}
						aria-label={isAutoCycle ? 'Pausar ciclo automático' : 'Reanudar ciclo automático'}
					>
						{#if isAutoCycle}
							<span class="icon-glyph">⏸</span>
						{:else}
							<span class="icon-glyph">▶</span>
						{/if}
						<span class="cycle-label">
							{isAutoCycle ? 'Ciclo activo' : 'Pausado'}
						</span>
					</button>

					<div class="step-indicator-pill">
						Paso <strong>{String(activeStep + 1).padStart(2, '0')}</strong> / 04
					</div>
				</div>

				<div class="nav-arrows">
					<button
						type="button"
						class="arrow-btn"
						onclick={prevStep}
						aria-label="Paso anterior"
						title="Paso anterior"
					>
						‹
					</button>
					<button
						type="button"
						class="arrow-btn"
						onclick={nextStep}
						aria-label="Siguiente paso"
						title="Siguiente paso"
					>
						›
					</button>
				</div>
			</div>
		</div>

		<!-- COLUMNA DERECHA: 03 Desarrollo y despliegue & 04 Acompañamiento -->
		<div class="steps-column steps-right">
			<!-- PASO 03 -->
			<div
				class="step-card"
				class:is-active={activeStep === 2}
				onclick={() => selectStep(2)}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectStep(2)}
				role="button"
				tabindex="0"
				aria-label="Paso 03: {steps[2].title}"
			>
				<span class="card-port port-left" aria-hidden="true"></span>
				<div class="card-inner">
					<div class="card-topline">
						<span class="step-badge">{phases[2].subtitle}</span>
						<span class="thermal-led" aria-hidden="true"></span>
					</div>
					<div class="card-content">
						<div class="step-num-wrap">
							<span class="step-number">03</span>
						</div>
						<div class="step-text-body">
							<h3 class="heading-sm step-title">{steps[2].title}</h3>
							<p class="body-sm card-description">{steps[2].text}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- PASO 04 -->
			<div
				class="step-card"
				class:is-active={activeStep === 3}
				onclick={() => selectStep(3)}
				onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectStep(3)}
				role="button"
				tabindex="0"
				aria-label="Paso 04: {steps[3].title}"
			>
				<span class="card-port port-left" aria-hidden="true"></span>
				<div class="card-inner">
					<div class="card-topline">
						<span class="step-badge">{phases[3].subtitle}</span>
						<span class="thermal-led" aria-hidden="true"></span>
					</div>
					<div class="card-content">
						<div class="step-num-wrap">
							<span class="step-number">04</span>
						</div>
						<div class="step-text-body">
							<h3 class="heading-sm step-title">{steps[3].title}</h3>
							<p class="body-sm card-description">{steps[3].text}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- VISTA SECUENCIAL ADAPTADA PARA MÓVILES -->
	<div class="mobile-pipeline-wrapper">
		<div class="mobile-hub-preview">
			<div class="mobile-lamp-mini">
				<svg
					viewBox="190 20 140 470"
					class="mobile-mini-svg"
					role="img"
					aria-label="Lámpara de magma Makma"
				>
					<!-- Reutiliza los defs del SVG principal vía estilos compartidos -->
					<defs>
						<clipPath id="plm-glass-clip-m">
							<path d={GLASS_INNER} />
						</clipPath>
						<linearGradient id="plm-liquid-m" x1="0" y1="1" x2="0" y2="0">
							<stop offset="0%" stop-color="#3a1005" />
							<stop offset="100%" stop-color="#080200" />
						</linearGradient>
						<linearGradient id="plm-metal-m" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="#2a2521" />
							<stop offset="50%" stop-color="#8a7f73" />
							<stop offset="100%" stop-color="#1e1a17" />
						</linearGradient>
						<filter id="plm-glow-m" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
						</filter>
					</defs>

					<!-- Tapa -->
					<path d="M 245 28 Q 260 24, 275 28 L 284 72 L 236 72 Z" fill="url(#plm-metal-m)" />
					<ellipse cx="260" cy="72" rx="25" ry="4" fill="#3a332d" />

					<!-- Vaso -->
					<g clip-path="url(#plm-glass-clip-m)">
						<rect x="195" y="70" width="130" height="360" fill="url(#plm-liquid-m)" />
						<ellipse cx="260" cy="416" rx="40" ry="12" fill="#ff4400" filter="url(#plm-glow-m)" />
						{#each blobs as blob (blob.id)}
							{@const isSelected = activeStep === blob.stepIndex}
							<g transform="translate({blob.x}, {blob.y})">
								<ellipse
									cx="0"
									cy="0"
									rx={blob.rx * 0.9}
									ry={blob.ry * 0.9}
									fill={isSelected ? '#ff5500' : '#c03000'}
								/>
								<text
									x="0"
									y="4"
									text-anchor="middle"
									font-family="var(--font-serif)"
									font-size="12"
									font-weight="bold"
									fill={isSelected ? '#140602' : '#ffffff'}
								>
									{String(blob.stepIndex + 1).padStart(2, '0')}
								</text>
							</g>
						{/each}
					</g>
					<path d={GLASS_OUTER} stroke="rgba(200,195,185,0.15)" stroke-width="1.5" fill="none" />

					<!-- Aro y base -->
					<ellipse cx="260" cy="424" rx="48" ry="5.5" fill="#1a1613" />
					<path
						d="M 214 424 C 212 424, 202 445, 196 462 Q 192 475, 200 480 Q 220 488, 260 488 Q 300 488, 320 480 Q 328 475, 324 462 C 318 445, 308 424, 306 424 Z"
						fill="url(#plm-metal-m)"
					/>
					<ellipse cx="260" cy="486" rx="62" ry="6" fill="#0e0c0a" />
				</svg>
			</div>

			<div class="mobile-phase-bar">
				<span class="mobile-badge-live">Etapa activa</span>
				<h4 class="heading-sm mobile-phase-name">
					{String(activeStep + 1).padStart(2, '0')} · {steps[activeStep].title}
				</h4>
				<div class="mobile-tab-dots" role="tablist" aria-label="Seleccionar etapa">
					{#each steps as step, i (step.title)}
						<button
							type="button"
							class="dot-tab"
							class:active={activeStep === i}
							onclick={() => selectStep(i)}
							aria-label="Ir a paso {i + 1}"
						>
							{i + 1}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Lista de pasos con espina dorsal térmica -->
		<div class="mobile-steps-spine">
			{#each steps as step, i (step.title)}
				<div
					class="mobile-step-card"
					class:is-active={activeStep === i}
					onclick={() => selectStep(i)}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectStep(i)}
					role="button"
					tabindex="0"
				>
					<div class="mobile-card-node" class:glow={activeStep === i}>
						{String(i + 1).padStart(2, '0')}
					</div>
					<div class="mobile-card-body">
						<span class="step-badge">{phases[i].subtitle}</span>
						<h3 class="heading-sm">{step.title}</h3>
						<p class="body-sm card-description">{step.text}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.process-map-wrapper {
		position: relative;
		width: 100%;
		isolation: isolate;
	}

	/* CONTENEDOR DEL MAPA MENTAL EN ESCRITORIO */
	.mindmap-container {
		display: grid;
		grid-template-columns: minmax(260px, 1fr) 380px minmax(260px, 1fr);
		align-items: center;
		gap: var(--space-4);
		width: 100%;
		max-width: 1200px;
		margin-inline: auto;
	}

	.steps-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-7);
		z-index: 2;
	}

	.lamp-hub-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-4);
		position: relative;
		z-index: 1;
	}

	.lamp-circuit-canvas {
		position: relative;
		width: 100%;
		max-width: 420px;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 0 40px rgba(255, 68, 0, 0.12));
	}

	.hub-svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	/* Conductos de circuito */
	.active-conduit {
		opacity: 0;
		transition: opacity var(--duration) var(--ease);
	}
	.active-conduit.is-live {
		opacity: 1;
	}

	/* Gotas de magma en el SVG */
	.hub-blob-element {
		cursor: pointer;
		outline: none;
		transition: transform 0.3s var(--ease-viscous);
	}
	.hub-blob-element:hover {
		transform: scale(1.1);
	}
	.hub-blob-element.is-active-blob {
		filter: drop-shadow(0 0 12px rgba(255, 68, 0, 0.7));
	}

	/* Texto dentro de las gotas */
	.blob-step-text {
		pointer-events: none;
		user-select: none;
	}

	/* TARJETAS DE PASO (Double-Bezel) */
	.step-card {
		position: relative;
		display: flex;
		align-items: center;
		background: var(--surface-raised);
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		padding: var(--space-1);
		cursor: pointer;
		box-shadow: inset 0 1px 0 var(--glass-highlight);
		transition:
			border-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease-viscous),
			transform var(--duration) var(--ease-viscous),
			background-color var(--duration) var(--ease);
		outline: none;
	}

	.step-card:hover {
		border-color: var(--glow-thermal-border);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			var(--glow-thermal-sm);
		transform: translateY(-2px);
	}

	.step-card.is-active {
		border-color: var(--brand);
		background: var(--surface-overlay);
		box-shadow:
			inset 0 1px 0 var(--glass-highlight),
			0 0 30px rgba(255, 68, 0, 0.22);
		transform: translateY(-2px) scale(1.01);
	}

	.step-card:focus-visible {
		box-shadow:
			0 0 0 2px var(--focus),
			0 0 30px rgba(255, 68, 0, 0.22);
	}

	.card-inner {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-5);
		border-radius: calc(var(--radius-lg) - 4px);
		background: var(--surface);
		border: 1px solid var(--line-hairline);
	}

	.card-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
	}

	.step-badge {
		font-family: var(--font-sans);
		font-size: 11px;
		line-height: 14px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--ink-muted);
		transition: color var(--duration) var(--ease);
	}
	.step-card.is-active .step-badge {
		color: var(--brand-text);
	}

	.thermal-led {
		width: 6px;
		height: 6px;
		border-radius: var(--radius-full);
		background: var(--line-strong);
		transition:
			background-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease);
	}
	.step-card.is-active .thermal-led {
		background: var(--brand);
		box-shadow: 0 0 8px var(--brand);
	}

	.card-content {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
	}

	.step-num-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
		flex: none;
	}

	.step-number {
		font-family: var(--font-serif);
		font-size: 26px;
		line-height: 1;
		color: var(--ink-muted);
		transition:
			color var(--duration) var(--ease),
			transform var(--duration) var(--ease-viscous);
	}
	.step-card.is-active .step-number {
		color: var(--brand-text);
		transform: scale(1.08);
	}

	.step-text-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.step-title {
		font-family: var(--font-serif);
		font-size: 18px;
		line-height: 1.3;
		color: var(--ink);
		margin: 0;
	}

	.card-description {
		color: var(--ink-muted);
		line-height: 1.5;
		margin: 0;
	}

	/* Terminales magnéticos de los bordes de tarjeta */
	.card-port {
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: var(--radius-full);
		background: var(--line-strong);
		border: 1px solid var(--surface);
		z-index: 3;
		transition:
			background-color var(--duration) var(--ease),
			box-shadow var(--duration) var(--ease);
	}
	.port-right {
		right: -4px;
		top: 50%;
		transform: translateY(-50%);
	}
	.port-left {
		left: -4px;
		top: 50%;
		transform: translateY(-50%);
	}
	.step-card.is-active .card-port {
		background: var(--brand);
		box-shadow: 0 0 10px var(--brand);
	}

	/* BARRA DE CONTROL EN LA BASE */
	.hub-control-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-full);
		width: 100%;
		max-width: 340px;
		font-size: 13px;
	}

	.control-status {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.cycle-toggle-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		background: transparent;
		border: 0;
		color: var(--ink);
		font-family: var(--font-sans);
		font-size: 12px;
		font-weight: 500;
		cursor: pointer;
		padding: 0;
	}
	.cycle-toggle-btn:hover {
		color: var(--brand-text);
	}

	.icon-glyph {
		font-size: 11px;
		color: var(--brand);
	}

	.step-indicator-pill {
		font-size: 12px;
		color: var(--ink-muted);
	}
	.step-indicator-pill strong {
		color: var(--ink);
	}

	.nav-arrows {
		display: flex;
		align-items: center;
		gap: 2px;
	}

	.arrow-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: var(--radius-full);
		background: var(--surface-raised);
		border: 1px solid var(--line);
		color: var(--ink);
		font-size: 16px;
		line-height: 1;
		cursor: pointer;
		transition:
			background-color var(--duration) var(--ease),
			border-color var(--duration) var(--ease);
	}
	.arrow-btn:hover {
		background: var(--surface);
		border-color: var(--glow-thermal-border);
	}

	/* VISTA MÓVIL SECUENCIAL */
	.mobile-pipeline-wrapper {
		display: none;
		flex-direction: column;
		gap: var(--space-6);
		width: 100%;
	}

	@media (max-width: 960px) {
		.mindmap-container {
			display: none;
		}
		.mobile-pipeline-wrapper {
			display: flex;
		}

		.mobile-hub-preview {
			display: flex;
			align-items: center;
			gap: var(--space-5);
			padding: var(--space-5);
			background: var(--surface-raised);
			border: 1px solid var(--glow-thermal-border);
			border-radius: var(--radius-lg);
			box-shadow:
				inset 0 1px 0 var(--glass-highlight),
				var(--glow-thermal-sm);
		}

		.mobile-lamp-mini {
			width: 72px;
			height: 140px;
			flex: none;
		}
		.mobile-mini-svg {
			width: 100%;
			height: 100%;
			filter: drop-shadow(0 0 12px rgba(255, 68, 0, 0.25));
		}

		.mobile-phase-bar {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
			flex: 1;
		}

		.mobile-badge-live {
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: var(--brand-text);
			font-weight: 600;
		}

		.mobile-phase-name {
			margin: 0;
			font-size: 18px;
		}

		.mobile-tab-dots {
			display: flex;
			gap: var(--space-2);
			margin-top: var(--space-1);
		}

		.dot-tab {
			width: 32px;
			height: 32px;
			border-radius: var(--radius-full);
			background: var(--surface);
			border: 1px solid var(--line-strong);
			color: var(--ink-muted);
			font-size: 13px;
			font-family: var(--font-serif);
			font-weight: bold;
			cursor: pointer;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			transition:
				background-color var(--duration) var(--ease),
				border-color var(--duration) var(--ease),
				color var(--duration) var(--ease);
		}

		.dot-tab.active {
			background: var(--brand);
			color: var(--on-brand);
			border-color: var(--brand);
			box-shadow: 0 0 12px var(--brand);
		}

		/* Espina dorsal */
		.mobile-steps-spine {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: var(--space-4);
			padding-left: var(--space-4);
			border-left: 2px solid var(--line);
		}

		.mobile-step-card {
			position: relative;
			display: flex;
			align-items: flex-start;
			gap: var(--space-4);
			padding: var(--space-5);
			background: var(--surface-raised);
			border: 1px solid var(--line);
			border-radius: var(--radius-lg);
			cursor: pointer;
			transition:
				border-color var(--duration) var(--ease),
				box-shadow var(--duration) var(--ease);
		}

		.mobile-step-card.is-active {
			border-color: var(--brand);
			background: var(--surface-overlay);
			box-shadow:
				inset 0 1px 0 var(--glass-highlight),
				var(--glow-thermal-sm);
		}

		.mobile-card-node {
			position: absolute;
			left: calc(-1 * var(--space-4) - 13px);
			top: var(--space-5);
			width: 24px;
			height: 24px;
			border-radius: var(--radius-full);
			background: var(--surface);
			border: 2px solid var(--line-strong);
			color: var(--ink-muted);
			font-size: 11px;
			font-family: var(--font-serif);
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			transition:
				background-color var(--duration) var(--ease),
				border-color var(--duration) var(--ease),
				color var(--duration) var(--ease);
		}

		.mobile-card-node.glow {
			background: var(--brand);
			color: var(--on-brand);
			border-color: var(--brand);
			box-shadow: 0 0 10px var(--brand);
		}

		.mobile-card-body {
			display: flex;
			flex-direction: column;
			gap: var(--space-2);
		}

		.mobile-card-body h3 {
			margin: 0;
			font-size: 17px;
		}
	}
</style>
