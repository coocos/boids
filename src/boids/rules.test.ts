import {
  groupTogether,
  alignDirection,
  avoidCollision,
  respectBounds,
  limitVelocity,
} from "./rules";
import { Boid, BoidConfig } from "./boid";
import { Vector } from "../math/vector";

const defaultBounds = {
  x: 0,
  y: 0,
  width: 10,
  height: 10,
};

function createBoid(position: Vector): Boid {
  return {
    position: position,
    velocity: {
      x: 0,
      y: 0,
    },
    config: {
      radius: 10,
      maxVelocity: 1,
      factors: {
        cohesion: 1,
        alignment: 1,
        separation: 1,
        bounds: 1,
      },
    },
  };
}

describe("cohesion", () => {
  test("should direct boid towards average flock position", () => {
    const boid = createBoid({
      x: 5,
      y: 5,
    });
    const flockMates = [
      createBoid({
        x: 4,
        y: 4,
      }),
      createBoid({
        x: 6,
        y: 4,
      }),
    ];
    const velocity = groupTogether(boid, flockMates, defaultBounds);
    expect(velocity).toEqual({
      x: 0,
      y: -1,
    });
  });
  test("should use cohesion factor to scale velocity", () => {
    const boid = createBoid({
      x: 5,
      y: 5,
    });
    boid.config.factors.cohesion = 0.5;
    const flockMates = [
      createBoid({
        x: 4,
        y: 4,
      }),
      createBoid({
        x: 6,
        y: 4,
      }),
    ];
    const velocity = groupTogether(boid, flockMates, defaultBounds);
    expect(velocity).toStrictEqual({
      x: 0,
      y: -0.5,
    });
  });
});

describe("alignment", () => {
  test("should direct boid towards average flock heading", () => {
    const boid = createBoid({
      x: 0,
      y: 0,
    });
    const flockMates = [
      createBoid({
        x: 0,
        y: 0,
      }),
      createBoid({
        x: 0,
        y: 0,
      }),
    ];
    const [first, second] = flockMates;
    first.velocity = { x: 0, y: -1 };
    second.velocity = { x: 0, y: -1 };
    const velocity = alignDirection(boid, flockMates, defaultBounds);
    expect(velocity).toStrictEqual({
      x: 0,
      y: -1,
    });
  });

  test("should use alignment factor to scale velocity", () => {
    const boid = createBoid({
      x: 0,
      y: 0,
    });
    boid.config.factors.alignment = 0.5;
    const flockMates = [
      createBoid({
        x: 0,
        y: 0,
      }),
      createBoid({
        x: 0,
        y: 0,
      }),
    ];
    const [first, second] = flockMates;
    first.velocity = { x: 0, y: -1 };
    second.velocity = { x: 0, y: -1 };
    const velocity = alignDirection(boid, flockMates, defaultBounds);
    expect(velocity).toStrictEqual({
      x: 0,
      y: -0.5,
    });
  });
});

describe("separation", () => {
  test("should direct boid away from other boids", () => {
    const boid = createBoid({
      x: 0,
      y: 0,
    });
    const flockMates = [
      createBoid({
        x: -1,
        y: -1,
      }),
      createBoid({
        x: 1,
        y: -1,
      }),
    ];
    const velocity = avoidCollision(boid, flockMates, defaultBounds);
    expect(velocity).toEqual({
      x: 0,
      y: 1,
    });
  });
  test("should use separation factor to scale velocity", () => {
    const boid = createBoid({
      x: 0,
      y: 0,
    });
    boid.config.factors.separation = 0.5;
    const flockMates = [
      createBoid({
        x: -1,
        y: -1,
      }),
      createBoid({
        x: 1,
        y: -1,
      }),
    ];
    const velocity = avoidCollision(boid, flockMates, defaultBounds);
    expect(velocity).toStrictEqual({
      x: 0,
      y: 0.5,
    });
  });
});

describe("bounds", () => {
  test("should direct boid back within bounds", () => {
    let boid = createBoid({ x: defaultBounds.x - 1, y: 0 });
    expect(respectBounds(boid, [], defaultBounds)).toStrictEqual({
      x: 1,
      y: 0,
    });
    boid = createBoid({ x: defaultBounds.width + 1, y: 0 });
    expect(respectBounds(boid, [], defaultBounds)).toStrictEqual({
      x: -1,
      y: 0,
    });
    boid = createBoid({ x: 0, y: defaultBounds.y - 1 });
    expect(respectBounds(boid, [], defaultBounds)).toStrictEqual({
      x: 0,
      y: 1,
    });
    boid = createBoid({ x: 0, y: defaultBounds.height + 1 });
    expect(respectBounds(boid, [], defaultBounds)).toStrictEqual({
      x: 0,
      y: -1,
    });
  });
  test("should not do anything if boid is within bounds", () => {
    const boid = createBoid({ x: 0, y: 0 });
    expect(respectBounds(boid, [], defaultBounds)).toStrictEqual({
      x: 0,
      y: 0,
    });
  });
});

describe("velocity limit", () => {
  test("should limit boid velocity to a configure maximum velocity", () => {
    const boid = createBoid({ x: 0, y: 0 });
    boid.config.maxVelocity = 1;
    boid.velocity = {
      x: 5,
      y: 0,
    };
    expect(limitVelocity(boid, [], defaultBounds)).toStrictEqual({
      x: -4,
      y: -0,
    });
  });
});
