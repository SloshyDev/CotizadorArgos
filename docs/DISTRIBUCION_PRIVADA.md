# Distribución privada

## Repositorio

El código se mantiene en el repositorio privado `SloshyDev/CotizadorArgos`. Para que un usuario descargue el paquete desde GitHub, debe tener una cuenta de GitHub y acceso de lectura al repositorio.

Para una organización de GitHub, crea un equipo de usuarios finales con permiso **Read** y concédele acceso al repositorio. Mantén los permisos de escritura únicamente para quienes mantienen la extensión.

## Entrega a usuarios sin GitHub

Descarga el ZIP desde Releases y compártelo en un grupo privado de Microsoft Teams, SharePoint o OneDrive. No es necesario hacer público el repositorio.

## Crear una versión

1. Ejecuta `npm install`.
2. Ejecuta `npm run build:extension`.
3. Comprime la carpeta `dist/cotizador-argos-extension`.
4. Crea una versión en GitHub Releases y adjunta el ZIP.
5. Comparte con el grupo autorizado el enlace de la versión y la guía `docs/INSTALACION_EXTENSION.md`.

## Consideración de seguridad

La distribución privada controla quién recibe el paquete, pero una extensión cargada manualmente no autentica al usuario. Si en el futuro se requiere impedir técnicamente su uso fuera de la empresa, será necesario integrar inicio de sesión empresarial o desplegarla mediante políticas administradas del navegador.
