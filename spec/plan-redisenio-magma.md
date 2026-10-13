# Plan de Rediseño y Elevación Visual: Esencia de Magma & High-End UI

> **Documento de especificación y arquitectura de diseño para Makma**  
> **Inspiración central:** Dinámica lumínica y fluida de las lámparas de magma (calor, viscosidad, vidrio translúcido, gotas orgánicas ascendentes, resplandor ámbar/obsidiana) combinada con el estándar de agencia de alto nivel (*Awwwards / Linear-tier*).

---

## 1. Visión y Concepto Estético: La Lámpara de Magma

La lámpara de magma es el ADN de Makma: no es un degradado decorativo estático, es **materia viva, calor y tecnología en movimiento continuo**.

### Elementos visuales transferidos al código:
1. **La Cápsula de Vidrio (The Glass Vessel):**
   - Paneles con efecto de refracción y desenfoque (`backdrop-filter: blur(20px) saturate(1.4)`), borde biselado superior con reflejo de luz (`inset 0 1px 0 var(--glass-highlight)`) y contornos mecánicos precisos tipo *Double-Bezel*.
2. **El Núcleo Térmico (Thermal Glow & Incandescencia):**
   - Iluminación ambiental cálida que emana desde el fondo o desde el interior de las tarjetas activas. Naranja puro `#FF4400` y ámbar ardiente `#FF6A33` sobre negros carbón y obsidiana (`#0E0C0B`), con resplandores suaves (`box-shadow: 0 0 50px -15px rgba(255, 68, 0, 0.3)`).
3. **Viscosidad y Morfología Orgánica (Fluid Blobs & Buoyancy):**
   - Formas orgánicas vivas que respiran y cambian de curvatura lentamente (`border-radius` morfológico con animaciones suaves de 12s a 18s).
   - Separadores de sección con transiciones térmicas en vez de líneas secas cortadas.
4. **Cinemática Lenta y Háptica (Viscous Motion Dynamics):**
   - Curvas de aceleración tipo fluido viscoso: `cubic-bezier(0.25, 1, 0.5, 1)` y `cubic-bezier(0.32, 0.72, 0, 1)`.
   - Micro-compresión háptica en botones (`active:scale(0.98)`) y partículas que responden con inercia.

---

## 2. Rediseño Profundo: Sección "Planes y Precios"

La sección actual sufre de monotonía visual: 6 tarjetas cuadradas idénticas en una grilla 3x2, todos con el mismo botón secundario gris, sin distinción de jerarquía, y con cobros recurrentes aislados al final.

### Propuesta de Transformación para Planes:

```
┌────────────────────────────────────────────────────────────────────────┐
│  [ Eyebrow ] Planes y precios                                          │
│  Precios claros desde el primer día                                    │
│  [ Selector de Categorías Fluido: Todos | Web | Móvil | Automatización] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│   │   Página web     │  │ Tienda en línea  │  │ Sistema gestión  │     │
│   │   (Lava Capsule) │  │  ★ CORE GLOW     │  │  (Lava Capsule)  │     │
│   │                  │  │ (Núcleo Magma)   │  │                  │     │
│   │   $350.000       │  │   $1.000.000     │  │   $600.000       │     │
│   │                  │  │                  │  │                  │     │
│   │  ✓ Checklist     │  │  ✓ Checklist con │  │  ✓ Checklist     │     │
│   │    con checks    │  │    halo naranja  │  │    con checks    │     │
│   │    naranjas      │  │                  │  │                  │     │
│   │  [Cotizar]       │  │ [Cotizar - Brand]│  │  [Cotizar]       │     │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  [ Toggle / Explicador Integrado: Instalación vs Suscripción Mensual ] │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 🛡️ Garantía 50/50: 50% al arrancar · 50% con el sistema probado  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Mejoras Específicas en Planes:
1. **Filtro / Switch de Categorías con Cápsula Deslizante:**
   - Botonera flotante tipo píldora (`Todos`, `Desarrollo web`, `Apps móviles`, `Agentes e IA`).
   - Reduce la carga cognitiva y permite al cliente enfocarse en lo que necesita.
2. **Card Architecture "Lava Capsule" con Double-Bezel:**
   - Marco exterior con vidrio ahumado y borde concéntrico interior.
   - **Plan Insignia ("Tienda en línea"):** Tratamiento visual con halo perimetral cálido sutil (*Thermal Core Glow*), etiqueta de "Solución Integral" y botón principal relleno en `--brand` (`#FF4400`) para romper la igualdad de los 6 botones grises.
3. **Checklist con Marcadores Térmicos:**
   - En lugar de texto simple con bordes grises, cada ítem lleva un checkmark SVG fino (`✓`) dentro de un micro-disco con resplandor suave.
4. **Módulo de Transparencia Recurrente:**
   - Unificar los cobros recurrentes (Hosting VPS, actualizaciones, bots) en un panel translúcido de "Ecosistema Tecnológico y Acompañamiento", enlazándolo visualmente con los planes.
5. **Insignia de Confianza "Pledge 50/50":**
   - Destacar la condición de pago (*"50% al empezar, 50% cuando recibes el sistema funcionando"*) como un sello de garantía con icono de verificación y texto blindado.

---

## 3. Corrección de Inconsistencias Críticas

1. **Eliminar la Duplicidad en Contacto & BrandBand:**
   - *Diagnóstico:* Actualmente la cabecera de Contacto y la franja `BrandBand` repiten el mismo mensaje literal (*"Cuéntanos qué necesitas y te cotizamos sin compromiso"*).
   - *Solución:* 
     - La sección de Contacto se enfoca exclusivamente en el formulario interactivo rápido y en la vía directa de WhatsApp (`"Inicia tu conversación con ingeniería"`).
     - La franja `BrandBand` se transforma en el cierre definitivo antes del footer con un mensaje contundente de despegue: *"¿Listo para modernizar tu negocio? Conversemos hoy"* con llamada a la acción directa.
2. **Menú Móvil con Cinemática de Fluidos:**
   - Sustituir la apertura seca de `Navbar.svelte` por una transición con `backdrop-filter: blur(24px)`, animación de entrada fluida y links que emergen de forma escalonada (`staggered delay`).
3. **Botones Hápticos (`Button.svelte`):**
   - Incorporar efecto de compresión física (`active:scale(0.97)`), transición con curva viscosa y opción de flecha interior con micro-desplazamiento en hover (`group-hover:translate-x-1`).

---

## 4. Nuevas Secciones de Alto Nivel

### A. Sección de Preguntas Frecuentes (FAQ) — "Dudas Resueltas"
- **Objetivo:** Eliminar objeciones comerciales antes de que el cliente escriba a WhatsApp, cumpliendo la regla de no inventar clientes ni proyectos.
- **Formato:** Acordeón minimalista con líneas sutiles y animación fluida en CSS puro (`grid-template-rows: 0fr -> 1fr`).
- **Contenido clave:**
  1. *¿Cuánto tiempo toma tener un proyecto en funcionamiento?*
  2. *¿El software y el código fuente son de mi propiedad?* (100% tuyos, repositorios y accesos a tu nombre).
  3. *¿Cómo funciona la forma de pago 50/50?* (Hitos de entrega verificables).
  4. *¿Trabajan con clientes fuera de Montería?* (Atención regional y nacional 100% remota).
  5. *¿Qué incluye el acompañamiento y soporte posterior?*

### B. Sección de Pilares de Ingeniería — "La Diferencia Makma"
- 3 o 4 tarjetas con estética de cápsula de magma que comunican los valores técnicos verificables:
  - **Velocidad Extrema:** Sin plantillas infladas de WordPress ni código sobrante; arquitecturas ligeras que cargan en milisegundos.
  - **Propiedad Absoluta:** Licencia y código fuente entregados a tu nombre, sin rentas forzosas de plataforma.
  - **Trato Directo con Desarrolladores:** Conversaciones claras sin intermediarios ni jerga confusa.
  - **Infraestructura Confiable:** Servidores optimizados y respaldos automáticos en la nube.

---

## 5. Ambientación Magma en Todo el Recorrido

Para que el magma no sea exclusivo del Hero:
1. **Luz Ambiental Sutil en el Fondo del Scroll:**
   - Un pseudo-elemento con gradiente radial de muy baja opacidad (`rgba(255, 68, 0, 0.04)`) que acompaña el desplazamiento de la página, dando sensación de calor interno en el contenedor negro.
2. **Hover Térmico en Filas de Servicios:**
   - Al pasar el cursor por una fila de servicio (`01 Desarrollo web`), un degradado translúcido cálido se enciende detrás del título y el número se ilumina en naranja incandescente.
3. **Cursor Háptico de Magma:**
   - Pulir `MagmaCursor.svelte` para que al posarse sobre tarjetas de planes o botones reaccione con una suave expansión gravitacional.

---

## 6. Fases de Implementación

### Fase 1: Arquitectura y Tokens Térmicos
- Añadir tokens de micro-brillo y curvas de aceleración viscosas en `src/lib/styles/tokens.css`.
- Pulir `Button.svelte` con física háptica y flechas dinámicas.

### Fase 2: Rediseño de Planes y Precios + Eliminación de Redundancias
- Crear componente de filtro de categorías para planes en `PlanCard` / `+page.svelte`.
- Implementar el diseño *Double-Bezel* y *Thermal Core Glow* en las tarjetas de planes.
- Corregir el copy y estructura de la sección Contacto y la franja `BrandBand`.

### Fase 3: Creación de Componentes Nuevos
- Implementar el componente `FaqAccordion.svelte` y poblar las preguntas en `src/lib/content/site.ts`.
- Implementar la sección de Pilares de Ingeniería ("La Diferencia Makma").

### Fase 4: Cinemática de Magma y Pulido Móvil
- Animar el menú móvil en `Navbar.svelte` con desenfoque y links escalonados.
- Añadir hover térmico interactivo en `ServicesList.svelte`.
- Ejecutar suite de pruebas y chequeo de tipos: `npm run check && npm run lint && npm test && npm run build`.
