export const vectors = {
    add(a, b) {
        return [a[0] + b[0], a[1] + b[1]];
    },
    subtract(a, b) {
        return [a[0] - b[0], a[1] - b[1]];
    },
    multiply(a, b) {
        return [a[0] * b[0], a[1] * b[1]];
    },
    divide(a, b) {
        return [a[0] / b[0], a[1] / b[1]];
    },
    get up() {
        return [0, 1];
    },
    get down() {
        return [0, -1];
    },
    get left() {
        return [-1, 0];
    },
    get right() {
        return [1, 0];
    },
};
// =========================================================================
// Random
// =========================================================================
export const random = {
    positionAroundPoint(point) {
        const variationInR = 400;
        const minimumR = 200;
        const theta = Math.random() * (2 * Math.PI);
        const r = Math.random() * variationInR + minimumR;
        return [Math.cos(theta) * r + point[0], Math.sin(theta) * r + point[1]];
    },
};
// =========================================================================
// Tween
// =========================================================================
export const tween = {
    linear: (x) => x,
    acceleration: (x) => Math.pow(x, 2),
    accelerationCubed: (x) => Math.pow(x, 3),
    deceleration: (x) => 1 - Math.pow(1 - x, 2),
    decelerationCubed: (x) => 1 - Math.pow(1 - x, 3),
    smoothStep: (x) => x * x * (3 - 2 * x),
    smoothStepSquared: (x) => Math.pow(x * x * (3 - 2 * x), 2),
    smoothStepCubed: (x) => Math.pow(x * x * (3 - 2 * x), 3),
    weightedAverage: (p, d, w) => (p * (w - 1) + d) / w,
    quartic: (k) => 1 - --k * k * k * k,
};
// test
const dacceleration = (x) => Math.pow(x, 2);
//# sourceMappingURL=vectors.js.map