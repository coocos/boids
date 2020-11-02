import { Boid } from "../boids/boid";

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
  const color = [
    206 + boid.flockSize * 10,
    64 + boid.flockSize * 10,
    99 + boid.flockSize * 10,
  ];
  return `rgb(${color[0]},${color[1]},${color[2]})`;
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
  context.fillStyle = "rgba(0, 0, 0, 0.075)";
  context.fillRect(0, 0, width, height);
}

export function canvasRenderer(canvas: HTMLCanvasElement) {
  const { context, width, height } = initializeCanvas(canvas);

  return {
    render(boids: Array<Boid>) {
      clear(width, height, context);
      for (let boid of boids) {
        drawBoid(boid, context);
      }
    },
  };
}
