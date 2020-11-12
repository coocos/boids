import { canvasRenderer } from "./renderer/canvas";
import { createBoids } from "./boids/boid";
import { simulation } from "./boids/simulation";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const bounds = {
  x: 48,
  y: 48,
  width: window.innerWidth - 48,
  height: window.innerHeight - 48,
};

let boids = createBoids(256, bounds, {
  radius: 48,
  maxVelocity: 2,
  factors: {
    cohesion: 0.15,
    alignment: 0.1,
    separation: 0.2,
    bounds: 0.1,
  },
});

const simulator = simulation(bounds);
const renderer = canvasRenderer(canvas);

function simulate() {
  boids = simulator.simulate(boids);
  renderer.render(boids);
  requestAnimationFrame(simulate);
}

requestAnimationFrame(simulate);
