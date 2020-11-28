import { canvasRenderer } from "./renderer/canvas";
import { createBoids, randomBoids } from "./boids/boid";
import { simulation } from "./boids/simulation";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const randomizeButton = document.getElementById(
  "randomize"
) as HTMLButtonElement;

let restartSimulation = false;
randomizeButton.onclick = (event) => (restartSimulation = true);

const boundWidth = Math.max(window.innerWidth, window.innerHeight) / 24;
const bounds = {
  x: boundWidth,
  y: boundWidth,
  width: window.innerWidth - boundWidth,
  height: window.innerHeight - boundWidth,
};

let boids = createBoids(256, bounds, {
  radius: 48,
  maxVelocity: 1.5,
  factors: {
    cohesion: 0.15,
    alignment: 0.1,
    separation: 0.2,
    bounds: 0.1,
  },
  color: [206, 64, 99],
});

const simulator = simulation(bounds);
const renderer = canvasRenderer(canvas);

function simulate() {
  if (restartSimulation) {
    boids = randomBoids(bounds);
    restartSimulation = false;
  }
  boids = simulator.simulate(boids);
  renderer.render(boids);
  requestAnimationFrame(simulate);
}

requestAnimationFrame(simulate);
