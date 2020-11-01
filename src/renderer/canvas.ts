import { Boid } from "../boids/boid";

export function canvasRenderer(canvas: HTMLCanvasElement) {
  const scale = window.devicePixelRatio;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  const context = canvas.getContext("2d");
  context.scale(scale, scale);

  return {
    render(boids: Array<Boid>) {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ff0";
      for (let boid of boids) {
        context.beginPath();
        context.arc(
          boid.position.x,
          boid.position.y,
          Math.abs(boid.velocity.x) * 2,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    },
  };
}
