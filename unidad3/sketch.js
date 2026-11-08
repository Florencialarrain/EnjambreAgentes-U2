// Unidad 3 · Adaptación del enjambre de la Unidad 2 con apoyo de Codex.
const direccion = 'https://api.open-meteo.com/v1/forecast?latitude=-33.45&longitude=-70.66&current=temperature_2m&timezone=GMT';
const periodo = 60_000;
const vigencia = 45 * 60_000;
// La serie histórica dio 5.8–24.7 °C. El margen de 0–35 °C permite representar días más fríos y cálidos.
const minimo = 0;
const maximo = 35;
const suavidad = 0.08;
const n = 40;
const k = 0.02;
const semilla = 5;
let modo = 'real';
let temperaturaSimulada = 12;
let lectura = null;
let consultando = false;
let senal = null;
let agentes = [];
let lienzo;

function setup() {
  lienzo = createCanvas(600, 400);
  lienzo.parent('enjambre');
  reiniciar();
  document.querySelector('#modo').addEventListener('change', evento => {
    modo = evento.target.value;
    reiniciar();
  });
  document.querySelector('#temperatura').addEventListener('change', evento => {
    temperaturaSimulada = Number(evento.target.value);
    reiniciar();
  });
  cargarTemperatura();
  setInterval(cargarTemperatura, periodo);
}

function reiniciar() {
  randomSeed(semilla);
  agentes = Array.from({length: n}, crearAgente);
  senal = null;
}

async function cargarTemperatura() {
  if (consultando) return;
  consultando = true;
  try {
    const respuesta = await fetch(direccion, {signal: AbortSignal.timeout(8000)});
    if (!respuesta.ok) throw new Error('Respuesta HTTP inválida');
    const datos = await respuesta.json();
    const valor = datos.current?.temperature_2m;
    const fecha = Date.parse(datos.current?.time + 'Z');
    if (!Number.isFinite(valor) || !Number.isFinite(fecha)) {
      throw new Error('Lectura inválida');
    }
    lectura = {valor, fecha};
  } catch {
    lectura = null;
  } finally {
    consultando = false;
  }
}

function leerSenal() {
  const valor = modo === 'simulada'
    ? temperaturaSimulada
    : lectura && Date.now() - lectura.fecha <= vigencia ? lectura.valor : null;
  if (!Number.isFinite(valor)) return null;
  return constrain(map(valor, minimo, maximo, 0, 1), 0, 1);
}

function draw() {
  background(11, 26, 39);
  const entrada = leerSenal();
  const panel = document.querySelector('#estado');
  if (entrada === null) {
    senal = null;
    panel.textContent = consultando ? 'Consultando fuente…' : 'Sin datos vigentes · reintento automático';
    fill(190, 205, 218);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Lectura no disponible', width / 2, height / 2);
    return;
  }
  senal = senal === null ? entrada : lerp(senal, entrada, suavidad);
  const radio = lerp(40, 160, senal);
  const valor = modo === 'simulada' ? temperaturaSimulada : lectura.valor;
  panel.textContent = (modo === 'simulada' ? 'Simulación' : 'Open-Meteo en vivo')
    + ' · ' + valor.toFixed(1) + ' °C · Radio ' + radio.toFixed(0) + ' px';

  // En simulación se mantiene la geometría inicial para comparar solo el radio.
  if (modo === 'real') {
    for (const agente of agentes) {
      acercarAPromedio(agente, vecinosDe(agente, agentes, radio), k);
      mover(agente);
      aplicarBorde(agente);
    }
  }
  for (const agente of agentes) dibujarLazos(agente, vecinosDe(agente, agentes, radio));
  for (const agente of agentes) mostrar(agente, vecinosDe(agente, agentes, radio).length > 0);
}

function crearAgente() {
  return {x: random(width), y: random(height), vx: random(-2, 2), vy: random(-2, 2), d: random(8, 16)};
}
function esVecino(a, b, radio) {
  return a !== b && dist(a.x, a.y, b.x, b.y) < radio;
}
function vecinosDe(a, todos, radio) {
  let vs = [];
  for (let b of todos) if (esVecino(a, b, radio)) vs.push(b);
  return vs;
}
// Cambia la posición hacia el promedio; un agente solo conserva su posición.
function acercarAPromedio(a, vs, intensidad) {
  if (vs.length === 0) return;
  let px = 0;
  let py = 0;
  for (let b of vs) { px += b.x; py += b.y; }
  a.x = lerp(a.x, px / vs.length, intensidad);
  a.y = lerp(a.y, py / vs.length, intensidad);
}
function mover(a) { a.x += a.vx; a.y += a.vy; }
function aplicarBorde(a) {
  if (a.x > width - a.d / 2) { a.x = width - a.d / 2; a.vx *= -1; }
  if (a.x < a.d / 2) { a.x = a.d / 2; a.vx *= -1; }
  if (a.y > height - a.d / 2) { a.y = height - a.d / 2; a.vy *= -1; }
  if (a.y < a.d / 2) { a.y = a.d / 2; a.vy *= -1; }
}
function dibujarLazos(a, vs) {
  stroke(92, 189, 204, 44);
  for (let b of vs) line(a.x, a.y, b.x, b.y);
}
function mostrar(a, tieneVecinos) {
  noStroke();
  if (tieneVecinos) fill(106, 224, 210);
  else fill(171, 189, 205);
  circle(a.x, a.y, a.d);
}
