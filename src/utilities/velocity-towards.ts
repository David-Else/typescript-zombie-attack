import { Vector2 } from './vectors';

/**
 * ==========================================================================
 * Returns the velocity for an entity to move towards a target position
 * ==========================================================================
 */
export function velocityTowards(
  currentPosition: Vector2,
  targetPosition: Vector2,
  speed: number,
): Vector2 {
  // compute delta between the source point and the destination point
  let dx = targetPosition[0] - currentPosition[0];
  let dy = targetPosition[1] - currentPosition[1];

  // compute the angle between the two points
  let angle = Math.atan2(dy, dx);

  // return the velocity vector through magnitude (speed) and the angle
  return [speed * Math.cos(angle), speed * Math.sin(angle)];
}
