Makma es una casa de desarrollo de software: sitios, tiendas en línea, sistemas a la medida, agentes de automatización y aplicaciones móviles. El sistema es oscuro por defecto: fondo `surface`, texto blanco hueso `ink`, y el naranja `brand` (#FF4400) como única señal de marca. El tema Hueso (`surface` claro) existe para impresión y para quien lo pida.

## Fundamentos de contenido

- Escribe en español de Colombia y en segunda persona: "tu negocio", "cotiza", "cuéntanos".
- Frases cortas que digan qué entregamos y qué cambia para el cliente. Un término técnico va acompañado de su explicación ("CI/CD: despliegues automáticos").
- Mayúscula solo en la primera palabra de titulares y botones. Sin emojis, sin signos de exclamación, sin superlativos como "el mejor" o "líder".
- Afirma solo lo que se pueda verificar: sin porcentajes, calificaciones ni cifras de clientes sin fuente. Mientras no haya casos publicados, la sección de proyectos no se rellena con inventos.
- Precios en pesos colombianos con punto de miles (`$350.000`), siempre con "desde" y diciendo qué cubren y qué es recurrente.
- Texto real del negocio: "Sitios corporativos ultrarrápidos y optimizados para SEO." · "Agentes conversacionales conectados a tu catálogo para perfilar y cerrar ventas." · "50% al empezar, 50% cuando recibes el sistema funcionando."
- La acción principal es "Cotizar por WhatsApp". Una acción primaria por vista.

## Fundamentos visuales

**Color**

- Fondo de página `surface`; tarjetas, campos y barra `surface-raised`; pie `surface-sunken`. Texto `ink`, secundario `ink-muted`.
- `brand` es un relleno: botón primario y franja de marca. Sobre `brand` el texto es `on-brand` (5.8:1), nunca blanco ni `ink`: el blanco sobre #FF4400 da 3.45:1.
- Para texto naranja (enlaces, eyebrows, números) usa `brand-text`. En tema oscuro coincide con `brand`; en el Hueso es un naranja más oscuro, porque #FF4400 sobre hueso da 2.99:1.
- En una pantalla oscura el naranja ocupa un diez por ciento o menos de la superficie. La excepción es la franja `BrandBand`, una por página como máximo.
- `danger` se parece al naranja de marca: error y éxito (`danger`, `success`) van siempre con icono y palabra, nunca solo con color.

**Tipografía**

- Titulares y citas en `serif` (Galaxie Copernicus; respaldo Georgia y Times New Roman): estilos `display-xl`, `display-lg`, `display-md`, `heading`, `heading-sm`, siempre en peso 400.
- Todo lo funcional (cuerpo, menús, botones, etiquetas, formularios) en `sans` (Styrene B; respaldo Hanken Grotesk y la fuente del sistema): `body-lg`, `body`, `body-sm`, `label`, `button`, `caption`. `label` va en mayúsculas.
- Una palabra por titular puede ir en cursiva (`accent-italic`); nunca dos.
- Bajo 640 px baja un nivel: `display-xl` a `display-lg`, `display-lg` a `display-md`.
- Las dos fuentes de marca son comerciales y este sistema no incluye sus archivos: hasta tener la licencia web, las pilas caen a Georgia y a Hanken Grotesk. Al añadir los archivos, se listan en `type.fonts` de `tokens.json` y no cambia nada más.

**Espaciado y forma**

- Escala `space-1` a `space-10`: entre secciones `space-9`, dentro de tarjetas `space-6`, entre campos `space-4`.
- Contenedor de `container-max`; texto corrido de `measure` como máximo.
- Botones y etiquetas en `radius-full`; campos en `radius-md`; tarjetas, planes y franjas en `radius-lg`.
- Bordes en lugar de sombras. Separadores decorativos `line`; bordes de controles `line-strong` (el `line` no llega a 3:1).
- Foco: anillo sólido de 2 px `focus` a 3 px del elemento; dentro de una franja de marca, `on-brand`.

**Imagen**

- La imagen de marca es el magma: manchas orgánicas negras y discos sobre naranja (`assets/Logo/logo.png`). Úsala como fondo de franja o de hero, a todo el ancho de su contenedor, sin recortar una mancha por la mitad.
- Las formas nuevas se dibujan como manchas y discos en `on-brand` sobre `brand`. Sin degradados.
- Sin fotos de stock. Si hace falta foto, retratos reales del equipo.

**Movimiento**

- Cambios de color y borde de 240 ms con `ease-out`. Las manchas pueden "respirar" muy despacio (8 s o más). Todo se detiene con `prefers-reduced-motion`.

**Iconografía**

- No hay set propio. Provisional: iconos lineales de trazo 1.5 px, `currentColor`, en 20 o 24 px (por ejemplo Lucide). Sin emojis.

**Nombre y logo**

- `logo.png` es una imagen cuadrada de 2000 × 2000 px sin nombre escrito. El nombre se escribe "Makma" en `serif` (`mk-wordmark`, 32 px en la barra). No lo dibujes ni lo reconstruyas en otro estilo.

## Dónde mirar

- Valores de color, tipografía, espaciado y medidas: `tokens.json` (es la fuente; las tarjetas de `api/` se regeneran al guardar).
- Guías y vista previa por pieza: `components/<Nombre>/README.md` (`Button`, `Tag`, `ServiceCard`, `PlanCard`, `Field`, `Navbar`, `BrandBand`).
- Estructura y textos del sitio web: `Sitio.md`.
- Imagen de marca y sus usos: `assets/Logo/README.md`.
