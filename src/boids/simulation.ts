import { mag, sub, add } from "../math/vector";
import { Boid } from "./boid";
import {
  groupTogether,
  alignDirection,
  avoidCollision,
  respectBounds,
  limitVelocity,
} from "./rules";

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function findFlock(boid: Boid, boids: Boid[]) {
  return boids.filter(
    (other) =>
      boid != other &&
      mag(sub(boid.position, other.position)) < boid.config.radius
  );
}

export function simulation(boids: Boid[], bounds: Bounds) {
  const rules = [
    groupTogether,
    alignDirection,
    avoidCollision,
    respectBounds,
    limitVelocity,
  ];
  return {
    simulate: () => {
      for (let boid of boids) {
        boid.flock = findFlock(boid, boids);
        for (let rule of rules) {
          boid.velocity = add(boid.velocity, rule(boid, bounds));
        }
      }
      for (let boid of boids) {
        boid.position = add(boid.position, boid.velocity);
      }
    },
  };
}
