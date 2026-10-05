// Unidad 2 · Multitudes y agentes · IPC121NSCT
// Integrantes: Florencia Larraín, Sebastián Zúñiga y Vicente Hoffmann
// Integración del código compartido por el equipo, con apoyo de IA.
let n = 40;
let r = 90;
let k = 0.02;
let semilla = 5;
let verRadio = false;
let cuadroCaptura = 0; // 300 para comparar; 0 para animación continua.
let agentes = [];
let cuadro = 0;

function setup() {
  createCanvas(600, 400);
  reiniciar();
}

// Recupera exactamente las mismas condiciones para comparar radios.
function reiniciar() {
  randomSeed(semilla);
  agentes = [];
  cuadro = 0;
  for (let i = 0; i < n; i++) agentes.push(crearAgente());
  loop();
}

function draw() {
  background(255);
  for (let a of agentes) {
    let vs = vecinosDe(a, agentes, r);
    acercarAPromedio(a, vs, k);
    mover(a);
    aplicarBorde(a);
  }
  // Dibuja todos los lazos antes de dibujar los círculos encima.
  for (let a of agentes) dibujarLazos(a, vecinosDe(a, agentes, r));
  for (let a of agentes) mostrar(a, vecinosDe(a, agentes, r).length > 0);
  if (verRadio && agentes.length > 0) mostrarRadio(agentes[0], r);
  fill(0);
  noStroke();
  text('radio: ' + r + '   (teclas 1, 2, 3)', 10, 20);
  cuadro++;
  if (cuadroCaptura > 0 && cuadro === cuadroCaptura) noLoop();
}

// Devuelve posición, velocidad y tamaño iniciales.
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
  stroke(200);
  for (let b of vs) line(a.x, a.y, b.x, b.y);
}
function mostrar(a, tieneVecinos) {
  stroke(0);
  if (tieneVecinos) fill(230, 60, 60);
  else fill(255);
  circle(a.x, a.y, a.d);
}
function mostrarRadio(a, radio) {
  noFill();
  stroke(0);
  circle(a.x, a.y, radio * 2);
}
// Cada comparación reinicia la población y el contador de cuadros.
function keyPressed() {
  if (key === '1') { r = 40; reiniciar(); }
  if (key === '2') { r = 90; reiniciar(); }
  if (key === '3') { r = 140; reiniciar(); }
}
