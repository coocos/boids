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

const boids = createBoids(128, bounds, {
  flockRadius: 64,
  maxVelocity: 3,
  factors: {
    cohesion: 0.1,
    alignment: 0.1,
    avoidance: 0.2,
    bounds: 0.25,
  },
});

const simulator = simulation(boids, bounds);
const renderer = canvasRenderer(canvas);

function simulate() {
  simulator.simulate();
  renderer.render(boids);
  requestAnimationFrame(simulate);
}

requestAnimationFrame(simulate);
