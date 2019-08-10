// =========================================================================
// Vectors
// =========================================================================
export type Vector2 = [number, number];

export const vectors = {
  add(a: Vector2, b: Vector2): Vector2 {
    return [a[0] + b[0], a[1] + b[1]];
  },
  subtract(a: Vector2, b: Vector2): Vector2 {
    return [a[0] - b[0], a[1] - b[1]];
  },
  multiply(a: Vector2, b: Vector2): Vector2 {
    return [a[0] * b[0], a[1] * b[1]];
  },
  divide(a: Vector2, b: Vector2): Vector2 {
    return [a[0] / b[0], a[1] / b[1]];
  },
  get up(): Vector2 {
    return [0, 1];
  },
  get down(): Vector2 {
    return [0, -1];
  },
  get left(): Vector2 {
    return [-1, 0];
  },
  get right(): Vector2 {
    return [1, 0];
  },
};

// =========================================================================
// Random
// =========================================================================

export const random = {
  positionAroundPoint(point: Vector2): Vector2 {
    const variationInR = 400;
    const minimumR = 200;
    const theta = Math.random() * (2 * Math.PI);
    const r = Math.random() * variationInR + minimumR;
    return [Math.cos(theta) * r + point[0], Math.sin(theta) * r + point[1]];
  },
};

// test

// const dacceleration = (x: number): number => Math.pow(x, 2);
