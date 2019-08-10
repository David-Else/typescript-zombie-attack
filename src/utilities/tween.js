// =========================================================================
// Tween
// =========================================================================
export const tween = {
    linear: (x) => x,
    acceleration: (x) => x ** 2,
    accelerationCubed: (x) => x ** 3,
    deceleration: (x) => 1 - (1 - x) ** 2,
    decelerationCubed: (x) => 1 - (1 - x) ** 3,
    smoothStep: (x) => x * x * (3 - 2 * x),
    smoothStepSquared: (x) => (x * x * (3 - 2 * x)) ** 2,
    smoothStepCubed: (x) => (x * x * (3 - 2 * x)) ** 3,
    weightedAverage: (p, d, w) => (p * (w - 1) + d) / w,
    quartic: (k) => 1 - --k * k * k * k,
};
//# sourceMappingURL=tween.js.map