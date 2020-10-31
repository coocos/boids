import { Vector } from "../math/vector";
import { Bounds } from "./simulation";

export type Boid = {
  position: Vector;
  velocity: Vector;
  config: BoidConfig;
};

export type BoidConfig = {
  flockRadius: number;
  maxVelocity: number;
  factors: {
    cohesion: number;
    alignment: number;
    avoidance: number;
    bounds: number;
  };
};

export function createBoids(
  count: number = 64,
  bounds: Bounds,
  config: BoidConfig
): Array<Boid> {
  const boids: Array<Boid> = [];
  for (let i = 0; i < count; i++) {
    boids.push({
      position: {
        x: Math.random() * bounds.width,
        y: Math.random() * bounds.height,
      },
      velocity: {
        x: Math.random() * (Math.random() < 0.5 ? 1 : -1),
        y: Math.random() * (Math.random() < 0.5 ? 1 : -1),
      },
      config,
    });
  }
  return boids;
}
