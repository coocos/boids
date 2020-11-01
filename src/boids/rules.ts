import { Boid } from "./boid";
import { add, sub, div, mul, normalized } from "../math/vector";

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function cohesion(boid: Boid, flockMates: Array<Boid>, bounds: Bounds) {
  let position = { x: 0, y: 0 };
  if (flockMates.length == 0) {
    return position;
  }
  for (let boid of flockMates) {
    position = add(position, boid.position);
  }
  position = div(position, flockMates.length);
  const direction = normalized(sub(position, boid.position));
  return mul(direction, boid.config.factors.cohesion);
}

export function alignDirection(
  boid: Boid,
  flockMates: Array<Boid>,
  bounds: Bounds
) {
  let direction = { x: 0, y: 0 };
  if (flockMates.length == 0) {
    return direction;
  }
  for (let boid of flockMates) {
    direction = add(direction, normalized(boid.velocity));
  }
  direction = normalized(direction);
  return mul(direction, boid.config.factors.alignment);
}
