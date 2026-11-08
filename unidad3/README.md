# Pulso térmico de Santiago

Unidad 3. Equipo: Florencia Larraín, Sebastián Zúñiga y Vicente Hoffmann.

## Ejecutar

Abrir esta carpeta con VS Code y abrir index.html con Live Server. Requiere internet para cargar p5.js y consultar Open-Meteo. El control Fuente permite cambiar entre datos reales y simulación. En simulación se comparan 12 y 26 °C con semilla 5 y posiciones fijas.

## Archivos

sketch.js contiene la entrada única leerSenal(), el rango minimo–maximo, el estado de falla y las reglas del enjambre. calibracion/ contiene la serie horaria analizada. evidencia/ incluye capturas. pruebas/verificar.cjs contiene pruebas controladas; pruebas/visual/ permite repetir la comparación antes/después del plan de fallas.

La comparación de fallas utiliza un dato vencido deliberadamente y una variante diagnóstica. No es una prueba con una persona externa. La integración y las comprobaciones se realizaron con apoyo de IA, declarado en el informe.

Las carpetas exploraciones/ conservan los archivos históricos disponibles. BITACORA.md procede de la plantilla de Unidad 2 y no acredita una bitácora completada de Unidad 3.

Fuentes: Open-Meteo https://open-meteo.com/ y p5.js https://p5js.org/.
