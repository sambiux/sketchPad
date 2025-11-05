const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const penBtn = document.getElementById('pen');
const eraserBtn = document.getElementById('eraser');
const colorPicker = document.getElementById('color');
const sizeSlider = document.getElementById('size');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');
const bgBtn = document.getElementById('bg');

let drawing = false;
let tool = 'pen';
let color = colorPicker.value;
let size = sizeSlider.value;
let backgroundColor = '#fff';

// Ajusta el tamaño del canvas dinámicamente
function resizeCanvas() {
  const data = canvas.toDataURL();
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const img = new Image();
  img.src = data;
  img.onload = () => ctx.drawImage(img, 0, 0);
}

window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 10);

// --- Función para obtener coordenadas (soporta mouse y touch)
function getPosition(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
}

// --- Iniciar dibujo ---
function startDrawing(e) {
  drawing = true;
  ctx.beginPath();
  const pos = getPosition(e);
  ctx.moveTo(pos.x, pos.y);
  e.preventDefault(); // evita el scroll en móvil
}

// --- Dibujar mientras se mueve ---
function draw(e) {
  if (!drawing) return;
  const pos = getPosition(e);

  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.strokeStyle = tool === 'pen' ? color : backgroundColor;

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  e.preventDefault();
}

// --- Detener dibujo ---
function stopDrawing(e) {
  drawing = false;
  e.preventDefault();
}

// Eventos de mouse
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Eventos táctiles
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Controles
colorPicker.addEventListener('input', (e) => color = e.target.value);
sizeSlider.addEventListener('input', (e) => size = e.target.value);

penBtn.addEventListener('click', () => {
  tool = 'pen';
  penBtn.classList.add('active');
  eraserBtn.classList.remove('active');
});

eraserBtn.addEventListener('click', () => {
  tool = 'eraser';
  eraserBtn.classList.add('active');
  penBtn.classList.remove('active');
});

clearBtn.addEventListener('click', () => {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'dibujo.png';
  link.href = canvas.toDataURL();
  link.click();
});

bgBtn.addEventListener('click', () => {
  const newBg = prompt('Introduce un color de fondo (por ejemplo #222 o red):', backgroundColor);
  if (newBg) {
    backgroundColor = newBg;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
});
