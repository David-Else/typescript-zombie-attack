import { Vector2 } from './vectors';

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
