Campo de formulario con etiqueta, control, ayuda y mensaje de error: un `input` o `textarea` sobre `surface-raised`.

**Estructura.** `mk-field` contiene `mk-field__label` (estilo `label`), `mk-field__control` (borde 1.5 px `line-strong`, `radius-md`, 52 px de alto), y opcionalmente `mk-field__hint` o `mk-field__msg`. El estado de error es `mk-field--error`: borde `danger` más un mensaje con icono y la palabra "Error:".

**Qué aporta quien lo usa.** El `label` enlazado por `for`/`id`, el `type` y `autocomplete` correctos, `aria-invalid` y `aria-describedby` cuando hay error, y el texto del mensaje.

**Hacer**

- Etiqueta visible siempre; el placeholder da un ejemplo, no reemplaza la etiqueta.
- Mensajes de error que digan qué corregir, no solo "inválido".
- Un campo de consentimiento de datos personales, con enlace a la política de tratamiento, antes del botón de envío.

**No hacer**

- Indicar el error solo con el borde: `danger` se parece al naranja de marca; siempre icono y palabra.
- Bordes con `line`: no llegan a 3:1. Los controles usan `line-strong`.
