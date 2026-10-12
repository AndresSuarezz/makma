<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Cursor de magma: una bolita naranja exactamente en el puntero (para apuntar con precisión), un
	 * halo que la sigue con un poco de retraso y partículas diminutas que se apagan en menos de un
	 * segundo. No bloquea clics (pointer-events: none), solo se activa con ratón (hover + puntero
	 * fino), devuelve el cursor nativo sobre campos de texto y desaparece del todo sin JavaScript.
	 */

	const MAX_PARTICLES = 48;
	/** Píxeles recorridos entre una partícula y la siguiente. */
	const SPACING = 14;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		age: number;
		life: number;
		size: number;
	}

	const LINKS =
		'a[href], button, summary, label, select, [role="tab"], input[type="checkbox"], input[type="radio"], input[type="submit"], [data-cursor="link"]';
	const TEXT_FIELDS =
		'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea';
	/** Superficies naranja: ahí el naranja no se ve, así que la bolita pasa a negro (on-brand). */
	const ON_BRAND = '.on-brand-surface, [data-cursor="ink"], .btn.primary';

	let core: HTMLDivElement;
	let halo: HTMLDivElement;
	let canvas: HTMLCanvasElement;

	// Estado visual: lo leen los estilos mediante atributos data-*
	let visible = $state(false);
	let pressed = $state(false);
	let mode = $state<'idle' | 'link' | 'text'>('idle');
	let tone = $state<'brand' | 'ink'>('brand');

	onMount(() => {
		if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const root = document.documentElement;
		const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
		const particles: Particle[] = [];

		let dpr = 1;
		let tx = 0;
		let ty = 0;
		let hx = 0;
		let hy = 0;
		let travelled = 0;
		let raf = 0;
		let last = 0;
		let active = false;
		let colors = { brand: '#ff4400', ink: '#0a0807' };

		function readColors() {
			const style = getComputedStyle(root);
			colors = {
				brand: style.getPropertyValue('--brand').trim() || '#ff4400',
				ink: style.getPropertyValue('--on-brand').trim() || '#0a0807'
			};
		}

		function resize() {
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(window.innerWidth * dpr);
			canvas.height = Math.round(window.innerHeight * dpr);
		}

		function setState(el: Element | null) {
			const text = !!el?.closest(TEXT_FIELDS);
			const link = !text && !!el?.closest(LINKS);
			tone = el?.closest(ON_BRAND) ? 'ink' : 'brand';
			mode = text ? 'text' : link ? 'link' : 'idle';
		}

		function spawn() {
			particles.push({
				x: tx + (Math.random() - 0.5) * 6,
				y: ty + (Math.random() - 0.5) * 6,
				// Suben un poco, como chispas de magma, y se dispersan de lado
				vx: (Math.random() - 0.5) * 22,
				vy: -8 - Math.random() * 22,
				age: 0,
				life: 450 + Math.random() * 400,
				size: 0.8 + Math.random() * 1.6
			});
			if (particles.length > MAX_PARTICLES) particles.shift();
		}

		function frame(now: number) {
			const dt = Math.min(now - last, 64);
			last = now;
			const reduced = reducedQuery.matches;

			// El halo persigue a la bolita; con movimiento reducido la sigue sin retraso.
			const k = reduced ? 1 : 1 - Math.exp(-dt / 70);
			hx += (tx - hx) * k;
			hy += (ty - hy) * k;
			core.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
			halo.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;

			// Partículas
			ctx!.clearRect(0, 0, canvas.width, canvas.height);
			if (particles.length) {
				ctx!.save();
				ctx!.scale(dpr, dpr);
				for (let i = particles.length - 1; i >= 0; i--) {
					const p = particles[i];
					p.age += dt;
					if (p.age >= p.life) {
						particles.splice(i, 1);
						continue;
					}
					const t = p.age / p.life;
					p.x += (p.vx * dt) / 1000;
					p.y += (p.vy * dt) / 1000;
					ctx!.globalAlpha = (1 - t) * 0.85;
					ctx!.fillStyle = tone === 'ink' ? colors.ink : colors.brand;
					ctx!.beginPath();
					ctx!.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
					ctx!.fill();
				}
				ctx!.restore();
			}

			// Sigue animando solo mientras haya algo que mover; si no, se duerme.
			const settled = Math.abs(tx - hx) < 0.2 && Math.abs(ty - hy) < 0.2;
			if (particles.length || !settled) raf = requestAnimationFrame(frame);
			else raf = 0;
		}

		function wake() {
			if (raf) return;
			last = performance.now();
			raf = requestAnimationFrame(frame);
		}

		function onMove(event: PointerEvent) {
			if (event.pointerType !== 'mouse') return;
			const dx = event.clientX - tx;
			const dy = event.clientY - ty;
			tx = event.clientX;
			ty = event.clientY;

			if (!active) {
				active = true;
				hx = tx;
				hy = ty;
				root.classList.add('magma-cursor');
				visible = true;
			} else if (!reducedQuery.matches) {
				travelled += Math.hypot(dx, dy);
				// Pocas partículas por evento: nunca más de tres, aunque el ratón vuele
				for (let n = 0; travelled > SPACING && n < 3; n++) {
					spawn();
					travelled -= SPACING;
				}
				travelled %= SPACING;
			}

			setState(event.target instanceof Element ? event.target : null);
			wake();
		}

		function onLeave() {
			active = false;
			root.classList.remove('magma-cursor');
			visible = false;
		}

		const onDown = () => (pressed = true);
		const onUp = () => (pressed = false);

		readColors();
		resize();

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerdown', onDown, { passive: true });
		window.addEventListener('pointerup', onUp, { passive: true });
		window.addEventListener('resize', resize);
		document.documentElement.addEventListener('pointerleave', onLeave);
		const themeObserver = new MutationObserver(readColors);
		themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

		return () => {
			cancelAnimationFrame(raf);
			root.classList.remove('magma-cursor');
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			window.removeEventListener('resize', resize);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			themeObserver.disconnect();
		};
	});
</script>

<canvas class="particles" bind:this={canvas} aria-hidden="true"></canvas>
<div
	class="halo"
	bind:this={halo}
	data-visible={visible}
	data-state={mode}
	data-tone={tone}
	data-pressed={pressed}
	aria-hidden="true"
>
	<span></span>
</div>
<div
	class="core"
	bind:this={core}
	data-visible={visible}
	data-state={mode}
	data-tone={tone}
	data-pressed={pressed}
	aria-hidden="true"
>
	<span></span>
</div>

<style>
	.particles,
	.halo,
	.core {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
		pointer-events: none;
	}
	.particles {
		width: 100vw;
		height: 100vh;
	}
	.halo,
	.core {
		width: 0;
		height: 0;
		opacity: 0;
		transition: opacity var(--duration) var(--ease);
	}
	.halo[data-visible='true'],
	.core[data-visible='true'] {
		opacity: 1;
	}
	/* Sobre campos de texto vuelve el cursor nativo (I-beam) */
	.halo[data-state='text'],
	.core[data-state='text'] {
		opacity: 0;
	}

	span {
		position: absolute;
		display: block;
		border-radius: var(--radius-full);
		transition:
			width var(--duration) var(--ease),
			height var(--duration) var(--ease),
			margin var(--duration) var(--ease),
			background-color var(--duration) var(--ease),
			border-color var(--duration) var(--ease);
	}

	/* Bolita: marca el punto exacto del clic */
	.core span {
		width: 10px;
		height: 10px;
		margin: -5px 0 0 -5px;
		background: radial-gradient(circle at 35% 35%, var(--brand-hover), var(--brand) 70%);
		box-shadow: 0 0 10px 1px rgb(255 68 0 / 0.55);
	}
	.core[data-tone='ink'] span {
		background: var(--on-brand);
		box-shadow: none;
	}
	.core[data-state='link'] span {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
	}
	.core[data-pressed='true'] span {
		width: 6px;
		height: 6px;
		margin: -3px 0 0 -3px;
	}

	/* Halo: anillo blando que llega un instante después */
	.halo span {
		width: 28px;
		height: 28px;
		margin: -14px 0 0 -14px;
		border: 1.5px solid rgb(255 68 0 / 0.5);
		background: rgb(255 68 0 / 0.1);
	}
	.halo[data-tone='ink'] span {
		border-color: var(--on-brand);
		background: transparent;
	}
	.halo[data-state='link'] span {
		width: 46px;
		height: 46px;
		margin: -23px 0 0 -23px;
	}
	.halo[data-pressed='true'] span {
		width: 20px;
		height: 20px;
		margin: -10px 0 0 -10px;
	}

	@media (prefers-reduced-motion: reduce) {
		span {
			transition: none;
		}
	}

	/* El cursor nativo se oculta solo cuando el JS ya está dibujando el propio (clase puesta por el script) */
	:global(html.magma-cursor),
	:global(html.magma-cursor *) {
		cursor: none !important;
	}
	:global(
		html.magma-cursor
			:is(
				input:not([type='checkbox']):not([type='radio']):not([type='submit']):not([type='button']),
				textarea
			)
	) {
		cursor: text !important;
	}
</style>
