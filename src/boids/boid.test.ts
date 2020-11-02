import { createBoids } from "./boid";

test("creating boids", () => {
  const config = {
    radius: 64,
    maxVelocity: 8,
    factors: {
      cohesion: 1,
      alignment: 1,
      separation: 1,
      bounds: 1,
    },
  };
  const bounds = {
    x: 0,
    y: 0,
    width: 128,
    height: 128,
  };
  const boids = createBoids(12, bounds, config);
  expect(boids.length).toEqual(12);
  for (let boid of boids) {
    expect(boid.config).toStrictEqual(config);
    expect(boid.position.x).toBeGreaterThanOrEqual(bounds.x);
    expect(boid.position.x).toBeLessThanOrEqual(bounds.width);
    expect(boid.position.y).toBeGreaterThanOrEqual(bounds.y);
    expect(boid.position.y).toBeLessThanOrEqual(bounds.height);
  }
});
