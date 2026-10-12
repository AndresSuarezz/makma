# Makma — sitio web de la agencia

Sitio de una sola página de **Makma**, casa de desarrollo de software (sitios, tiendas en línea, sistemas a la medida, agentes y automatización, apps móviles, consultoría IT). Mercado: Montería y la región, Colombia. Idioma del sitio y de la documentación: **español de Colombia**, segunda persona ("tu negocio", "cotiza").

## Stack

- **SvelteKit 3 + Svelte 5** (runes obligatorias: `$state`, `$derived`, `$props`, snippets; nada de `export let` ni `$:`). TypeScript estricto.
- CSS a mano con variables (sin Tailwind). Fuente local `@fontsource-variable/hanken-grotesk`.
- `@sveltejs/enhanced-img` para imágenes, `adapter-auto` (el destino de despliegue aún no está decidido; ver Pendientes).
- Vitest (pruebas unitarias), ESLint + Prettier (tabs, comillas simples).
- Docs: https://svelte.dev/docs/svelte/overview · https://svelte.dev/docs/kit. El plugin `svelte@svelte` (en `.claude/settings.json`) añade el MCP de Svelte y skills: úsalos antes de escribir componentes (`svelte-autofixer` sobre cada `.svelte` nuevo).

## Comandos

```bash
npm run dev          # servidor de desarrollo (vite)
npm run check        # svelte-check + tipos (debe quedar en 0 errores)
npm run lint         # prettier --check + eslint
npm run format       # prettier --write
npm test             # vitest --run
npm run build        # build de producción
```

Antes de dar algo por terminado: `npm run check && npm run lint && npm test && npm run build`.

En esta máquina el hook de RTK reescribe `npx` y rompe comandos como `npx sv`; usa `rtk proxy npx ...` para esos casos.

## Particularidades de SvelteKit 3 (distinto de lo que dice mucha documentación vieja)

- **No existe `$lib`.** El alias es `#lib` (subpath imports de `package.json`). Los módulos `.ts` se importan con extensión `.js`: `import { nav } from '#lib/content/site.js'`; los `.svelte` con su extensión: `#lib/components/Button.svelte`.
- **No existe `$env/dynamic/public`.** Las variables se declaran en `src/env.ts` con `defineEnvVars` y se leen con `import { PUBLIC_X } from '$app/env/public'` (privadas: `$app/env/private`). Ver `.env.example`.
- La configuración de SvelteKit (adapter, runes) está en `vite.config.ts`; no hay `svelte.config.js`.
- `<enhanced:img src="#lib/assets/...">` para imágenes locales optimizadas.

## Estructura

```
src/
  routes/+page.svelte        # la página completa (secciones: inicio, servicios, proceso, planes, contacto)
  routes/+layout.svelte      # estilos globales, Navbar y Footer (compartidos con la 404)
  routes/+error.svelte       # página de error (404 y demás), con el mismo diseño del sitio
  env.ts                     # variables de entorno (PUBLIC_WHATSAPP_NUMBER)
  lib/
    components/              # Button, Eyebrow, Navbar, PlanCard, Field, ContactForm, BrandBand, Footer,
                             # ServiceCard (en desuso) y las 3 propuestas Services{List,Tabs,Accordion}
    quote.ts                 # enlace de WhatsApp "cotizar" (con el servicio ya escrito)
    reveal.ts                # animación de aparición al hacer scroll ({@attach reveal(delay)})
    content/site.ts          # TODO el texto, servicios, pasos y precios (única fuente de contenido)
    styles/tokens.css        # tokens de diseño (colores, espaciado, radios, medidas)
    styles/global.css        # reset, tipografía (.display-xl…), utilidades
    theme.svelte.ts          # tema oscuro/hueso (estado + localStorage)
    whatsapp.ts              # construcción del enlace wa.me
    assets/brand/magma.png   # imagen de marca (fondo de hero)
docs/diseno/                 # sistema de diseño exportado de Claude Design (leer antes de tocar UI)
```

## Sistema de diseño (resumen — el detalle está en `docs/diseno/`)

Fuente de verdad de valores: `docs/diseno/tokens.json` → reflejado en `src/lib/styles/tokens.css`. Reglas de uso: `docs/diseno/sistema-de-diseno.md`. Guía por pieza: `docs/diseno/componentes/*.md`. Contenido y estructura: `docs/diseno/sitio.md`.

- **Oscuro por defecto**, tema "Hueso" (claro) opcional. `<html data-theme="dark|light">`; el script de `src/app.html` lo aplica antes de pintar.
- **Naranja `#FF4400` (`--brand`) solo como relleno** (botón primario, franja de marca). Texto naranja: `--brand-text`. Texto sobre `--brand`: **`--on-brand`, nunca blanco** (3.45:1). Naranja ≤ 10 % de la pantalla; la excepción es `BrandBand` (una por página como máximo).
- **Una acción primaria por vista**: "Cotizar por WhatsApp".
- Titulares en `--font-serif` (Galaxie Copernicus → Georgia → Times New Roman), siempre peso 400; una palabra en cursiva por titular como máximo. Resto en `--font-sans` (Styrene B → Hanken Grotesk → sistema).
- Botones/etiquetas `--radius-full`; campos `--radius-md`; tarjetas y franjas `--radius-lg`. **Bordes en lugar de sombras. Sin degradados, sin emojis, sin fotos de stock.**
- Bordes de controles con `--line-strong` (`--line` no llega a 3:1). Foco: anillo 2 px `--focus` a 3 px; dentro de superficies de marca, `--on-brand`.
- Errores/éxito: siempre icono + palabra ("Error: …"), nunca solo color.
- Bajo 640 px los titulares bajan un nivel. Todo movimiento se detiene con `prefers-reduced-motion`.
- **Aparición al hacer scroll:** elemento con clase `reveal` + `{@attach reveal(delay)}` (600 ms, 16 px, una sola vez; `delay` escalona hermanos). Solo oculta con JS (`html.js`) y se anula con movimiento reducido. En una grilla, envuelve cada celda en `.reveal-cell.reveal` para no pisar las transiciones del componente. Los enlaces de navegación son absolutos (`/#seccion`) para funcionar también desde la 404.
- No uses valores literales de color/espaciado en componentes: usa las variables.

## Reglas de contenido

- Solo afirma lo verificable: **sin porcentajes, calificaciones ni cifras de clientes sin fuente**. La sección "Proyectos" no existe hasta que haya casos reales con permiso del cliente.
- Precios en COP con punto de miles (`$350.000`), siempre con "desde", diciendo qué cubren y qué es recurrente. No mezclar instalación y suscripción en un solo precio. No marcar un plan como "popular/recomendado" sin dato real.
- Mayúscula solo en la primera palabra de titulares y botones. Sin signos de exclamación ni superlativos ("el mejor", "líder").
- Todo el texto y los precios viven en `src/lib/content/site.ts`; los componentes no llevan copy propio salvo microtextos de interfaz.

## Fuentes de marca

Galaxie Copernicus y Styrene B son comerciales y **no están en el repo**. Hasta tener la licencia web caen a Georgia y Hanken Grotesk. Al conseguir los `.woff2`: ponerlos en `static/fonts/`, declarar los `@font-face` en `global.css` con `font-display: swap` y precargar solo los pesos usados. No hay que cambiar nada más (las pilas ya los nombran primero).

## Pendientes por confirmar con el negocio (no inventar)

- **Sección "Lo que construimos":** hay tres propuestas sin tarjetas (lista editorial, pestañas, acordeón) con un selector temporal (`?servicios=lista|pestanas|acordeon`). Al elegir una: borrar las otras dos y `ServiceCard.svelte`, quitar el selector y la variable `variant` de `+page.svelte`, y actualizar `docs/diseno/componentes/ServiceCard.md`.

- El documento de negocio se titula **"Mantech"** y habla de Montería; el sitio es **Makma**. Confirmar que es el mismo negocio y la ciudad.
- Número de WhatsApp real (`PUBLIC_WHATSAPP_NUMBER`), correo y dirección. Sin número, los botones llevan a `#contacto` y el formulario avisa que no hay canal configurado.
- Si los precios incluyen IVA; precio de consultoría IT ($50.000: ¿por visita, hora o equipo?); precio de "Sistema de gestión" (el original no tenía signo de pesos); montos de las suscripciones.
- Política de tratamiento de datos (Ley 1581 de 2012) y términos y condiciones: hay un `TODO` en `ContactForm.svelte` para enlazar la política; el pie de página aún no los enlaza.
- Dónde se despliega (adapter): el documento de negocio menciona VPS; también hay cuenta de Vercel disponible. Cambiar el adapter en `vite.config.ts` cuando se decida.
- Versión vectorial (SVG) del logo y WebP/AVIF ligero de `magma.png` (1.3 MB; `enhanced-img` ya genera variantes en el build).

## Convenciones de código

- Un componente por archivo, PascalCase, props tipadas con `$props()`. Estilos en el bloque `<style>` del componente (con ámbito); solo lo transversal va en `global.css`.
- Estado compartido en módulos `*.svelte.ts`. Efectos (`$effect`) solo cuando no se pueda derivar con `$derived`.
- Accesibilidad no negociable: un `<h1>`, jerarquía de títulos, `aria-current` en navegación, etiquetas visibles en formularios, objetivos táctiles ≥ 40 px, contraste ≥ 4.5:1 en ambos temas.
- Lógica pura (formato, enlaces, validación) en `.ts` con prueba `*.spec.ts` al lado (vitest exige al menos una aserción por prueba).
- Commits en español, en imperativo y cortos ("Agrega sección de planes").
