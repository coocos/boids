import { cohesion } from "./rules";
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
    const velocity = cohesion(boid, flockMates, defaultBounds);
    expect(velocity.x).toEqual(0);
    expect(velocity.y).toEqual(-1);
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
    const velocity = cohesion(boid, flockMates, defaultBounds);
    expect(velocity.x).toEqual(0);
    expect(velocity.y).toEqual(-0.5);
  });
});
