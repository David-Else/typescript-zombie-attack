// =========================================================================
// Tween
// =========================================================================

export const tween = {
  linear: (x: number) => x,
  acceleration: (x: number) => x ** 2,
  accelerationCubed: (x: number) => x ** 3,
  deceleration: (x: number) => 1 - (1 - x) ** 2,
  decelerationCubed: (x: number) => 1 - (1 - x) ** 3,
  smoothStep: (x: number) => x * x * (3 - 2 * x),
  smoothStepSquared: (x: number) => (x * x * (3 - 2 * x)) ** 2,
  smoothStepCubed: (x: number) => (x * x * (3 - 2 * x)) ** 3,
  weightedAverage: (p: number, d: number, w: number) => (p * (w - 1) + d) / w,
  quartic: (k: number) => 1 - --k * k * k * k
};
