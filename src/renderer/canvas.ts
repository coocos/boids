import { Boid } from "../boids/boid";

const COLOR_MULTIPLIER = 10;
const BACKGROUND_COLOR = "rgba(0, 0, 0, 0.075)";

function initializeCanvas(canvas: HTMLCanvasElement) {
  const scale = window.devicePixelRatio;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  context.scale(scale, scale);
  return {
    context,
    width: canvas.width,
    height: canvas.height,
  };
}

function boidColor(boid: Boid) {
  const [r, g, b] = boid.config.color.map(
    (component) => component + boid.flock.length * COLOR_MULTIPLIER
  );
  return `rgb(${r},${g},${b})`;
}

function drawBoid(boid: Boid, context: CanvasRenderingContext2D) {
  context.fillStyle = boidColor(boid);
  context.beginPath();
  context.arc(
    boid.position.x,
    boid.position.y,
    Math.max(1, Math.abs(boid.velocity.x) * 2),
    0,
    2 * Math.PI
  );
  context.fill();
}

function clear(
  width: number,
  height: number,
  context: CanvasRenderingContext2D
) {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, width, height);
}

export function canvasRenderer(canvas: HTMLCanvasElement) {
  const { context, width, height } = initializeCanvas(canvas);

  return {
    render(boids: Boid[]) {
      clear(width, height, context);
      for (let boid of boids) {
        drawBoid(boid, context);
      }
    },
  };
}
