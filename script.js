const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const numRectangles = 100;
const dx = width / numRectangles;
const scaleFactor = 0.005;

function gaussian(x) {
  return Math.exp(-x * x);
}

function drawRectangles() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < numRectangles; i++) {
    const x = i * dx;
    const y = gaussian(x);
    const height = y * scaleFactor * width;

    ctx.fillStyle = 'rgba(70, 130, 180, 0.8)';
    ctx.fillRect(x, height, dx, height);
  }

  requestAnimationFrame(drawRectangles);
}

// Start the animation
drawRectangles();
