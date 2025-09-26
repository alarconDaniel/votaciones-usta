# Sistema de Votaciones USTA – TEST (Commit 1)

Este branch **TEST** agrega utilidades visibles para QA:
- Banner superior “PRUEBAS”.
- Simulador de latencia (delay artificial) para formularios.
- Log básico en consola y `localStorage`.
- Identificadores `data-testid` para facilitar automatización.

> Solo Frontend. Sin backend. Tailwind por CDN.

## Archivos
- index.html
- votacion.html
- script.js
- README.md

## Notas de QA
- Usa el control “Latencia simulada” para probar spinners y estados.
- Ver logs en consola: prefijo `[TEST]`.

# USTA – TEST (Commit 2)

Mejoras centradas en QA de accesibilidad:
- Foco visible y navegación por teclado.
- Etiquetas ARIA y `aria-live` para mensajes.
- Resaltado de elementos interactivos en “modo focus”.

Sigue vigente la latencia simulada y los `data-testid`.

# USTA – TEST (Commit 3)

Herramientas QA adicionales:
- Overlay QA (tecla `Q` o `?qa=1` en la URL).
- Porcentaje de fallo aleatorio para probar errores.
- Reporte rápido: contador de envíos OK/ERROR.

Todo es visual y local. No se envían datos reales.
