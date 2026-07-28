# Guía de instalación para usuarios

## Antes de comenzar

Necesitas Google Chrome, Microsoft Edge, Brave u otro navegador basado en Chromium. Descarga el archivo ZIP de la versión más reciente desde la sección privada de [Releases](https://github.com/SloshyDev/CotizadorArgos/releases/latest).

> Solo las personas autorizadas para entrar al repositorio privado pueden descargar el paquete.

## 1. Preparar la carpeta

1. Descarga el archivo `CotizadorArgos-extension-v1.1.2.zip`.
2. Descomprímelo.
3. Mueve la carpeta `cotizador-argos-extension` a una ubicación permanente, por ejemplo **Documentos**.

El navegador necesita conservar esa carpeta. No la elimines ni la cambies de ubicación después de instalar la extensión.

## 2. Instalar en Google Chrome

1. Escribe `chrome://extensions` en la barra de direcciones.
2. Activa **Modo de desarrollador**, en la esquina superior derecha.
3. Selecciona **Cargar descomprimida**.
4. Elige la carpeta `cotizador-argos-extension`. Debe ser la carpeta que contiene `manifest.json`.
5. Abre el menú de extensiones y fija **Cotizador Argos**.

## 3. Instalar en Microsoft Edge

1. Escribe `edge://extensions` en la barra de direcciones.
2. Activa **Modo de desarrollador**.
3. Selecciona **Cargar extensión descomprimida**.
4. Elige la carpeta `cotizador-argos-extension`. Debe ser la carpeta que contiene `manifest.json`.
5. Abre el menú de extensiones y fija **Cotizador Argos**.

## Uso

1. Selecciona el icono de la extensión.
2. Captura el nombre del asegurado, si lo deseas.
3. Introduce su edad o RFC, con o sin homoclave.
4. Selecciona **Generar cotización PDF**.

La cotización se descargará directamente. Incluye los tres planes, sus coberturas y el pago mensual correspondiente.

## Actualizaciones

1. Descarga el ZIP de la versión nueva.
2. Reemplaza los archivos dentro de la carpeta instalada, sin cambiar su ubicación.
3. Regresa a `chrome://extensions` o `edge://extensions`.
4. Selecciona **Recargar** en Cotizador Argos.

## Solución de problemas

### No aparece el icono

Abre el menú de extensiones del navegador y fija Cotizador Argos.

### Aparece “No se pudo cargar la extensión”

Comprueba que seleccionaste la carpeta que contiene directamente el archivo `manifest.json`, no la carpeta exterior ni el ZIP.

### No se descarga el PDF

Permite las descargas en el navegador, cierra el panel de la extensión y vuelve a intentarlo.

### La extensión desapareció

Verifica que la carpeta original no haya sido eliminada, renombrada o movida.
