export type Vector = {
  x: number;
  y: number;
};

export function add(vec1: Vector, vec2: Vector): Vector {
  return {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y,
  };
}

export function sub(vec1: Vector, vec2: Vector): Vector {
  return {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y,
  };
}

export function div(vec: Vector, scalar: number): Vector {
  return {
    x: vec.x / scalar,
    y: vec.y / scalar,
  };
}

export function mul(vec: Vector, scalar: number): Vector {
  return {
    x: vec.x * scalar,
    y: vec.y * scalar,
  };
}

export function dot(vec1: Vector, vec2: Vector): number {
  return vec1.x * vec2.x + vec1.y * vec2.y;
}

export function mag(vec: Vector): number {
  return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}

export function normalized(vec: Vector): Vector {
  if (vec.x == 0 && vec.y == 0) {
    return vec;
  }
  return mul(vec, 1 / mag(vec));
}
