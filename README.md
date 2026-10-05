# Círculos vecinos — Unidad 2

Integrantes: Florencia Larraín, Sebastián Zúñiga y Vicente Hoffmann.

Abrir `index.html` en un navegador con conexión a internet (carga p5.js 1.9.4 desde CDN). El código está en `sketch.js`.

## Parámetros

- `n`: cantidad de agentes.
- `r`: radio de vecindad (90 en la entrega).
- `k`: intensidad del acercamiento (0,02).
- `semilla`: 5, reproduce posiciones, velocidades y tamaños iniciales.
- `verRadio`: false en la entrega.
- `cuadroCaptura`: 0 para movimiento continuo; 300 para comparar imágenes.

Las teclas 1, 2 y 3 seleccionan radios de 40, 90 y 140 y reinician desde las mismas condiciones. Para capturas, cambiar `cuadroCaptura` a 300, recargar y usar las teclas. Cada ejecución se detiene en su cuadro 300. Restaurar 0 para entregar.

Los agentes se actualizan en el orden del arreglo, como en el código aportado por el equipo. Se conserva esa regla para mantener las comparaciones existentes. Los lazos se dibujan antes que los círculos.

## Registro de integración

Se integró el código compartido por el equipo y se corrigió el reinicio al cambiar de radio y el orden del dibujo. Se utilizó ChatGPT/Codex para esta integración y las comprobaciones. Esta copia no sustituye el historial de aportes individuales del repositorio del curso en MakerHub.
