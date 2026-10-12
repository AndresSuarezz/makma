Tarjeta que presenta un servicio de Makma: número, título, una frase y la lista de lo que incluye.

**Estructura.** `mk-card` sobre `surface-raised`, con borde `line` de 1 px y `radius-lg`; índice en `brand-text`, título en `heading`, texto en `body-sm` con `ink-muted`, lista separada por `line`, enlace `mk-btn--link` al final. Sin sombras: en hover el borde pasa a `line-strong`.

**Qué aporta quien lo usa.** Número de dos cifras, título, una frase, de dos a cuatro ítems (nombre + aclaración) y el destino del enlace.

**Hacer**

- Cuatro tarjetas como máximo por fila de servicios, en grilla `auto-fit` desde 280 px.
- Describe lo que cambia para el cliente, no la herramienta ("conectados a tu catálogo", no "integración vía API").

**No hacer**

- Iconos decorativos en la esquina, borde de color a un lado o relleno naranja: el naranja se reserva para acciones y franjas de marca.
- Mostrar precios dentro de la tarjeta de servicio: van en `PlanCard`.
