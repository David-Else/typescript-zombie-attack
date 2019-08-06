// =========================================================================
// Vector methods
// =========================================================================
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
//# sourceMappingURL=vectors.js.map