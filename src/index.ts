import { canvasRenderer } from "./renderer/canvas";
import { createBoids } from "./boids/boid";
import { simulation } from "./boids/simulation";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const boundWidth = window.innerWidth / 10;
const bounds = {
  x: boundWidth,
  y: boundWidth,
  width: window.innerWidth - boundWidth,
  height: window.innerHeight - boundWidth,
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
