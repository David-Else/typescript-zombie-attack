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
//# sourceMappingURL=random.js.map