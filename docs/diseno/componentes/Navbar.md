Barra superior de página: nombre Makma, enlaces a las secciones, cambio de tema y el botón de cotización.

**Estructura.** `mk-nav` de `nav-height` con borde inferior `line`; `mk-wordmark` (el nombre en `serif`, 32 px); `mk-nav__links` en `button` con `ink-muted`, la página activa en `ink` con subrayado `brand-text` y `aria-current="page"`; a la derecha `mk-icon-btn` para el tema y un `mk-btn--primary mk-btn--sm`.

**Qué aporta quien lo usa.** Los enlaces reales de la página y cuál está activa. Bajo 720 px los enlaces se ocultan y aparece `mk-nav__menu`, un botón de menú que quien lo usa conecta a un panel desplegable; el nombre y el botón de cotización siguen visibles.

**Hacer**

- Como mucho cinco enlaces. El orden sigue el de las secciones de la página.
- Fondo `surface` sólido, sin desenfoque ni transparencia.

**No hacer**

- Un logotipo dibujado: el nombre se escribe en tipografía, no se reconstruye.
- Marcar la página activa solo con color: el subrayado es obligatorio.
