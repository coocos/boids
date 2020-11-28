import { Vector } from "../math/vector";
import { Bounds } from "./simulation";

export type Boid = {
  position: Vector;
  velocity: Vector;
  config: BoidConfig;
  flock: Boid[];
};

export type BoidConfig = {
  color: [number, number, number];
  radius: number;
  maxVelocity: number;
  factors: {
    cohesion: number;
    alignment: number;
    separation: number;
    bounds: number;
  };
};

export function createBoids(
  count: number = 64,
  bounds: Bounds,
  config: BoidConfig
): Boid[] {
  const boids: Boid[] = [];
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
      flock: [],
      config,
    });
  }
  return boids;
}

export function randomBoids(bounds: Bounds): Boid[] {
  const amount = 128 + Math.floor(Math.random() * 256);
  const radius = 48 + Math.random() * 24;
  const maxVelocity = 0.75 + Math.random();
  return createBoids(amount, bounds, {
    radius,
    maxVelocity,
    factors: {
      cohesion: 0.1 + Math.random() * 0.1,
      alignment: 0.1 + Math.random() * 0.25,
      separation: 0.15 + Math.random() * 0.25,
      bounds: 0.1 + Math.random() * 0.25,
    },
    color: [
      Math.floor(Math.random() * 225),
      Math.floor(Math.random() * 225),
      Math.floor(Math.random() * 225),
    ],
  });
}

export function defaultBoids(bounds: Bounds): Boid[] {
  return createBoids(256, bounds, {
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
}
