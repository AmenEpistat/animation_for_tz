const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let time = 0;
function setupRects() {
  const rects = document.querySelectorAll('.rect');
  rects.forEach(rect => {
    const rectCanvas = document.createElement('canvas');
    rectCanvas.width = rect.offsetWidth;
    rectCanvas.height = rect.offsetHeight;
    rect.appendChild(rectCanvas);
  });
}

function drawWave() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 140, 0, 0.8)');
  gradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 215, 0, 0.5)');
  ctx.strokeStyle = gradient;

  ctx.lineWidth = 3; 
  ctx.shadowColor = 'rgba(255, 140, 0, 0.6)';
  ctx.shadowBlur = 5;

  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y =
        Math.sin((x + time * 1.5 + i * 200) * 0.01) * 40 +
        Math.cos((x + time * 0.5 + i * 100) * 0.02) * 20 +
        (canvas.height / 15) * i;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}


function updateRects() {
  const rects = document.querySelectorAll('.rect');

  rects.forEach(rect => {
    const rectCanvas = rect.querySelector('canvas');
    const rectCtx = rectCanvas.getContext('2d');

    const sx = rect.offsetLeft; 
    const sy = rect.offsetTop; 
    rectCtx.clearRect(0, 0, rectCanvas.width, rectCanvas.height);
    rectCtx.drawImage(
      canvas, 
      sx, sy, rectCanvas.width, rectCanvas.height, 
      0, 0, rectCanvas.width, rectCanvas.height 
    );
  });
}

function animate() {
  time += 3;

  drawWave(); 
  updateRects(); 
  requestAnimationFrame(animate);
}

setupRects();
animate();

