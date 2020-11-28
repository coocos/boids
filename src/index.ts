import { canvasRenderer } from "./renderer/canvas";
import { defaultBoids, randomBoids } from "./boids/boid";
import { simulation } from "./boids/simulation";

const boundWidth = Math.max(window.innerWidth, window.innerHeight) / 24;
const bounds = {
  x: boundWidth,
  y: boundWidth,
  width: window.innerWidth - boundWidth,
  height: window.innerHeight - boundWidth,
};
let boids = defaultBoids(bounds);

const simulator = simulation(bounds);
const renderer = canvasRenderer(
  document.getElementById("canvas") as HTMLCanvasElement
);

const randomizeButton = document.getElementById(
  "randomize"
) as HTMLButtonElement;
let restartSimulation = false;
randomizeButton.onclick = (event) => (restartSimulation = true);

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
