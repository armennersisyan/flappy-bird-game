const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Image URLs
const PIPE_SOUTH_URL = './assets/pipeSouth.png';
const PIPE_NORTH_URL = './assets/pipeNorth.png';
const BACKGROUND_URL = './assets/bg.png';
const GROUND_URL = './assets/fg.png';
const BIRD_URL = './assets/bird.png';

// Constants
const PIPE_GAP = 85;
const GRAVITY = 1;

// Bird
let bX = 10;
let bY = 150;

// Pipes
const pipes = [{
  x: canvas.width,
  y: 0,
}];

document.addEventListener('keydown', moveUp);

const loadImage = url => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`load ${url} fail`));
    img.src = url;
  });
};

function moveUp() {
  bY -= 20
}

async function draw() {
  // Drawing images
  const bg = await loadImage(BACKGROUND_URL);
  ctx.drawImage(bg, 0, 0);

  const bird = await loadImage(BIRD_URL);
  ctx.drawImage(bird, bX, bY);

  const isInCenter = bX >= (canvas.width / 2) - bird.width;

  // Bird move horizontally
  bX += isInCenter ? 0 : 2;

  if (isInCenter) {
    // Bird move vertically
    bY += GRAVITY;

    // Drawing Pipes
    for (let i = 0; i < pipes.length; i++) {
      console.log('pipes[i]', pipes[i])
      const pipeNorth = await loadImage(PIPE_NORTH_URL);
      ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);

      const pipeSouth = await loadImage(PIPE_SOUTH_URL);
      ctx.drawImage(pipeSouth, pipes[i].x, pipeNorth.height + pipes[i].y + PIPE_GAP);

      pipes[i].x--

      if (bX + bird.width >= pipes[i].x && (bY + bird.height >= pipes[i].y)) {
        alert();
      }

      if (pipes[i].x === 125) {
        pipes.push({
          x: canvas.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
        })
      }
    }
  }

  const fg = await loadImage(GROUND_URL);
  ctx.drawImage(fg, 0, bg.height - fg.height);

  requestAnimationFrame(draw)
}

draw();
