/* Tarifas proporcionadas: paquete, suma asegurada y prima por edad. */
const tarifas = {
  50:[150,134,118],51:[164,146,129],52:[178,158,138],53:[194,172,150],54:[212,188,164],
  55:[230,204,178],56:[248,220,192],57:[268,237,206],58:[292,258,224],59:[318,280,242],
  60:[348,306,264],61:[382,336,290],62:[422,372,322],63:[460,405,351],64:[498,438,380],
  65:[540,475,410],66:[582,512,442],67:[626,550,474],68:[676,594,512],69:[730,642,554],70:[792,695,598]
};
const planes = [{id:'329',suma:200000},{id:'328',suma:175000},{id:'327',suma:150000}];
let modo = 'edad', cotizacion;
const $ = id => document.getElementById(id);
const money = value => new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(value);

function cambiarModo(nuevo) { modo=nuevo; $('modoEdad').classList.toggle('selected',nuevo==='edad'); $('modoRfc').classList.toggle('selected',nuevo==='rfc'); $('campoEdad').hidden=nuevo!=='edad'; $('campoRfc').hidden=nuevo!=='rfc'; $('error').textContent=''; }
function fechaDesdeRfc(valor) {
  const rfc=valor.trim().toUpperCase().replace(/[^A-Z0-9Ñ&]/g,'');
  const inicio=rfc.length===13 ? 4 : rfc.length===12 ? 3 : -1;
  if(inicio<0 || !/^\d{6}$/.test(rfc.slice(inicio,inicio+6))) return null;
  const yy=Number(rfc.slice(inicio,inicio+2)), mes=Number(rfc.slice(inicio+2,inicio+4)), dia=Number(rfc.slice(inicio+4,inicio+6));
  const anioActual=new Date().getFullYear()%100;
  const anio=(yy>anioActual ? 1900 : 2000)+yy;
  const fecha=new Date(anio,mes-1,dia);
  return fecha.getFullYear()===anio && fecha.getMonth()===mes-1 && fecha.getDate()===dia ? fecha : null;
}
function edadDe(fecha) { const hoy=new Date(), cumple=new Date(hoy.getFullYear(),fecha.getMonth(),fecha.getDate()); return hoy.getFullYear()-fecha.getFullYear()-(hoy<cumple?1:0); }
function obtenerEdad() { if(modo==='edad') return Number($('edad').value); const fecha=fechaDesdeRfc($('rfc').value); return fecha ? edadDe(fecha) : NaN; }
function mostrar() {
  const edad=obtenerEdad(); $('error').textContent='';
  if(!Number.isInteger(edad)) return $('error').textContent=modo==='rfc'?'Escribe un RFC con una fecha válida.':'Escribe una edad válida.';
  if(!tarifas[edad]) return $('error').textContent=`La tabla disponible cubre edades de 50 a 70 años. Edad calculada: ${edad}.`;
  cotizacion={edad,nombre:$('nombre').value.trim()||'Asegurado',fecha:new Date()}; $('titular').textContent=cotizacion.nombre; $('edadCalculada').textContent=`Edad: ${edad} años`;
  $('planes').innerHTML=planes.map((plan,i)=>`<article class="plan"><h3>Plan ${plan.id}</h3><p class="sum">Suma asegurada<strong>${money(plan.suma)}</strong></p><p class="premium">Prima<strong>${money(tarifas[edad][i])}</strong></p></article>`).join('');
  $('resultado').hidden=false;
}
function pdf() {
  if(!cotizacion) return;
  if(!window.jspdf || !window.jspdf.jsPDF) { $('error').textContent='No se pudo cargar el generador de PDF. Recarga el complemento e inténtalo de nuevo.'; return; }
  try { const { jsPDF }=window.jspdf, doc=new jsPDF(); const fecha=cotizacion.fecha.toLocaleDateString('es-MX');
  doc.setFillColor(0,138,55); doc.rect(0,0,210,29,'F'); doc.setTextColor(255,255,255); doc.setFontSize(21); doc.text('Cotización Argos',15,18);
  doc.setTextColor(23,51,36); doc.setFontSize(11); doc.text(`Fecha: ${fecha}`,15,42); doc.setFontSize(16); doc.text(cotizacion.nombre,15,54); doc.setFontSize(11); doc.text(`Edad: ${cotizacion.edad} años`,15,62);
  let y=78; planes.forEach((plan,i)=>{ doc.setFillColor(i===0?0:82,i===0?138:169,i===0?55:68); doc.roundedRect(15,y,180,31,3,3,'F'); doc.setTextColor(255,255,255); doc.setFontSize(14); doc.text(`Plan ${plan.id}`,22,y+12); doc.setFontSize(10); doc.text('Suma asegurada',77,y+10); doc.text('Prima',145,y+10); doc.setFontSize(13); doc.text(money(plan.suma),77,y+21); doc.text(money(tarifas[cotizacion.edad][i]),145,y+21); y+=39; });
  doc.setTextColor(90,105,96); doc.setFontSize(9); doc.text('Importes expresados en moneda nacional. Cotización informativa, sujeta a condiciones y aprobación aplicables.',15,205,{maxWidth:180});
  const archivo=`Cotizacion-Argos-${cotizacion.edad}-anos.pdf`, url=doc.output('bloburl'), enlace=document.createElement('a'); enlace.href=url; enlace.download=archivo; enlace.style.display='none'; document.body.appendChild(enlace); enlace.click(); enlace.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  } catch (e) { console.error(e); $('error').textContent='No fue posible generar el PDF. Recarga el complemento e inténtalo de nuevo.'; }
}
$('modoEdad').addEventListener('click',()=>cambiarModo('edad')); $('modoRfc').addEventListener('click',()=>cambiarModo('rfc')); $('cotizar').addEventListener('click',mostrar); $('pdf').addEventListener('click',pdf); $('rfc').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase());
if(window.Office) Office.onReady();
