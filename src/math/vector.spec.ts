import { add, sub, mul, dot, mag, normalized } from "./vector";

test("vector addition", () => {
  expect(add({ x: 1, y: 2 }, { x: 3, y: 4 })).toStrictEqual({ x: 4, y: 6 });
});

test("vector subtraction", () => {
  expect(sub({ x: 1, y: 2 }, { x: 3, y: 4 })).toStrictEqual({ x: -2, y: -2 });
});

test("vector scalar multiplication", () => {
  expect(mul({ x: 1, y: 2 }, 2)).toStrictEqual({ x: 2, y: 4 });
});

test("vector dot product", () => {
  expect(dot({ x: 2, y: 2 }, { x: 3, y: 3 })).toStrictEqual(12);
});

test("vector magnitude", () => {
  expect(mag({ x: 2, y: 2 })).toStrictEqual(Math.sqrt(8));
});

test("vector normalization", () => {
  expect(normalized({ x: 2, y: 4 })).toStrictEqual({
    x: 2 / Math.sqrt(20),
    y: 4 / Math.sqrt(20),
  });
});
