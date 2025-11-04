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

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';

  if (tool === 'pen') {
    ctx.strokeStyle = color;
  } else if (tool === 'eraser') {
    ctx.strokeStyle = backgroundColor;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

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
