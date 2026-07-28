import { cp, mkdir, rm } from 'node:fs/promises';

const source = new URL('../browser-extension/', import.meta.url);
const output = new URL('../dist/cotizador-argos-extension/', import.meta.url);
const jspdf = new URL('../node_modules/jspdf/dist/jspdf.umd.min.js', import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(new URL('vendor/', output), { recursive: true });
await cp(source, output, { recursive: true });
await cp(jspdf, new URL('vendor/jspdf.umd.min.js', output));
console.log('Extensión creada en dist/cotizador-argos-extension');
