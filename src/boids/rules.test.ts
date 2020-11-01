import {
  groupTogether,
  alignDirection,
  avoidCollision,
  respectBounds,
} from "./rules";
import { Boid } from "./boid";
import { Vector } from "../math/vector";

const defaultBounds = {
  x: 0,
  y: 0,
  width: 10,
  height: 10,
};

function createBoid(position: Vector, config = {}): Boid {
  return {
    position: position,
    velocity: {
      x: 0,
      y: 0,
    },
    config: {
      flockRadius: 10,
      maxVelocity: 1,
      factors: {
        cohesion: 1,
        alignment: 1,
        avoidance: 1,
        bounds: 1,
        ...(config["factors"] || {}),
      },
      ...config,
    },
  };
}

describe("cohesion rule", () => {
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
    const boid = createBoid(
      {
        x: 5,
        y: 5,
      },
      {
        factors: {
          cohesion: 0.5,
        },
      }
    );
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

describe("alignment rule", () => {
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
    const boid = createBoid(
      {
        x: 0,
        y: 0,
      },
      {
        factors: {
          alignment: 0.5,
        },
      }
    );
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

describe("avoidance rule", () => {
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
  test("should use avoidance factor to scale velocity", () => {
    const boid = createBoid(
      {
        x: 0,
        y: 0,
      },
      {
        factors: {
          avoidance: 0.5,
        },
      }
    );
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

describe("boundary rule", () => {
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
