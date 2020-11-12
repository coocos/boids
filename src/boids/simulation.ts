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

export function simulation(bounds: Bounds) {
  const rules = [
    groupTogether,
    alignDirection,
    avoidCollision,
    respectBounds,
    limitVelocity,
  ];
  return {
    simulate: (boids: Boid[]) => {
      return boids.map((boid) => {
        const velocity = rules.reduce(
          (velocity, rule) => add(velocity, rule(boid, bounds)),
          boid.velocity
        );
        const position = add(boid.position, boid.velocity);
        const flock = findFlock(boid, boids);
        return {
          ...boid,
          flock,
          velocity,
          position,
        };
      });
    },
  };
}
