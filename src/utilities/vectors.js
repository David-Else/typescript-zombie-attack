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
    // length(a: Vector2): number {
    //   return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    // },
    // angle(a: Vector2): number {
    //   return Math.atan2(a[0], a[1]);
    // },
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
//# sourceMappingURL=vectors.js.map