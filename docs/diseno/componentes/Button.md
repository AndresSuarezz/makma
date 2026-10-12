Botón en forma de píldora para las acciones de la página: una primaria por vista, el resto secundarias o enlaces.

**Variantes.** `mk-btn--primary` (relleno `brand`, texto `on-brand`), `mk-btn--secondary` (borde `line-strong`), `mk-btn--link` (texto `brand-text` subrayado), `mk-btn--ink` (relleno `on-brand`, texto `brand`; solo dentro de `BrandBand` y de un `PlanCard` destacado). Alto 48 px; `mk-btn--sm` 40 px.

**Qué aporta quien lo usa.** El texto con un verbo ("Cotizar por WhatsApp"), `href` si navega o `type="button"` si actúa, y `disabled` cuando no aplique. Estilo de texto: `button`.

**Hacer**

- Un solo `mk-btn--primary` por vista; el resto `mk-btn--secondary` o `mk-btn--link`.
- Etiquetas de máximo tres palabras, en minúscula salvo la inicial.
- Icono de flecha solo si el botón navega fuera de la vista actual.

**No hacer**

- Texto blanco sobre `brand`: da 3.45:1. Siempre `on-brand`.
- Botones con solo icono sin `aria-label`.
- Un anillo de foco distinto del definido: 2 px `focus` a 3 px; dentro de una franja de marca, `on-brand`.
