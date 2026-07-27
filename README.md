# Cotizador Argos para Outlook

Complemento de Outlook que genera una cotización PDF para los planes 329, 328 y 327. La edad puede capturarse directamente o calcularse desde la fecha de nacimiento contenida en un RFC mexicano.

## Uso local

1. En una terminal, abre la carpeta del proyecto y ejecuta `npm install`.
2. Ejecuta `npm run certs`; esto instala un certificado de desarrollo de confianza.
3. Ejecuta `npm run start:https`.
4. En Outlook, abre **Obtener complementos** → **Mis complementos** → **Agregar un complemento personalizado** → **Agregar desde archivo** y selecciona `manifest.xml`.
5. Abre cualquier correo recibido y selecciona **Cotizar** en la cinta de opciones.

## Publicación

Antes de instalarlo para otras personas, publica estos archivos en un servidor HTTPS y reemplaza cada aparición de `https://localhost:3000` en `manifest.xml` por la dirección pública definitiva. Después, distribuye ese manifiesto desde el centro de administración de Microsoft 365.

## Alcance de la tarifa

La tabla incluida cubre edades de 50 a 70 años. El complemento muestra las sumas aseguradas de $200,000, $175,000 y $150,000, y las primas de la imagen proporcionada. Los importes se muestran en moneda nacional como cotización informativa.

> Nota: Outlook admite mejor iconos PNG en los manifiestos productivos. El archivo `assets/icon.svg` funciona como icono de desarrollo; para publicar, conviene sustituirlo por versiones PNG de 16, 32, 64, 80 y 128 px y actualizar sus rutas en el manifiesto.
