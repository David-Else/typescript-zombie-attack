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
// test
// const dacceleration = (x: number): number => Math.pow(x, 2);
//# sourceMappingURL=vectors.js.map