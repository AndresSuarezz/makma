<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Fondo de magma para el hero: resplandores naranja borrosos y bolas de magma que flotan despacio.
	 * Canvas 2D a baja resolución (sin librerías): los gradientes escalados quedan suaves, así que el
	 * desenfoque sale casi gratis. Colores tomados de los tokens, cambian con el tema, se pausa fuera
	 * de pantalla y con `prefers-reduced-motion` se dibuja un solo cuadro.
	 */

	/** Cuántos píxeles del canvas por píxel de pantalla. Más bajo = más borroso y más barato. */
	const SCALE = 0.3;
	/** Cuadros por segundo; el movimiento es lento, 30 basta y ahorra batería. */
	const FRAME_MS = 1000 / 30;

	interface Blob {
		/** Posición media y amplitud del recorrido, como fracción del ancho/alto. */
		x: number;
		y: number;
		ax: number;
		ay: number;
		/** Velocidades (rad/s) y fases del recorrido. */
		sx: number;
		sy: number;
		px: number;
		py: number;
		/** Radio como fracción del lado mayor. */
		r: number;
		color: 'glow' | 'hot' | 'deep';
		/** Bola con borde definido (magma) en vez de resplandor difuso. */
		ball: boolean;
	}

	// Resplandores grandes y difusos (fondo) + bolas de magma más pequeñas y nítidas (primer plano).
	const blobs: Blob[] = [
		{
			x: 0.78,
			y: 0.35,
			ax: 0.1,
			ay: 0.12,
			sx: 0.11,
			sy: 0.15,
			px: 0,
			py: 1,
			r: 0.5,
			color: 'glow',
			ball: false
		},
		{
			x: 0.35,
			y: 0.85,
			ax: 0.14,
			ay: 0.08,
			sx: 0.09,
			sy: 0.12,
			px: 2,
			py: 4,
			r: 0.42,
			color: 'deep',
			ball: false
		},
		{
			x: 0.95,
			y: 0.9,
			ax: 0.08,
			ay: 0.1,
			sx: 0.13,
			sy: 0.1,
			px: 5,
			py: 2,
			r: 0.4,
			color: 'hot',
			ball: false
		},
		{
			x: 0.82,
			y: 0.3,
			ax: 0.07,
			ay: 0.3,
			sx: 0.17,
			sy: 0.23,
			px: 1,
			py: 0,
			r: 0.13,
			color: 'hot',
			ball: true
		},
		{
			x: 0.66,
			y: 0.6,
			ax: 0.1,
			ay: 0.25,
			sx: 0.21,
			sy: 0.18,
			px: 3,
			py: 2,
			r: 0.09,
			color: 'glow',
			ball: true
		},
		{
			x: 0.9,
			y: 0.55,
			ax: 0.05,
			ay: 0.3,
			sx: 0.15,
			sy: 0.27,
			px: 4,
			py: 5,
			r: 0.17,
			color: 'glow',
			ball: true
		},
		{
			x: 0.52,
			y: 0.25,
			ax: 0.12,
			ay: 0.2,
			sx: 0.19,
			sy: 0.14,
			px: 6,
			py: 3,
			r: 0.07,
			color: 'hot',
			ball: true
		},
		{
			x: 0.75,
			y: 0.85,
			ax: 0.09,
			ay: 0.15,
			sx: 0.12,
			sy: 0.2,
			px: 2,
			py: 6,
			r: 0.1,
			color: 'hot',
			ball: true
		}
	];

	let canvas: HTMLCanvasElement;

	/** Lee un token de color (#rrggbb) y lo devuelve como "r, g, b". */
	function rgb(token: string, fallback: string): string {
		const hex =
			getComputedStyle(document.documentElement).getPropertyValue(token).trim() || fallback;
		const n = parseInt(hex.replace('#', ''), 16);
		return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		let palette = { glow: '', hot: '', deep: '' };
		let width = 0;
		let height = 0;
		let raf = 0;
		let last = 0;
		let visible = true;

		function readPalette() {
			palette = {
				glow: rgb('--brand', '#ff4400'),
				hot: rgb('--brand-hover', '#ff6a33'),
				// En oscuro, brand-soft es un marrón rojizo; en Hueso, un durazno: ambos dan profundidad.
				deep: rgb('--brand-soft', '#3b1607')
			};
		}

		function resize() {
			width = Math.max(2, Math.round(canvas.clientWidth * SCALE));
			height = Math.max(2, Math.round(canvas.clientHeight * SCALE));
			canvas.width = width;
			canvas.height = height;
		}

		function draw(time: number) {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			// Mezcla normal (no aditiva): al sumar luz los naranjas se salen de la paleta hacia el amarillo.
			ctx.globalCompositeOperation = 'source-over';
			const side = Math.max(width, height);

			for (const b of blobs) {
				const x = (b.x + b.ax * Math.sin(time * b.sx + b.px)) * width;
				const y = (b.y + b.ay * Math.sin(time * b.sy + b.py)) * height;
				const r = b.r * side;
				const c = palette[b.color];
				const g = ctx.createRadialGradient(x, y, 0, x, y, r);
				if (b.ball) {
					g.addColorStop(0, `rgba(${palette.hot}, 0.95)`);
					g.addColorStop(0.55, `rgba(${c}, 0.8)`);
					g.addColorStop(1, `rgba(${c}, 0)`);
				} else {
					g.addColorStop(0, `rgba(${c}, 0.55)`);
					g.addColorStop(1, `rgba(${c}, 0)`);
				}
				ctx.fillStyle = g;
				ctx.fillRect(x - r, y - r, r * 2, r * 2);
			}
		}

		function loop(now: number) {
			raf = requestAnimationFrame(loop);
			if (now - last < FRAME_MS) return;
			last = now;
			draw(now / 1000);
		}

		function start() {
			if (raf || reduced.matches || !visible) return;
			raf = requestAnimationFrame(loop);
		}
		function stop() {
			cancelAnimationFrame(raf);
			raf = 0;
		}

		function refresh() {
			readPalette();
			resize();
			// Con movimiento reducido (o en pausa) se dibuja un cuadro fijo.
			draw(performance.now() / 1000);
		}

		refresh();
		start();

		const resizeObserver = new ResizeObserver(refresh);
		resizeObserver.observe(canvas);

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) start();
			else stop();
		});
		visibilityObserver.observe(canvas);

		// Cambio de tema: html[data-theme] cambia y la paleta se vuelve a leer.
		const themeObserver = new MutationObserver(refresh);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		const onMotionChange = () => (reduced.matches ? stop() : start());
		reduced.addEventListener('change', onMotionChange);

		return () => {
			stop();
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			themeObserver.disconnect();
			reduced.removeEventListener('change', onMotionChange);
		};
	});
</script>

<div class="magma" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.magma {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		/* Se funde con la sección siguiente en lugar de cortarse con una línea dura */
		-webkit-mask-image: linear-gradient(to bottom, #000 72%, transparent);
		mask-image: linear-gradient(to bottom, #000 72%, transparent);
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
		/* Un poco de desenfoque extra suaviza el borde de las bolas sin costo apreciable */
		filter: blur(6px);
	}
</style>
