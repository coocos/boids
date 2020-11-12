import { Boid } from "./boid";
import { add, sub, div, mul, mag, normalized } from "../math/vector";

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function groupTogether(boid: Boid, bounds: Bounds) {
  let position = { x: 0, y: 0 };
  if (boid.flock.length == 0) {
    return position;
  }
  for (let mate of boid.flock) {
    position = add(position, mate.position);
  }
  position = div(position, boid.flock.length);
  const direction = normalized(sub(position, boid.position));
  return mul(direction, boid.config.factors.cohesion);
}

export function alignDirection(boid: Boid, bounds: Bounds) {
  let direction = { x: 0, y: 0 };
  if (boid.flock.length == 0) {
    return direction;
  }
  for (let mate of boid.flock) {
    direction = add(direction, normalized(mate.velocity));
  }
  direction = normalized(direction);
  return mul(direction, boid.config.factors.alignment);
}

export function avoidCollision(boid: Boid, bounds: Bounds) {
  let direction = { x: 0, y: 0 };
  if (boid.flock.length == 0) {
    return direction;
  }
  for (let mate of boid.flock) {
    const towardBoid = sub(boid.position, mate.position);
    direction.x += towardBoid.x;
    direction.y += towardBoid.y;
  }
  direction = normalized(div(direction, boid.flock.length));
  return mul(direction, boid.config.factors.separation);
}

export function respectBounds(boid: Boid, bounds: Bounds) {
  let direction = { x: 0, y: 0 };

  if (boid.position.x < bounds.x) {
    direction.x = 1;
  } else if (boid.position.x > bounds.width) {
    direction.x = -1;
  }

  if (boid.position.y < bounds.y) {
    direction.y = 1;
  } else if (boid.position.y > bounds.height) {
    direction.y = -1;
  }

  return mul(normalized(direction), boid.config.factors.bounds);
}

export function limitVelocity(boid: Boid, bounds: Bounds) {
  const length = mag(boid.velocity);
  if (length <= boid.config.maxVelocity) {
    return { x: 0, y: 0 };
  }
  const delta = boid.config.maxVelocity - length;
  return mul(normalized(boid.velocity), delta);
}
