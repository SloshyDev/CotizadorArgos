const tarifas={50:[150,134,118],51:[164,146,129],52:[178,158,138],53:[194,172,150],54:[212,188,164],55:[230,204,178],56:[248,220,192],57:[268,237,206],58:[292,258,224],59:[318,280,242],60:[348,306,264],61:[382,336,290],62:[422,372,322],63:[460,405,351],64:[498,438,380],65:[540,475,410],66:[582,512,442],67:[626,550,474],68:[676,594,512],69:[730,642,554],70:[792,695,598]};
const planes=[['329',200000],['328',175000],['327',150000]];
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(n);
const loadImage=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src});
let mode='age';

function setMode(next){mode=next;$('edadMode').classList.toggle('active',next==='age');$('rfcMode').classList.toggle('active',next==='rfc');$('ageField').hidden=next!=='age';$('rfcField').hidden=next!=='rfc';$('error').textContent='';$('status').textContent=''}
function rfcDate(value){const rfc=value.trim().toUpperCase().replace(/[^A-Z0-9Ñ&]/g,''),start=rfc.length===13?4:rfc.length===12?3:-1;if(start<0||!/^\d{6}$/.test(rfc.slice(start,start+6)))return null;const yy=+rfc.slice(start,start+2),month=+rfc.slice(start+2,start+4),day=+rfc.slice(start+4,start+6),year=(yy>new Date().getFullYear()%100?1900:2000)+yy,date=new Date(year,month-1,day);return date.getFullYear()===year&&date.getMonth()===month-1&&date.getDate()===day?date:null}
function ageOf(date){const now=new Date(),birthday=new Date(now.getFullYear(),date.getMonth(),date.getDate());return now.getFullYear()-date.getFullYear()-(now<new Date(now.getFullYear(),date.getMonth(),date.getDate())?1:0)}
function glass(doc,x,y,w,h,r=4,opacity=.88){doc.setGState(new doc.GState({opacity:.12}));doc.setFillColor(18,46,32);doc.roundedRect(x+1.2,y+1.8,w,h,r,r,'F');doc.setGState(new doc.GState({opacity}));doc.setFillColor(255,255,255);doc.roundedRect(x,y,w,h,r,r,'F');doc.setGState(new doc.GState({opacity:1}));doc.setDrawColor(238,244,240);doc.setLineWidth(.45);doc.roundedRect(x,y,w,h,r,r,'S')}

async function createPdf(quote){
  const{jsPDF}=window.jspdf,doc=new jsPDF(),date=quote.date.toLocaleDateString('es-MX');
  const[certeza,argos,familia]=await Promise.all([
    loadImage(chrome.runtime.getURL('assets/certeza-logo.png')),
    loadImage(chrome.runtime.getURL('assets/argos-logo-transparent.png')),
    loadImage(chrome.runtime.getURL('assets/proteccion-familiar.jpg'))
  ]);

  doc.setFillColor(240,245,242);doc.rect(0,0,210,297,'F');
  doc.addImage(familia,'JPEG',0,0,210,102);
  doc.setGState(new doc.GState({opacity:.28}));doc.setFillColor(3,72,38);doc.rect(0,0,210,102,'F');doc.setGState(new doc.GState({opacity:1}));

  glass(doc,12,9,186,27,5,.9);
  doc.addImage(certeza,'PNG',18,14,65,17);
  doc.setTextColor(150,160,153);doc.setFontSize(18);doc.text('×',100,25);
  doc.addImage(argos,'PNG',117,11,72,23);

  glass(doc,13,45,112,44,6,.78);
  doc.setTextColor(98,20,51);doc.setFont('helvetica','bold');doc.setFontSize(8);doc.text('PROTECCIÓN ECONÓMICA PARA TU FAMILIA',20,58);
  doc.setTextColor(6,80,43);doc.setFontSize(22);doc.text('SEGURO POR',20,70);doc.text('FALLECIMIENTO',20,82);

  glass(doc,15,109,180,27,5,.92);
  doc.setTextColor(105,120,110);doc.setFont('helvetica','bold');doc.setFontSize(7.5);doc.text('COTIZACIÓN PERSONALIZADA',22,119);
  doc.setTextColor(31,53,43);doc.setFontSize(14);doc.text(quote.name,22,130);
  doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text(`Edad: ${quote.age} años`,188,129,{align:'right'});doc.text(`Fecha: ${date}`,188,118,{align:'right'});

  doc.setTextColor(31,53,43);doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text('Elige el nivel de protección',15,148);
  planes.forEach(([id,sum],i)=>{
    const x=15+i*61,accent=[[0,138,66],[98,20,51],[45,103,71]][i];
    glass(doc,x,154,56,68,6,.91);
    doc.setFillColor(...accent);doc.roundedRect(x,154,56,5,6,6,'F');doc.rect(x,157,56,2,'F');
    doc.setTextColor(...accent);doc.setFont('helvetica','bold');doc.setFontSize(8);doc.text(`PLAN ${id}`,x+7,168);
    doc.setFillColor(...accent);doc.circle(x+46,166,5,'F');doc.setTextColor(255,255,255);doc.setFontSize(7);doc.text(`0${i+1}`,x+46,168.3,{align:'center'});
    doc.setTextColor(31,53,43);doc.setFontSize(15);doc.text(money(sum),x+28,184,{align:'center'});
    doc.setDrawColor(220,230,223);doc.setLineWidth(.35);doc.line(x+7,190,x+49,190);
    doc.setGState(new doc.GState({opacity:.1}));doc.setFillColor(...accent);doc.roundedRect(x+6,195,44,20,4,4,'F');doc.setGState(new doc.GState({opacity:1}));
    doc.setTextColor(98,113,104);doc.setFont('helvetica','bold');doc.setFontSize(6.5);doc.text('PAGO MENSUAL',x+28,201,{align:'center'});
    doc.setTextColor(...accent);doc.setFontSize(15);doc.text(money(tarifas[quote.age][i]),x+28,212,{align:'center'});
  });

  doc.setTextColor(100,115,105);doc.setFontSize(7.5);doc.text('El importe indicado corresponde a un pago mensual. Cotización informativa, sujeta a condiciones, exclusiones y aprobación aplicables.',15,246,{maxWidth:180});
  doc.setDrawColor(205,218,209);doc.line(15,263,195,263);doc.setTextColor(120,132,124);doc.text('Certeza Soluciones en Seguros  ×  Seguros Argos',15,271);
  doc.save(`Cotizacion-Seguro-Fallecimiento-${quote.age}-anos.pdf`);
}

async function calculate(){
  const date=mode==='rfc'?rfcDate($('rfc').value):null;
  const age=mode==='age'?+$('edad').value:(date?ageOf(date):NaN);
  $('error').textContent='';$('status').textContent='';
  if(!Number.isInteger(age)){ $('error').textContent=mode==='rfc'?'Escribe un RFC válido.':'Escribe una edad válida.';return }
  if(!tarifas[age]){ $('error').textContent=`La tabla cubre edades de 50 a 70 años. Edad calculada: ${age}.`;return }
  if(!window.jspdf){ $('error').textContent='No se pudo cargar el generador de PDF.';return }
  const button=$('quote');button.disabled=true;button.textContent='Generando PDF…';
  try{await createPdf({age,name:$('nombre').value.trim()||'Asegurado',date:new Date()});$('status').textContent='Cotización descargada.'}
  catch(error){console.error(error);$('error').textContent='No fue posible generar el PDF. Inténtalo de nuevo.'}
  finally{button.disabled=false;button.textContent='Generar cotización PDF'}
}

$('edadMode').onclick=()=>setMode('age');
$('rfcMode').onclick=()=>setMode('rfc');
$('quote').onclick=calculate;
$('rfc').oninput=event=>event.target.value=event.target.value.toUpperCase();
